const express = require('express');
const app = express();
const port = 8081;

const knex = require('knex')(require('./knexfile')['development']);

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('App up and running!');
});

app.get('/pets', (req, res) => {
  knex('pet')
    .select('*')
    .then(pets => {
      const petNames = pets.map(p => p.name);
      res.json(petNames);
    });
});
