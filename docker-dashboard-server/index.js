const express = require('express')
const expressApp = express();
const expressWs = require('express-ws')(expressApp);
const port = 3001;
const path = require('path');
const Docker = require('dockerode');
let { app } = expressWs;
<<<<<<< HEAD

=======
>>>>>>> 1c12464 (testing implementation)
app.use(express.json());

process.on('uncaughtException', err => {
    // for some reason if docker does not connect it will throw an exception that cannot be caught
    console.error(err, 'Uncaught Exception thrown');
});

<<<<<<< HEAD
var setdocker = async function (req, res, next) {
    //var docker = new Docker({ protocol: 'ssh', host: `${req.params.jobuuid}.lan`, password: 'password', username: 'root'});
    var docker = new Docker();
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
=======
process.on('uncaughtException', err => {
    // for some reason if docker does not connect it will throw an exception that cannot be caught
    console.error(err, 'Uncaught Exception thrown');
});

var setdocker = async function (req, res, next) {
    var docker = new Docker({ protocol: 'ssh', host: `${req.params.uuid}.lan`, password: 'password', username: 'root'});
    console.log('recieve uuid', req.params.uuid);
    //ping docker to see if connection is working
    try {
        await docker.ping()
        next()
    } catch (err) {
        console.log('error')
        res.send(err)
    }
}

app.get('/test', (req, res) => {
    res.send({test : "OK"})
})

app.get('/containers/:uuid', setdocker, (req, res, next) => {
    req.docker.listContainers({all: true}, (err, containers) => {
>>>>>>> 1c12464 (testing implementation)
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
    }
    container.logs({
        follow: true,
        stdout: true,
        stderr: true
    }, (err, logs) => {
=======
app.get('/container/:uuid/:id', setdocker, (req, res, next) => {
    docker.getContainer(req.params.id).inspect((err, container) => {
>>>>>>> 1c12464 (testing implementation)
        if (err) {
            ws.send("websocket errors encountered");
            console.error(err);
        } else {
            ws.send("websocket connection established");
            logs.on('data', chunk => {
                let encodedLogs = Buffer.from(chunk, 'utf-8').toString();
                ws.send(encodedLogs);
            })
        }
    })
});

<<<<<<< HEAD
app.get('*', function(req, res) {
    res.sendFile('index.html', {root: path.join(__dirname, '..', 'docker-dashboard-front-end', 'build')});
=======
app.ws('/container/:uuid/:id/logs', setdocker, (ws, req) => {
    ws.on('message', (msg) => {
        let logOpts = {
            stdout: true,
            stderr: true,
            follow: true
        };
        req.docker.getContainer(req.params.id).logs(logOpts, (err, logs) => {
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
>>>>>>> 1c12464 (testing implementation)
});

app.use(function (err, req, res, next) {
    console.error(err.stack)
<<<<<<< HEAD
    res.status(500).send({
        err : err.stack
    })
=======
    res.status(500).send('Something broke!')
>>>>>>> 1c12464 (testing implementation)
})

app.listen(port, () => {
    console.log(`Docker plugin dashboard listening on http://localhost:${port}`)
});
