const express = require('express')
const path = require('path')
const routes = require('express').Router()


routes.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, '../public/index.html'))
);

module.exports = htmlRoutes