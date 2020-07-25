const http = require('http');
const routes = require('./routes');

/**
 * createServer takes as argument a requestListener function
 * that executes for every incoming request.
 * @argument Function requestListener
 * @returns Server server
 *
 * requestListener takes two arguments:
 *  req: IncomingMessage,
 *  res: ServerResponse
 */
const server = http.createServer(routes);

server.listen(3000);
