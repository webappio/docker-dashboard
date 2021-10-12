const express = require('express')
const expressApp = express();
const expressWs = require('express-ws')(expressApp);
const port = 3001;
const path = require('path');
const Docker = require('dockerode');
let { app } = expressWs;

app.use(express.json());

process.on('uncaughtException', err => {
    // for some reason if docker does not connect it will throw an exception that cannot be caught
    console.error(err, 'Uncaught Exception thrown');
});

var setdocker = async function (req, res, next) {
<<<<<<< HEAD
    //var docker = new Docker({ protocol: 'ssh', host: `${req.params.jobuuid}.lan`, password: 'password', username: 'root'});
    var docker = new Docker();
=======
    var docker = new Docker({ protocol: 'ssh', host: `${req.params.uuid}.lan`, password: 'password', username: 'root'});
    //var docker = new Docker({socketPath: '/var/run/docker.sock'});
>>>>>>> 500c1e6 (ws test)
    //ping docker to see if connection is working
    try {
        await docker.ping();
        req.docker = docker;
        next()
    } catch (err) {
        res.send(err)
    }
}

app.use(express.static(path.join(__dirname, '..', 'docker-dashboard-front-end', 'build')));
app.get('/:jobuuid/containers', setdocker, (req, res, next) => {
    req.docker.listContainers({all: true}, (err, containers) => {
        if (err) {
            console.error(err);
            next(err);
        } else {
            res.send(containers);
        }
    })
});

app.get('/:jobuuid/container/:id', setdocker, (req, res, next) => {
    req.docker.getContainer(req.params.id).inspect((err, container) => {
        if (err) {
            console.error(err);
            next(err);
        } else {
            res.send(container);
        }
    })
});

<<<<<<< HEAD
app.ws('/:jobuuid/container/:id/logs', setdocker, async (ws, req) => {
    const container = ws.docker.getContainer(req.params.id)
    if(!container) {
        ws.send('Could not find container ' + containerName + '. Abort.');
=======
//ws://1502de53-6a43-4e4d-be22-fbabb53a7fce.cidemolocal.co/container/82c642ca-ace7-4fbc-bf49-f14a2882d8cc/8d128e4c811ab33a3b96f28f7c934a8173ae69266de96f24df352347f85e8188/logs
app.ws('/container/:uuid/:id/logs', async (ws, req) => {
    var docker = new Docker({ protocol: 'ssh', host: `${req.params.uuid}.lan`, password: 'password', username: 'root'});
    //var docker = new Docker({socketPath: '/var/run/docker.sock'});
    try {
        await docker.ping();
    } catch (err) {
        console.log(err);
>>>>>>> 500c1e6 (ws test)
    }
<<<<<<< HEAD
    container.logs({
        follow: true,
        stdout: true,
        stderr: true
    }, (err, logs) => {
        if (err) {
            ws.send("websocket errors encountered");
            console.error(err);
        } else {
            ws.send("websocket connection established");
            logs.on('data', chunk => {
                let encodedLogs = Buffer.from(chunk, 'utf-8').toString();
                ws.send(encodedLogs);
            })
=======
    ws.send("websocket connection recieved")
<<<<<<< HEAD
    ws.on('message', (msg) => {
        console.log("recieve message");
        const container = docker.getContainer(req.params.id)
        if(!container) {
            ws.send('Could not find container ' + containerName + '. Abort.');
>>>>>>> 8b5cc75 (add on connect msg)
=======
    const container = docker.getContainer(req.params.id)
    if(!container) {
        ws.send('Could not find container ' + containerName + '. Abort.');
    }
    container.logs({
        follow: true,
        stdout: true,
        stderr: true
    }, (err, logs) => {
        if (err) {
            ws.send("websocket errors encountered");
            console.log(err);
        } else {
            ws.send("websocket connection established");
            logs.on('data', chunk => {
                let encodedLogs = Buffer.from(chunk, 'utf-8').toString();
                ws.send(encodedLogs);
            })
>>>>>>> 500c1e6 (ws test)
        }
    })
});

app.get('*', function(req, res) {
    res.sendFile('index.html', {root: path.join(__dirname, '..', 'docker-dashboard-front-end', 'build')});
});

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send({
        err : err.stack
    })
})

app.listen(port, () => {
    console.log(`Docker plugin dashboard listening on http://localhost:${port}`)
});
