const http = require('http');
const fs = require('fs');

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
  const { url, method } = req;
  console.log({ url, method });
  if (url === '/') {
    res.write('<html>');
    res.write('<head>');
    res.write('<title>My first page with Node JS</title>');
    res.write(
      '<link rel="icon" href="https://nodejs.org/static/images/favicons/favicon.ico">'
    );
    res.write('</head>');
    res.write('<body>');
    res.write('<form action="/message" method="POST">');
    res.write('<input type="text" name="message">');
    res.write('<button type="submit">Send</button>');
    res.write('</form>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
  }
  if (url === '/message' && method === 'POST') {
    // Parsing our data
    const body = [];
    req.on('data', (chunk) => {
      console.log({ chunk });
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFileSync('message.txt', message);
    });
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }
  res.setHeader('Content-type', 'text/html');
  res.write('<html>');
  res.write('<head>');
  res.write('<title>My first page with Node JS</title>');
  res.write(
    '<link rel="icon" href="https://nodejs.org/static/images/favicons/favicon.ico">'
  );
  res.write('</head>');
  res.write('<body><h1>Hello Owls</h1></body>');
  res.write('</html>');
  res.end();
});

server.listen(3000);
