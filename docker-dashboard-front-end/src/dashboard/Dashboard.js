import React, {useEffect, useState} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import {Link} from "react-router-dom";
import Box from '@material-ui/core/Box';
<<<<<<< HEAD
import {Typography} from '@material-ui/core';
import {useParams} from "react-router-dom";
=======

const useStyles = makeStyles((theme) =>({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    }
}));
>>>>>>> 3fd4773 (added styling pagination and connect and disconnect button)

function Dashboard() {
    const controller = new AbortController()
    // abort fetch after 5 seconds
    setTimeout(() => controller.abort(), 5000)
    const [containers, setContainers] = useState([]);
<<<<<<< HEAD
    const [page, setPage] = useState(0);
    const [error, setError] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const { jobuuid } = useParams();

    const fetchContainer = async () => {
        try {
            const res = await fetch(`/${jobuuid}/containers/`, {
                signal : controller.signal
            })
            const result = await res.json()
            setContainers(result)
            setError(false)
        } catch (reason) {
            console.error(reason)
            setError(true)
        }
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
=======
    const [ip, setIp] = useState('');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const fetchContainer = () => {
        fetch("/containers")
        .then(res => {
            console.log(res);
            return res.json()
        })
        .then(
            (result) => {
              console.log('containers');
              console.log(result);
              setContainers(result)
            }
        ).catch((reason) => {
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
    const test = () => {
        fetch('/test', {
            method: 'GET'
        })
        .then(res => res.json())
        .then(
            (result) => {
                console.log('test')
                console.log(result)
            }
        ).catch((reason) => {
            console.log('error')
            console.log(reason)
        })
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const classes = useStyles();
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, containers.length - page * rowsPerPage);
    useEffect(() => {
        test();
        fetchContainer();
    }, [])
    const handleChange = (event) => {
        setIp(event.target.value);
>>>>>>> 3fd4773 (added styling pagination and connect and disconnect button)
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, containers.length - page * rowsPerPage);
    
    // eslint-disable-next-line
    useEffect(() => fetchContainer(), [])

    return (
        <React.Fragment>
<<<<<<< HEAD
            <Box m={5}>
                {error ? 
                <Typography>
                    Could not connect to docker error
                </Typography> : 
=======
            <form className={classes.root}>
                <TextField id="standard-basic" label="enter ip address" onChange={handleChange} />
                <Button
                    onClick={setip}
                    variant={'outlined'}>
                    Connect
                </Button>
            </form>
            <Box m={5}>
>>>>>>> 3fd4773 (added styling pagination and connect and disconnect button)
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
<<<<<<< HEAD
                                        <Link to={`/${jobuuid}/container/${container.Id}`} >{container.Id.substring(0, 11)}</Link>
=======
                                        <Link to={"/container/" + container.Id} >{container.Id.substring(0, 11)}</Link>
>>>>>>> 3fd4773 (added styling pagination and connect and disconnect button)
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
<<<<<<< HEAD
            }
=======
>>>>>>> 3fd4773 (added styling pagination and connect and disconnect button)
            </Box>
        </React.Fragment>
)
}

export default Dashboard;v