//load the config
require('dotenv').load();

//requires for the server api
var bodyParser = require('body-parser');
var apiServer = require('express')();
var api = require('http').Server(apiServer).listen(process.env.SERVER_PORT);
var middleware = require('./middleware');
var SECRET = process.env.SERVER_SECRET;

//stop execution if secret is not set
if(SECRET == null || SECRET == ""){
	throw new Error("Configuration error - You must set a SERVER_SECRET in the .env file");
}
//check the secret is of a rational, size >9 chars
if(SECRET.length < 10){
	throw new Error("Configuration error - Secret should be at least 10 characters");
}

//requires for websocket clients
var app = require('express')();
var server = require('http').Server(app).listen(process.env.CLIENT_PORT);
var io = require('socket.io')(server);


//set express to parse post content properly
apiServer.use(bodyParser.json());

//middleware to check for valid token so people cant just make requests
//token is an md5 of the shared secret and the timestamp.
apiServer.use(middleware.tokenCheck(SECRET));

//function to broadcast event to all clients
apiServer.send = function(event,data){
	io.emit(event,data);
	return true;
}

//broadcasts payload to all connected clients listening for the event
apiServer.post('/send',function(req,res){
	apiServer.send(req.body.event,req.body.payload);
	res.end();
});

//responds with a 401 to all GET requests on server port all server requests are POSTed
apiServer.get('*',function(req, res){
	res.status(401).end();
});


//responds to get request on client port only websocket connections are OK
app.get('*',function(req, res){
	res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'You\'re not a websocket client!'}));
});




