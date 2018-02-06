var sessionFilter = require('../filters/session-filter');
exports.before = [sessionFilter.getUser, sessionFilter.auth];

exports.views = {
    'account': function (req, res, next) {
        res.render('account');
    }
}