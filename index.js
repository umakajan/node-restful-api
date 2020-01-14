/**
 * Primary file for API
 */

// Dependencies
const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');

// The server should respond to all requests with a string
const server = http.createServer((req, res) => {
  if (req.url !== '/favicon.ico') {
    // Get URL and parse it
    const parsedUrl = url.parse(req.url, true);

    // Get the path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get the query string as an object
    const queryStringObject = parsedUrl.query;

    // Get the HTTP method
    const method = req.method.toLocaleUpperCase();

    // Get the headers as an object
    const { headers } = req;

    // Get the payload, if any
    const decoder = new StringDecoder('utf8');
    let buffer = '';

    /**
     * As the data is streaming, the request object emits a data event we are
     * binding to and we append that to the buffer we created
     */
    req.on('data', data => {
      buffer += decoder.write(data);
    });

    req.on('end', () => {
      buffer += decoder.end();

      // Send the response
      res.end('Hello World\n');

      // Log the request
      console.log(
        `Request received on path: ${trimmedPath} with method ${method}`
      );

      // String literals will not show entire object
      console.log('query string: ', queryStringObject);
      console.log('headers: ', headers);
      console.log('Payload: ', buffer);
    });
  }
});

// Start the server and listen on port 3000
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
