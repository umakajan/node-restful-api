/**
 * Primary file for API
 */

// Dependencies
const http = require('http');
const url = require('url');

// The server should respond to all requests with a string
const server = http.createServer((req, res) => {
  // Get URL and parse it
  const parsedUrl = url.parse(req.url, true);

  // Get the path
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // Get the HTTP method
  const method = req.method.toLocaleUpperCase();

  // Send the response
  res.end('Hello World\n');

  // Log the request
  console.log(`Request received on path: ${trimmedPath} with method ${method}`);
});

// Start the server and listen on port 3000
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
