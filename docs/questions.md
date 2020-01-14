# Questions

1. What information is received by the server from a request by the browser?
2. What information is received by the server from a request by the terminal?
3. What is the difference between the two?

```
const handler = router[trimmedPath] || router.notFound;

const handler =
  typeof router[trimmedPath] !== 'undefined'
    ? router[trimmedPath]
    : router.notFound;
```

4. What is HTTPS and what is required to add support
