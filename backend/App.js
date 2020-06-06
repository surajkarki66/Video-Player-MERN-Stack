const express = require('express');
const app = express();

app.use('/', (req, res) => {
    res.send('App is running');
});

module.exports = app;