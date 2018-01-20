const express = require('express');
const path = require('path');
const Site = require('./site');
const Geolocation = require('./geolocation');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/../html'));
app.use('/static', express.static(path.join(__dirname, '/../static')));
app.use('/scripts', express.static(path.join(__dirname, '/../scripts')));
app.use('/', Site);
app.use('/api/v1/location/', Geolocation);

module.exports = app;
