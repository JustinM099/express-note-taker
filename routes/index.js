const express = require('express');
const tips = require('express').Router()

// Import our modular routers for /tips and /feedback
const htmlRoutes = require('./htmlRoutes');
const apiRoutes = require('./apiRoutes');

const app = express();

app.use('/', htmlRoutes);
app.use('/notes', htmlRoutes);
app.use('/db', apiRoutes);

module.exports = app;