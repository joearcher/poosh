module.exports = {
    tokenCheck: function(SECRET){
    	return function(req,res,next){
    		sha1 = require('sha1');
    		//check for an auth header
	    	if(typeof req.headers.authorization == 'undefined' || req.headers.authorization == ''){
	    		res.status(401).end();
	    		return;
	    	}

	    	//stringify the payload for hashing
	    	payload = JSON.stringify(req.body.payload);
	    	
	    	//make the hash
	    	hash = sha1(SECRET+payload);

	    	//get the token
	    	token = req.headers.authorization;

	    	//compare the two
	    	if(hash != token){
	    		res.status(401).end();
	    		return;
	    	}

	    	//matched!
	    	next();
    	}  	
    }
}