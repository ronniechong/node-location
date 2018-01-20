const express = require('express');
const path = require('path');
const Site = require('./site');
const Geolocation = require('./geolocation');

const app = express();
const cwd = process.cwd();
app.set('view engine', 'pug');
app.set('views', path.join(cwd, 'app/html'));
app.use('/static', express.static(path.join(cwd, 'app/static')));
app.use('/scripts', express.static(path.join(cwd, 'app/scripts')));
app.use('/', Site);
app.use('/api/v1/location/', Geolocation);

module.exports = app;
