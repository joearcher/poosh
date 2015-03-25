#Poosh
###Simple websocket push messaging server.

##Introduction
Poosh is a simple websocket push messaging server based on [Express.js](http://expressjs.com/) and [Socket.io](http://socket.io). It consists of an Express application which listens on two configurable ports. 

A "client" port to which socket.io clients connect and through which messages are pushed. 

And a "server" port which accepts token authenticated POST requests on which the push messages are based.

##Configuration
Poosh uses [Dotenv](https://www.npmjs.com/package/dotenv) for configuration there are 3 configuration options stored in the .env file.

`CLIENT_PORT` (Default: 8000) - The port number on which the websocket clients should connect.

`SERVER_PORT` (Default: 1337) - The port number on which the server listens for POST requests.

`SERVER_SECRET` (Default: none) - The shared secret on which token authentication is based.

##How it works
![Poosh diagram](http://imgur.com/DcHezQw)

Clients connect to the server using the socket.io client library on the configured client port. 
This may look something like this in an html file.

````
<script src="https://cdn.socket.io/socket.io-1.3.4.js"></script>
	<script>
	  var socket = io.connect('http://pooshserver:8000');
	  
	  socket.on('event-name',function(data){
	  	{... do something with the received data ...}
	  });
</script>
````

Your application can then make POST requests to Poosh in the following manner.

The POST body must be a JSON object with the following prototype:
````
{
	event: "event-name",
	payload:{
		key1: "value1",
		key2: "value2"
	} 
}
````
The POST headers must contain an `authorization` header who's value is a token. The token should be an SHA1 hash of the SERVER_SECRET and the JSON encoded payload. In PHP this process would look like:

````
$secret = 'thisisthesharedsecret'
$payload = json_encode(['key1' => 'value1', 'key2' => 'value2']);
$token = sha1($secret.$payload);
````

This ensures that push message requests can only come from a server which has the shared secret, and that the payload cannot be modified in transit without the token being incorrect.

The POST request should also include a `content-type: application/json` header so the body is correctly decoded by Poosh.

