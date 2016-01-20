var path = require("path");

module.exports = function (app) {
	var index = path.resolve(__dirname, '../..', 'client/index.html');
	var handler = function (req, res) {
		res.sendFile(index);
	};

	app.get('/register', handler);
	app.get('/userhome', handler);
	app.get('/userhome/*', handler);
	app.get('/profile', handler);
	app.get('/profile/*', handler);
	app.get('/settings', handler);
	app.get('/settings/*', handler);
	app.get('/challenges', handler);
	app.get('/challenges/*', handler);
	app.get('/steps', handler);
	app.get('/logout', handler);
	app.get('/quizzes', handler);
	app.get('/quizzes/*', handler);
	app.get('/settings', handler);
	app.get('/settings/*', handler);
	app.get('/goals', handler);
	app.get('/goals/*', handler);
	app.get('/friends', handler);
	app.get('/leaderboard', handler);
	app.get('/aboutus', handler);
	app.get('/howto', handler);
	app.get('/datasecurity', handler);
	app.get('/impressum', handler);
	app.get('/tos', handler);
	app.get('/faq', handler);
	app.get('/userdeleted', handler);
	app.get('/error/*', handler);
};
