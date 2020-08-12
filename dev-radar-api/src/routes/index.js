const express = require('express');
const devsRoutes = require('./devs');

const app = express();

app.use('/devs', devsRoutes);

module.exports = app;
