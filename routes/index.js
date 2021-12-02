const express = require('express');
const notesRouter = require('./notes')
const app = express();

//middleware to direct fetches
app.use('/notes', notesRouter);
app.use('/api/notes', notesRouter)

module.exports = app;