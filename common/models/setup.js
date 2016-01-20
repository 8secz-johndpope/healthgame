module.exports = function(setup) {
	setup.info = function (cb) {
		var fitbitConfig = setup.app.get('fitbit');
		cb(null, {
			clientId:     fitbitConfig.clientId,
			callbackPath: fitbitConfig.callbackPath,
			callbackBase: fitbitConfig.callbackBase,
			authorizationUrl: fitbitConfig.authorizationUrl,
			scope: fitbitConfig.scope
		});
	};

	setup.remoteMethod(
		'info',
		{
			http: {path: '/info', verb: 'get'},
			returns: {arg: 'info', type: 'object'}
		}
	);
	
	setup.disableRemoteMethod('create', true);
	setup.disableRemoteMethod('upsert', true);
	setup.disableRemoteMethod('find', true);
	setup.disableRemoteMethod('findOne', true);
	setup.disableRemoteMethod('findById', true);
	setup.disableRemoteMethod('deleteById', true);
	setup.disableRemoteMethod('exists', true);
	setup.disableRemoteMethod('count', true);
	setup.disableRemoteMethod('createChangeStream', true);
	setup.disableRemoteMethod('updateAll', true);
	setup.disableRemoteMethod('updateAttributes');
};
