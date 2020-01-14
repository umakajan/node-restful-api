# Notes

- use openssl to install https certificates
- http and https need to operate on different ports

```
$ openssl req -newKey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```

```
Generating a RSA private key
................................................................................................................................................................................+++++
...................+++++
writing new private key to 'key.pem'
-----
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [AU]:CA
State or Province Name (full name) [Some-State]:Ontario
Locality Name (eg, city) []:Toronto
Organization Name (eg, company) [Internet Widgits Pty Ltd]:Umakajan.com
Organizational Unit Name (eg, section) []:Umakajan.com
Common Name (e.g. server FQDN or YOUR name) []:Umakajan
Email Address []:umakajan@umakajan.com
```
