module.exports = function mountRestApi(server) {
	var restApiRoot = server.get('restApiRoot');

	server.generateDateString = function(date) {
		return date.getFullYear() + '-' +  ('0' + (date.getMonth()+1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
	};

	server.generateDateTimeString = function(date) {
		return date.toISOString().substring(0, 19).replace('T', ' ');
	};

	server.sortAndFlat = function(target, key, max) {
		var result = [];
		for (var index in target) {
			if (target.hasOwnProperty(index)) {
				result.push(target[index]);
			}
		}

		result.sort(function (a, b) {
			return b[key] - a[key];
		});

		if (max && result.length > max) {
			result = result.slice(0, max);
		}
		return result;
	};

	server.use(restApiRoot, function (req, res, next) {
		if(req.session.accessToken) {
			// To simplify things in the frontend, only one session-toke is delivered outside
			req.headers['x-access-token'] = 'Bearer ' + new Buffer(req.session.accessToken).toString('base64');
			console.log('Token: ' + req.session.accessToken);
		}
		next();
	});
	server.use(restApiRoot, server.loopback.rest());
};
