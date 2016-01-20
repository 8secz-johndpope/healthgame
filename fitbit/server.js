/**
 * Healingo | (c) 2015 webvariants GmbH & Co. KG
 */

/**
 * This is the subscription endpoint. It is listening on a port and just responsible for receiving
 * the fitbit notications and putting jobs on the beanstalk queue.
 *
 * In production, this runs behind nginx.
 */

var
	config    = require('./config.json'),
	http      = require('http'),
	crypto    = require('crypto'),
	fivebeans = require('fivebeans');

function readRequestBody(request, callback) {
	var body = '';

	request.on('data', function(data) {
		body += data;

		if (body.length > 1e6) {
			request.connection.destroy();
		}
	});

	request.on('end', function() {
		callback(body);
	});
}

function nil() {

}

function formatDate(date) {
	var day   = date.getDate();
	var month = date.getMonth() + 1;
	var year  = date.getFullYear();

	return year + '-' + (month < 10 ? ('0' + month) : month) + '-' + (day < 10 ? ('0' + day) : day);
}

var queue = new fivebeans.client(config.queue.host, config.queue.port);

var server = http.createServer(function (req, res) {
	var headers = req.headers;
	var now     = (new Date).toUTCString();

	res.writeHead(204, {'Content-Type': 'text/plain'});

	// if it's a not a POST, we don't want it
	if (req.method !== 'POST') {
		console.error('[' + now + '] Received non-POST request.');
		res.end();
		return;
	}

	// check for a transmitted signature
	if (!('x-fitbit-signature' in headers)) {
		console.error('[' + now + '] Received request without X-Fitbit-Signature header.');
		res.end();
		return;
	}

	var signature = headers['x-fitbit-signature'];

	readRequestBody(req, function(body) {
		// compute the HMAC for this payload
		// (pretend that this is OAuth-style signature generating without a consumer key, hence the
		// appended "&" to the HMAC's secret)
		var hash = crypto.createHmac('sha1', config.oauth2.clientSecret + '&').update(body.trim()).digest().toString('base64');

		if (hash !== signature) {
			console.error('[' + now + '] Received request with INVALID signature (received: "' + signature + '", calculated: "' + hash + '").');
			res.end();
			return;
		}

		// decode the payload
		var payload = JSON.parse(body);
		var today   = formatDate(new Date());

		var user, row, date;

		for (var i = 0; i < payload.length; ++i) {
			row  = payload[i];
			user = row.ownerId;
			date = row.date;

			if (row.collectionType !== 'activities') {
				continue;
			}

			// skip notifications for future dates, because we are mostly interested in real steps and we cannot get
			// a notification for future dates with these.
			if (date > today) {
				continue;
			}

			queue.put(config.queue.priority, config.queue.delay, config.queue.ttr, JSON.stringify({
				job:        'fitbit-fetch',
				fitbitUser: user,
				date:       date
			}), nil);

			console.log('[' + now + '] user ' + user + ' @ ' + date);
		}

		res.end('Thanks.');
	});
});

// connect to beanstalk
queue
	.on('connect', function() {
		queue.use(config.queue.tube, function() {
			console.log('Connection to beanstalkd established.');

			// keep a heartbeat running to keep the connection alive
			setInterval(function() { queue.stats(nil); }, 60*1000);

			// fire up the server
			server.listen(config.listen.port, config.listen.host);
			console.log('Server is ready and listening on ' + config.listen.host + ':' + config.listen.port + ' ...');
		});
	})
	.on('error', function(e) {
		console.error('A problem occured while communicating with beanstalkd: ' + e);
		process.exit(1);
	})
	.connect();
