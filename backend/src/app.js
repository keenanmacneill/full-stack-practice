require('dotenv').config();

const express = require('express');
const knex = require('knex')(require('./knexfile').development);

const app = express();

app.use(express.json());

module.exports = app;
