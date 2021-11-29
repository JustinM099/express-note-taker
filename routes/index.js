const express = require('express');
const router = require('express').Router()

// Import our modular routers for /tips and /feedback
const htmlRoutes = require('./htmlRoutes');
const apiRoutes = require('./apiRoutes');
const notesRouter = require('./notes')

const app = express();

app.use('/', htmlRoutes);
app.use('/notes', notesRouter);
app.use('/db', apiRoutes);

module.exports = app;