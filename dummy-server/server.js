'use strict';

const express = require('express');
const cors = require('cors');
const uuid = require('uuid/v1');
const bodyParser = require('body-parser');
const config = {
    PORT: 8080,
    HOST: 'localhost'
};

const allowedUserNames = ['Tommi', 'Admin'];
const allowedPassword = '12345';

const dummyToken = uuid();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/api/profile', (req, res) => {
    const token = req.get('authorization').replace('Bearer ', '');
    if (token === dummyToken) {
        res.status(200).json({
            name: 'Tommi',
            token: dummyToken,
        });
        return;
    }
    res.status(401).json({
        msg: 'Invalid token.'
    });
});

app.post('/api/login', (req, res) => {
    const { userName, password } = req.body;
    if (allowedUserNames.includes(userName) && password === allowedPassword) {
        res.status(200).json({
            msg: 'Login successful',
            token: dummyToken,
        });
        return;
    }
    res.status(401).json({
        msg: 'Wrong username or password.'
    });
})

app.listen(config.PORT, config.HOST, () => {
    console.log(`Listening in: http://${config.HOST}:${config.PORT}/api`);
});