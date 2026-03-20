const server = require('./app');

const port = 8000;

server.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
