import React, {useState, useEffect} from 'react';
import {useParams} from "react-router";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import {IconButton, Typography} from "@material-ui/core";
import {Terminal} from 'xterm';
import 'xterm/css/xterm.css'
import Box from "@material-ui/core/Box";
import {ArrowBack} from "@material-ui/icons";

const LayerXtermTheme = {
    foreground: "#FFFFFF",
    background: "#222433",
    black: "#FFFFFF",
    red: "#FF6B68",
    green: "#50ebb4",
    yellow: "#D6BF55",
    blue: "#5394EC",
    magenta: "#AE8ABE",
    cyan: "#299999",
    white: "#1F1F1F",
    brightBlack: "#555555",
    brightRed: "#FF8785",
    brightGreen: "#75eabf",
    brightBlue: "#7EAEF1",
    brightMagenta: "#FF99FF",
    brightCyan: "#6CDADA",
    brightYellow: "#FFFF00",
    brightWhite: "#FFFFFF",
};


function Container() {
    const [container, setContainer] = useState({});
    const { jobUuid, id } = useParams();

    useEffect(() => {
        const protocol = window.location.protocol.replace('http', 'ws');
        const host = window.location.host
        const client = new W3CWebSocket(`${protocol}//${host}/${jobUuid}/container/${id}/logs`);
        const term = new Terminal({
            rows: 20,
            cols: 100,
            fontSize: "12px",
            rendererType: "dom",
            theme: LayerXtermTheme,
            fontFamily:
                '"Monaco", "Menlo", "Ubuntu Mono", "Consolas", "source-code-pro", monospace',
            letterSpacing: 0.5,
            lineHeight: 1.1,
            cursorStyle: "underline",
            padding: "20px"
        });

        const streamLogs = () => {
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
        fetch(`/${jobUuid}/container/${id}`)
            .then(x => x.json())
            .then(x => setContainer(x))
            .catch(e => console.error(e));
    }, [id, jobUuid])

    return(
        <Box display="flex" flexDirection="column" paddingBottom={3}>
            <Box margin={5} display="flex" flexDirection="row">
                <Box marginLeft={5}>
                    <IconButton
                        href={`/${jobUuid}`}
                    >
                        <ArrowBack/>
                    </IconButton>
                </Box>
                <Box justifyContent="center" style={{width: "100%"}}>
                    <Typography variant="h3">{(container && container.Id)? `Container: ${container.Id.substring(0, 11)}` : null}</Typography>
                    <Typography>{(container && container.Id)? container.Name: null}</Typography>
                </Box>
            </Box>
            <Box display="flex" flexDirection="row" justifyContent="center">
                <Box marginLeft={5} display="flex" flexDirection="column">
                    {
                        (container && container.Id)? <>
                                <Box>
                                    <Typography align="left" color="textSecondary">
                                        Status:
                                    </Typography>
                                    <Typography align="left">
                                        {container.State.Status}
                                    </Typography>
                                </Box>
                                <Box marginTop={3}>
                                    <Typography align="left" color="textSecondary">
                                        Created at:
                                    </Typography>
                                    <Typography align="left">
                                        {container.Created}
                                    </Typography>
                                </Box>
                                <Box marginTop={3}>
                                    <Typography align="left" color="textSecondary">
                                        Started at:
                                    </Typography>
                                    <Typography align="left">
                                        {container.State.StartedAt}
                                    </Typography>
                                </Box>
                                <Box marginTop={3}>
                                    <Typography align="left" color="textSecondary">
                                        IP address:
                                    </Typography>
                                    <Typography align="left">
                                        {container.NetworkSettings.IPAddress}
                                    </Typography>
                                </Box>
                            </>
                            : null
                    }

                </Box>
                <Box
                    marginLeft={3}
                    display="flex"
                    style={{
                        padding: "1em",
                        backgroundColor: "#222433",
                        borderRadius: 10
                    }}
                    textAlign="left">
                    <div id="terminal"/>
                </Box>
            </Box>
        </Box>
    );
}

export default Container;