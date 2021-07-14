const express = require('express')
const app = express();
const expressWs = require('express-ws')(app);
const port = 3001;

const Docker = require('dockerode');
const docker = new Docker({socketPath: '/var/run/docker.sock'});

const utf8 = require('utf8');

app.get('/containers', (req, res) => {
    docker.listContainers({all: true}, (err, containers) => {
        if (err) {
            console.log(err);
            next(err);
        } else {
            res.send(containers);
        }
    })
});

app.get('/container/:id', (req, res) => {
    docker.getContainer(req.params.id).inspect((err, container) => {
        if (err) {
            console.log(err);
            next(err);
        } else {
            res.send(container);
        }
    })
});

app.ws('/container/:id/logs', (ws, req) => {
    ws.on('message', (msg) => {
        console.log(msg);
        let logOpts = {
            stdout: true,
            stderr: true,
            follow: true
        };

        docker.getContainer(req.params.id).logs(logOpts, (err, logs) => {
            if (err) {
                console.log(err);
                next(err);
            } else {
                logs.on('data', chunk =>{
                    let encodedLogs = Buffer.from(chunk, 'utf-8').toString();
                    ws.send(encodedLogs);
                }
                )

            }
        })
    })

});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});