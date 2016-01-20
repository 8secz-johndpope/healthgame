var extend = require('util')._extend;

// https://gist.github.com/pulkitsinghal/43d4bae2467c686ec55b

module.exports = function (server) {
	var loopback = server.loopback;
	var User = loopback.getModel('User');

	var config = require('../../common/models/h-user.json');
	config.dataSource = server.dataSources.mysqlDs;

	for (var property in config.properties) {
		if (config.properties.hasOwnProperty(property)) {
			var definition = config.properties[property];
			User.defineProperty(property, definition);
		}
	}

	loopback.configureModel(User, config); // this merges ACLs

	for (var j in config.relations) {
		if (config.relations.hasOwnProperty(j)) {
			var r = config.relations[j];
			r.as = j;
			var model = r.model;
			var type = r.type;
			delete r.model;
			delete r.type;
			if (!r.through) {
				User[type](loopback.getModel(model), r);
			} else {
				r.through = loopback.getModel(r.through);
				User[type](loopback.getModel(model), r);
			}
		}
	}

	require('../../common/models/h-user.js')(User);

};
