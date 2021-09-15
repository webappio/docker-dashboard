const express = require('express')
const expressApp = express();
const expressWs = require('express-ws')(expressApp);
const port = 3001;
const path = require('path');
const Docker = require('dockerode');
var docker = new Docker({socketPath: '/var/run/docker.sock'});
let { app } = expressWs;


app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'docker-dashboard-front-end', 'build')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'docker-dashboard-front-end', 'build', 'index.html'));
});

app.post('/setip', (req, res, next) => {
    console.log(req.body);
    docker = new Docker({ protocol: 'ssh', host : req.body.host, password: 'password', username: 'root'});
    // try to add get all container
    docker.listContainers({all: true}, (err, containers) => {
        if (err) {
            // reset to default
            docker = new Docker({socketPath: '/var/run/docker.sock'});
            console.log(err);
            next(err);
        } else {
            res.send(containers);
        }
    })
});


app.get('/containers', (req, res, next) => {
    docker.listContainers({all: true}, (err, containers) => {
        if (err) {
            console.log(err);
            next(err);
        } else {
            res.send(containers);
        }
    })
});

app.get('/container/:id', (req, res, next) => {
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
        console.log('params id');
        console.log(req.params.id);
        let logOpts = {
            stdout: true,
            stderr: true,
            follow: true
        };

        docker.getContainer(req.params.id).logs(logOpts, (err, logs) => {
            if (err) {
                console.log(err);
            } else {
                logs.on('data', chunk => {
                        let encodedLogs = Buffer.from(chunk, 'utf-8').toString();
                        ws.send(encodedLogs);
                })
            }
        })
    })

});

app.listen(port, () => {
    console.log(`Docker plugin dashboard listening on http://localhost:${port}`)
});
