require('dotenv').config();

const express = require('express');
const app = express();
const petsRoutes = require('./modules/pets/pets.routes');

app.use(express.json());

app.use('/pets', petsRoutes);

module.exports = app;
