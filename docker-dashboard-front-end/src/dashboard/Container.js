import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from "react-router";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import {Button, Grid} from "@material-ui/core";
import {Terminal} from 'xterm';
import 'xterm/css/xterm.css'
import Box from "@material-ui/core/Box";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';

function Container() {
    const controller = new AbortController()
    const [connect, setConnect] = useState(false);
    const { jobuuid, id } = useParams();
    const term = new Terminal();
<<<<<<< HEAD
    const protocol = window.location.protocol.replace('http', 'ws');
    const hostname = window.location.hostname === 'localhost' ? 'localhost:3001' : window.location.hostname;
    const client = new W3CWebSocket(`${protocol}//${hostname}/${jobuuid}/container/${id}/logs`);

=======
    var protocol = window.location.protocol.replace('http', 'ws');
    var hostname = window.location.hostname === 'localhost' ? 'localhost:3001' : window.location.hostname;
    var client;
    const fetchContainerDetails = async () => {
        try {
            console.log('fetch containers details');
            const res = await fetch(`/container/${uuid}/${id}`, {
                signal : controller.signal
            })
            const result = await res.json()
            console.log(result)
        } catch (reason) {
            console.log(reason)
        }
    }
>>>>>>> 500c1e6 (ws test)
    const streamLogs = () => {
        console.log(`${protocol}//${hostname}/container/${uuid}/${id}/logs`);
        term.open(document.getElementById('terminal'));
        client.onopen = () => client.send('logs');
        client.onmessage = function (event) {
            term.writeln(event.data)
        }
        client.onerror = (error) => {
            console.error(error)
        }
        client.onerror = (error) => {
            console.log("websocket error occured")
            console.log(error)
        }
    }

    //eslint-disable-next-line
<<<<<<< HEAD
    useEffect(() => connect ? streamLogs() : null, [connect]);

=======
    useEffect(() => fetchContainerDetails(), []);
    //eslint-disable-next-line
    useEffect(() => connect ? streamLogs() : null, [connect]);
>>>>>>> 500c1e6 (ws test)
    return(
        <div>
            <IconButton>
                <a href={`${window.location.protocol}//${window.location.hostname}${window.location.port === ''? '' : `:${window.location.port}`}/${jobuuid}`}>
                    <ArrowBackIcon></ArrowBackIcon>
                </a>
            </IconButton>
            <h1>{id}</h1>
            <Button
                onClick={() => { 
                    setConnect(!connect)
                }}
                variant={'outlined'}>
                {connect ? 'Close logs' : 'Connect to logs'}
            </Button>
            <Grid container justifyContent="center">
                <Box m={3}>
                    {connect ? <div id="terminal"/> : null}
                </Box>
            </Grid>
        </div>
    );
}

export default Container;