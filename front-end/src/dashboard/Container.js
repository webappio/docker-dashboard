import React, {useState, useEffect} from 'react';
import {useParams} from "react-router";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import {Button, Typography} from "@material-ui/core";
import {Terminal} from 'xterm';
import 'xterm/css/xterm.css'
import Box from "@material-ui/core/Box";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

function Container() {
    const [container, setContainer] = useState({});
    const { jobUuid, id } = useParams();

    useEffect(() => {
        const protocol = window.location.protocol.replace('http', 'ws');
        const host = window.location.host
        const client = new W3CWebSocket(`${protocol}//${host}/${jobUuid}/container/${id}/logs`);
        const term = new Terminal();

        function streamLogs() {
            term.open(document.getElementById('terminal'));
            client.onopen = () => client.send('logs');
            client.onmessage = function (event) {
                term.writeln(event.data)
            }
            client.onerror = (error) => {
                console.error(error)
            }
        }

        streamLogs()
    }, [id, jobUuid]);

    useEffect(() => {
        async function fetchContainer() {
            try {
                const res = await fetch(`/${jobUuid}/container/${id}`)
                const result = await res.json()
                setContainer(result)
            } catch (reason) {
                console.error(reason)
            }
        }
        fetchContainer()
    }, [id, jobUuid])

    return(
            <Box display="flex" flexDirection="column">
                <Box margin={5} display="flex" flexDirection="row">
                    <Button
                        href={`/${jobUuid}`}
                        startIcon={<ChevronLeftIcon/>}>
                        Back
                    </Button>
                    <Box justifyContent="center" style={{width: "100%"}}>
                        <Typography variant="h3">{(container && container.Id)? `Container: ${container.Id.substring(0, 11)}` : null}</Typography>
                        <Typography>{(container && container.Id)? container.Name: null}</Typography>
                    </Box>
                </Box>
                <Box display="flex" flexDirection="row">
                    <Box marginLeft={5} display="flex" flexDirection="column">
                        {
                            (container && container.Id)? <>
                                    <Box>
                                        <Typography align="left">
                                            Status: {container.State.Status}
                                        </Typography>
                                    </Box>
                                    <Box marginTop={3}>
                                        <Typography align="left">
                                            Created at: {container.Created}
                                        </Typography>
                                    </Box>
                                    <Box marginTop={3}>
                                        <Typography align="left">
                                            Started at: {container.State.StartedAt}
                                        </Typography>
                                    </Box>
                                </>
                                : null
                        }

                    </Box>
                    <Box marginLeft={3} display="flex" style={{width: "100%"}} justifyContent="center">
                        <div id="terminal"/>
                    </Box>
                </Box>
            </Box>
    );
}

export default Container;