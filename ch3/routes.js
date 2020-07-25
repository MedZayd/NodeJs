const fs = require('fs');

const requestHandler = (req, res) => {
  const { url, method } = req;
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
      body.push(chunk);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFileSync('message.txt', message);
      res.statusCode = 302;
      res.setHeader('Location', '/');
      return res.end();
    });
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
};

module.exports = requestHandler;
