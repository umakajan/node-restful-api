/**
 * Primary file for API
 */

// Dependencies
const http = require('http');

// The server should respond to all requests with a string
const server = http.createServer((req, res) => {
  res.end('Hello world\n');
});

// Start the server and listen on port 3000
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
