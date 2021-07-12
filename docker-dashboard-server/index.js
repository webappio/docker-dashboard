const express = require('express')
const app = express();
const port = 3001;

const Docker = require('dockerode');
const docker = new Docker({socketPath: '/var/run/docker.sock'});

app.get('/', (req, res) => {
    res.send('Hello World!')
});

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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});