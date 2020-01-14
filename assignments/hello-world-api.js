/**
 * Homework Assignment #1: Hello World API
 */
const http = require('http');
const url = require('url');

http
  .createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    if (trimmedPath === 'hello') {
      res.setHeader('Content-type', 'application/json');
      res.writeHead(200);
      res.write('Hello World!');
    } else {
      res.writeHead(404);
    }
    res.end();
  })
  .listen(3000, () => {
    console.log('Server is running on port 3000');
  });
