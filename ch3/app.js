const http = require("http");

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
const server = http.createServer((req, res) => {
  console.log({ url: req.url, method: req.method, headers: req.headers });

  /**
   * Hard exit the event loop server listener
   */
  // process.exit();

  res.setHeader("Content-type", "text/html");
  res.write("<html>");
  res.write("<header><title>My first page with Node JS</title></header>");
  res.write("<body><h1>Hello Owls</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);
