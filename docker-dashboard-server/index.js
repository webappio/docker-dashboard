const express = require('express')
const app = express();
const expressWs = require('express-ws')(app);
const port = 3001;
const Docker = require('dockerode');
var docker = new Docker({socketPath: '/var/run/docker.sock'});
app.use(express.json());


app.post('/setip', (req, res, next) => {
    console.log(req.body);
    docker = new Docker({ host : req.body.host, port : 2375})
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
                //next(err);
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
    console.log(`Docker plugin dashboard listening on port ${port}!`)
});
