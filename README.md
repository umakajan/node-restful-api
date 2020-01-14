# nodejs-master-class

This repo is created following the tutorial offered by [Pirple - The Node.js Master Class
](https://pirple.thinkific.com/courses/the-nodejs-master-class)

## Prerequisites

In order to run the https server, you will need to create a `./http` directory in your root directory and run the following command:

```
openssl req -newKey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```

This will create two files `cert.pem` and `key.pem`, which are needed to run your server.
