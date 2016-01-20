/**
 * Healingo | (c) 2015 webvariants GmbH & Co. KG
 */

/**
 * Extremely hacky dummy server to perform the OAuth worklow and get fresh tokens for a user.
 * Mainly used for debugging purposes by xrstf.
 */

var
	http  = require('http'),
	https = require('https'),
	qs    = require('querystring'),
	API   = require('./api.js');

var host         = 'eve.gg';
var port         = 9000;
var clientID     = '229QGP';
var clientSecret = '70857aa7740c692748b1b7f48f5c544f';
var callbackUri  = 'http://' + host + ':' + port + '/return';

var server = http.createServer(function (req, res) {
	if (req.url === '/') {
		var data = qs.stringify({
			'client_id':       clientID,
			'redirect_uri':    callbackUri,
			'state':           'abc123',
			'scope':           'activity profile settings',
			'response_type':   'code',
			'approval_prompt': 'auto'
		});

		res.writeHead(302, {
			Location: 'https://www.fitbit.com/oauth2/authorize?' + data
		});

		res.end();
		return;
	}

	var query = qs.parse(req.url);

	if (!('code' in query)) {
		res.writeHead(400, {'Content-Type': 'text/plain'});
		res.end('No `code` found. Auth did not work. Fuck.');
		return;
	}

	var api = new API(clientID, clientSecret);
	api.createAccessTokenFromCode(query.code, callbackUri, function(status, accessToken, refreshToken, body) {
		res.writeHead(200, {'Content-Type': 'application/json'});
		res.end(JSON.stringify(body));
	});
});

// connect to beanstalk
server.listen(port, host);
console.log('Server is ready and listening on ' + host + ':' + port + ' ...');
