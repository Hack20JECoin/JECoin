# JECoin

## Getting started

First, install the dependencies using:
```
npm i
```

If running locally, run ngrok to expose your local port by running:
```
./node_modules/.bin/ngrok http 3000
```

Take the ngrok address (ending in .io), add '/webhook' to the end of it and put it in the webhooks URL in the settings for this repo:

```
http://xxxxxxx.io/webhook
```

Start the node server from the root of the repo with

```
node server.js
```

Boom! Good to go
