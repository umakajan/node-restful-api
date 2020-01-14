/**
 * Primary file for API
 */

// Dependencies
const http = require('http');
const url = require('url');
const { StringDecoder } = require('string_decoder');

const config = require('./config');

// Define the handlers
const handlers = {
  sample: (data, callback) => {
    // Callback a HTTP status code and a payload (object)
    callback(406, { name: 'sample handler' });
  },
  notFound: (data, callback) => {
    callback(404);
  },
};

// Define a request router
const router = {
  sample: handlers.sample,
};

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

      // Choose the handler this request should go to
      // const handler = router[trimmedPath] || router.notFound;

      const handler =
        typeof router[trimmedPath] !== 'undefined'
          ? router[trimmedPath]
          : handlers.notFound;

      const data = {
        trimmedPath,
        queryStringObject,
        method,
        headers,
        payload: buffer,
      };

      // Route the request to the handler specified in the router
      handler(data, (_statusCode, _payload) => {
        // Use the status code called by the handler or default 200
        const statusCode = typeof _statusCode === 'number' ? _statusCode : 200;

        const payload = typeof _payload === 'object' ? _payload : {};
        const payloadString = JSON.stringify(payload);

        // Return the response
        res.setHeader('Content-type', 'application/json');
        res.writeHead(statusCode);
        res.end(payloadString);
      });
    });
  }
});

// Start the server and listen on port 3000
server.listen(config.port, () => {
  console.log(
    `Server is running on port ${config.port} in ${config.envName} mode`
  );
});
