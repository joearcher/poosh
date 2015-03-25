#Poosh
###Simple websocket push messaging server.

##Introduction
Poosh is a simple websocket push messaging server based on [Express.js](http://expressjs.com/) and [Socket.io](http://socket.io). It consists of an Express.js application which listens on two configurable ports. 
A "client" port to which socket.io clients connect and through which messages are pushed. 
And a "server" port which accepts token authenticated POST requests on which the push messages are based.

##Configuration
Poosh uses [Dotenv](https://www.npmjs.com/package/dotenv) for configuration there are 3 configuration options stored in the .env file.

**CLIENT_PORT** - The port number on which the websocket clients should connect.
**SERVER_PORT** - The port number on which the server listens for POST requests.
**SERVER_SECRET** - The shared secret on which token authentication is based.

