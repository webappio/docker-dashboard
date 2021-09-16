import React, {useState, useEffect} from 'react';
import {useParams} from "react-router";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import {Button, Grid} from "@material-ui/core";
import {Terminal} from 'xterm';
import 'xterm/css/xterm.css'
import Box from "@material-ui/core/Box";




function Container() {
    const [connect, setConnect] = useState(false);
    const { id } = useParams();
    const term = new Terminal();
    var protocol = window.location.protocol.replace('http', 'ws');
    var hostname = window.location.hostname === 'localhost' ? 'localhost:3001' : window.location.hostname;
    var client;
    const streamLogs = () => {
        term.open(document.getElementById('terminal'));
        client = new W3CWebSocket(`${protocol}//${hostname}/container/${id}/logs`);
        client.onopen = () => client.send('logs');
        client.onmessage = (data) => {
            term.writeln(data.data)
        }
    }
    useEffect(() => connect ? streamLogs() : null, [connect])

    return(
        <div>
            <h1>{id}</h1>
            <Button
                onClick={() => setConnect(!connect)}
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