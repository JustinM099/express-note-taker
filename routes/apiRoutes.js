const express = require('express')
const path = require('path')
const routes = require('express').Router()


routes.get('/db', (req, res) =>
res.json(path.join(__dirname, '../db/db.json'))
);

module.exports = apiRoutes