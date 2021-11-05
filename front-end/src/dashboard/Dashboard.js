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
import {useParams} from "react-router-dom";
import {Button, Typography} from "@material-ui/core";

function Dashboard() {
    const [containers, setContainers] = useState([]);
    const [page, setPage] = useState(0);
    const [error, setError] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [refresh, setRefresh] = useState(false);
    const { jobUuid } = useParams();

    useEffect(() => {
        async function fetchContainers() {
            try {
                const res = await fetch(`/${jobUuid}/containers/`)
                const result = await res.json()
                setContainers(result)
                setError(false)
            } catch (err) {
                console.error(err)
                setError(true)
            }
        }
        
        fetchContainers()
    }, [jobUuid, refresh])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, containers.length - page * rowsPerPage);

    return (
        <Box m={5}>
            <Paper>
                <TableContainer style={{maxHeight: "450px"}}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Container ID</TableCell>
                                <TableCell>Image</TableCell>
                                <TableCell>Command</TableCell>
                                <TableCell>Created At</TableCell>
                                <TableCell style={{minWidth: "75px"}}>Status</TableCell>
                                <TableCell>Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                error ?
                                    <TableRow>
                                        <TableCell colSpan={6} rowSpan={6} align="center">
                                            <Typography>
                                                Unable to connect to Docker daemon
                                            </Typography>
                                            <Box margin={1}>
                                                <Button color="primary" variant="contained" onClick={() => (setRefresh(!refresh))}>
                                                    Refresh
                                                </Button>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                    : null
                            }
                            {(rowsPerPage > 0
                                ? containers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : containers
                            ).map(container => (
                                <TableRow key={container.Id} hover>
                                    <TableCell component="th" scope="row">
                                        <Link to={`/${jobUuid}/container/${container.Id}`} >{container.Id.substring(0, 11)}</Link>
                                    </TableCell>
                                    <TableCell>{container.ImageID.substring(7, 19)}</TableCell>
                                    <TableCell>{container.Command}</TableCell>
                                    <TableCell>{container.Created}</TableCell>
                                    <TableCell>{container.Status}</TableCell>
                                    <TableCell>{container.Names}</TableCell>
                                </TableRow>
                            ))}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                          </TableBody>
                        </Table>
              </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                component="div"
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
            </Paper>
      </Box>
    )
}

export default Dashboard;
