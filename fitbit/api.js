var
	https = require('https'),
	qs    = require('querystring');

function FitbitAPI(oauthClientID, oauthClientSecret) {
	this.clientID = oauthClientID;
	this.secret   = oauthClientSecret;
}

FitbitAPI.STATUS_OK      = 1;
FitbitAPI.STATUS_EXPIRED = 2;
FitbitAPI.STATUS_BADREQ  = 3;
FitbitAPI.STATUS_FAILURE = 4;

FitbitAPI.prototype = {
	createAccessTokenFromCode: function(code, callbackUri, doneCallback) {
		var opt = {
			method: 'POST',
			path:   '/oauth2/token',
			auth:   this.clientID + ':' + this.secret
		}, data = {
			client_id:    this.clientID,
			grant_type:   'authorization_code',
			redirect_uri: callbackUri,
			code:         code
		};

		apiRequest(opt, data, function(status, body) {
			var at = null, rt = null;

			if (status === FitbitAPI.STATUS_OK) {
				at = body.access_token;
				rt = body.refresh_token;
			}

			doneCallback(status, at, rt, body);
		});
	},

	refreshToken: function(refreshToken, doneCallback) {
		var opt = {
			method: 'POST',
			path:   '/oauth2/token',
			auth:   this.clientID + ':' + this.secret
		}, data = {
			grant_type:    'refresh_token',
			refresh_token: refreshToken
		};

		apiRequest(opt, data, function(status, body) {
			var at = null, rt = null;

			if (status === FitbitAPI.STATUS_OK) {
				at = body.access_token;
				rt = body.refresh_token;
			}

			doneCallback(status, at, rt, body);
		});
	},

	createSubscription: function(fitbitUserID, accessToken, doneCallback) {
		// restrict to the given useer instead of "-" to make sure we're not accidentally creating a
		// wrong-fully named subscription for another user
		authedApiRequest('POST', '/1/user/' + fitbitUserID + '/apiSubscriptions/allchanges-' + fitbitUserID + '.json', accessToken, null, doneCallback);
	},

	deleteSubscription: function(fitbitUserID, accessToken, doneCallback) {
		authedApiRequest('DELETE', '/1/user/' + fitbitUserID + '/apiSubscriptions/allchanges-' + fitbitUserID + '.json', accessToken, null, doneCallback);
	},

	getActivities: function(accessToken, date, doneCallback) {
		authedApiRequest('GET', '/1/user/-/activities/date/' + date + '.json', accessToken, null, doneCallback);
	},

	getTimeSeries: function(accessToken, path, date, end, doneCallback) {
		authedApiRequest('GET', '/1/user/-/' + path + '/date/' + date + '/' + end + '.json', accessToken, null, function(status, data) {
			for (var key in data) {
				if (data.hasOwnProperty(key)) {
					doneCallback(status, data[key]);
					return;
				}
			}

			throw 'Did not receive an object with at least one key for getTimeSeries(). This is weird...';
		});
	},

	getSteps: function(accessToken, date, doneCallback) {
		this.getActivities(accessToken, date, function(status, data) {
			if (status !== FitbitAPI.STATUS_OK) {
				doneCallback(status, null, null, data);
				return;
			}

			var total  = data.summary.steps;
			var manual = 0;

			for (var i = 0; i < data.activities.length; ++i) {
				var activity = data.activities[i];

				if ('steps' in activity) {
					manual += activity.steps;
				}
			}

			doneCallback(status, total, manual, data);
		});
	},

	getUserInfo: function(accessToken, doneCallback) {
		authedApiRequest('GET', '/1/user/-/profile.json', accessToken, null, function(status, body) {
			if (status === FitbitAPI.STATUS_OK) {
				body = body.user;
			}

			doneCallback(status, body);
		});
	},

	getDevices: function(accessToken, doneCallback) {
		authedApiRequest('GET', '/1/user/-/devices.json', accessToken, null, doneCallback);
	}
};

function authedApiRequest(method, uri, accessToken, data, doneCallback) {
	console.log(method, uri);
	apiRequest({
		method:  method,
		path:    uri,
		headers: { Authorization: 'Bearer ' + accessToken }
	}, data, doneCallback);
}

function apiRequest(options, data, doneCallback) {
	options.hostname = 'api.fitbit.com';

	if (!('headers' in options)) {
		options.headers = {};
	}

	options.headers.Accept = 'application/json';

	if (data) {
		data = qs.stringify(data);

		options.headers['Content-Type']   = 'application/x-www-form-urlencoded';
		options.headers['Content-Length'] = data.length;
	}

	var req = https.request(options, function(res) {
		var status = res.statusCode;

		readResponseBody(res, function(body) {
			var code = 0;

			if (status === 200) {
				code = FitbitAPI.STATUS_OK;
			}
			else if (status == 401 || status == 403) {
				code = FitbitAPI.STATUS_EXPIRED;
			}
			else if (status >= 400 && status < 500) {
				code = FitbitAPI.STATUS_BADREQ;
			}
			else {
				code = FitbitAPI.STATUS_FAILURE;
			}

			doneCallback(code, body ? JSON.parse(body) : null);
		});
	});

	req.on('error', function(e) {
		doneCallback(FitbitAPI.STATUS_FAILURE, e);
	});

	// finalise request
	if (data) {
		req.write(data);
	}

	req.end();
}

function readResponseBody(response, callback) {
	var body = '';

	response.on('data', function(data) {
		body += data;

		if (body.length > 1e6) {
			response.connection.destroy();
		}
	});

	response.on('end', function() {
		callback(body);
	});
}

module.exports = FitbitAPI;
