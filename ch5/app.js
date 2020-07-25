const http = require('http');

const express = require('express');

const app = express();

/**
 * @argument function executes for every req
 */
app.use(
  /**
   * @argument req request
   * @argument res response
   * @argument next function
   */
  (req, res, next) => {
    console.log('In the middleware');
    next();
  }
);

app.use((req, res, next) => {
  console.log('In another middleware');
  res.send('<h>Hello from Express JS</h>');
});

const server = http.createServer(app);

server.listen(3000);
