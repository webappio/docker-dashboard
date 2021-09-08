import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import {Button} from "@material-ui/core";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function Dashboard() {
    const [containers, setContainers] = useState([]);
    const [ip, setIp] = useState('');
    const fetchContainer = () => {
        fetch("/containers")
        .then(res => res.json())
        .then(
            (result) => {
              console.log(result);
              setContainers(result)
            }
        ).catch( (reason) => {
            console.log(reason);
        })
    }
    const setip = () => {
        fetch('/setip', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
            body: JSON.stringify({host : ip})
        }).then(
            (result) => {
                console.log(result);
                fetchContainer();
            }
        ).catch((reason) => {
            console.log(reason);
        })
    }

    const classes = useStyles();
    useEffect(() => {
        fetchContainer();
    }, [])
    const handleChange = (event) => {
        setIp(event.target.value);
    };

    return (
        <React.Fragment>
            <TextField id="standard-basic" label="enter ip address" onChange={handleChange} />
            <Button
                onClick={setip}
                variant={'outlined'}>
                Connect
            </Button>
            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>CONTAINER ID</TableCell>
                            <TableCell align="right">IMAGE</TableCell>
                            <TableCell align="right">COMMAND</TableCell>
                            <TableCell align="right">CREATED</TableCell>
                            <TableCell align="right">STATUS</TableCell>
                            <TableCell align="right">PORTS</TableCell>
                            <TableCell align="right">NAMES</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {containers.map(container => (
                            <TableRow key={container.Id}>
                                <TableCell component="th" scope="row">
                                    <Link to={"/container/" + container.Id} >{container.Id.substring(0, 11)}</Link>
                                </TableCell>
                                <TableCell align="right">{container.ImageID.substring(7, 19)}</TableCell>
                                <TableCell align="right">{container.Command}</TableCell>
                                <TableCell align="right">{container.Created}</TableCell>
                                <TableCell align="right">{container.Status}</TableCell>
                                <TableCell align="right">{container.Ports}</TableCell>
                                <TableCell align="right">{container.Names}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
)
}

export default Dashboard;
