import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import {Button} from "@material-ui/core";
import {Terminal} from 'xterm';

function Container() {
    const [container, setContainer] = useState(null);
    const [logs, setLogs] = useState([]);
    const { id } = useParams();
    const term = new Terminal();
    const client = new W3CWebSocket(`ws://127.0.0.1:3001/container/${id}/logs`);
    useEffect(() => {
        client.onopen= () => {
            console.log("WS opened");
        };

        fetch("/container/" + id)
            .then(res => res.json())
            .then(
                (result) => {
                    setContainer(result)
                }
            )

    }, [])

    const streamLogs = () => {

        term.open(document.getElementById('terminal'));
        client.send("logs");
        client.onmessage = (data) => {
            term.writeln(data.data)
        }
    }

    return(
        <div>
            <h1>{id}</h1>
            <Button
                onClick={streamLogs}
                variant={'outlined'}>
                Connect to logs
            </Button>
            <div id="terminal"/>
            {logs}
        </div>
    );
}

export default Container;