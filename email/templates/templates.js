var EmailTemplate = require('email-templates').EmailTemplate;
var path          = require('path');

function renderLetter(mailName, data, next) {
  var mailDir  = path.join(__dirname, mailName);
  var template = new EmailTemplate(mailDir);
  var config   = require(path.join(__dirname, '..', '..', 'server/config.json'));

  data.host = config.fitbit.callbackBase + '/dist';

  template.render(data, function (err, results) {
    if (err) {
      throw err;
    }

    if (next) {
      next(results)
    }
  });
}

exports.renderLetter = renderLetter;
