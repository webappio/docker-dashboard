import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import {Button} from "@material-ui/core";
<<<<<<< HEAD
import {Link} from "react-router-dom";
import Box from '@material-ui/core/Box';
=======
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
>>>>>>> 628ae4f (added ip box to connect with remote docker daemon)

const useStyles = makeStyles((theme) =>({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    }
}));

function Dashboard() {
    const [containers, setContainers] = useState([]);
    const [ip, setIp] = useState('');
<<<<<<< HEAD
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
=======
>>>>>>> 628ae4f (added ip box to connect with remote docker daemon)
    const fetchContainer = () => {
        fetch("/containers")
        .then(res => res.json())
        .then(
            (result) => {
              console.log(result);
              setContainers(result)
            }
<<<<<<< HEAD
        ).catch((reason) => {
=======
        ).catch( (reason) => {
>>>>>>> 628ae4f (added ip box to connect with remote docker daemon)
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
<<<<<<< HEAD
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const classes = useStyles();
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, containers.length - page * rowsPerPage);
=======

    const classes = useStyles();
>>>>>>> 628ae4f (added ip box to connect with remote docker daemon)
    useEffect(() => {
        fetchContainer();
    }, [])
    const handleChange = (event) => {
        setIp(event.target.value);
    };

    return (
        <React.Fragment>
<<<<<<< HEAD
            <form className={classes.root}>
                <TextField id="standard-basic" label="enter ip address" onChange={handleChange} />
                <Button
                    onClick={setip}
                    variant={'outlined'}>
                    Connect
                </Button>
            </form>
            <Box m={5}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>CONTAINER ID</TableCell>
                                <TableCell align="right">IMAGE</TableCell>
                                <TableCell align="right">COMMAND</TableCell>
                                <TableCell align="right">CREATED</TableCell>
                                <TableCell align="right">STATUS</TableCell>
                                <TableCell align="right">NAMES</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                    ? containers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : containers
                            ).map(container => (
                                <TableRow key={container.Id}>
                                    <TableCell component="th" scope="row">
                                        <Link to={"/container/" + container.Id} >{container.Id.substring(0, 11)}</Link>
                                    </TableCell>
                                    <TableCell align="right">{container.ImageID.substring(7, 19)}</TableCell>
                                    <TableCell align="right">{container.Command}</TableCell>
                                    <TableCell align="right">{container.Created}</TableCell>
                                    <TableCell align="right">{container.Status}</TableCell>
                                    <TableCell align="right">{container.Names}</TableCell>
                                </TableRow>
                            ))}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            count={containers.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: { 'aria-label': 'rows per page' },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Table>
                </TableContainer>
            </Box>
=======
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
>>>>>>> 628ae4f (added ip box to connect with remote docker daemon)
        </React.Fragment>
)
}

export default Dashboard;
