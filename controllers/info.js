var sessionFilter = require('../filters/session-filter');
var mark_biz = require('../service/mark');
var information_biz = require('../service/information');
exports.before = [sessionFilter.getUser, sessionFilter.auth];

exports.views = {
    'account': function (req, res, next) {
        res.render('account');
    },
    'myconcerned': function (req, res, next) {
        var user = res.locals.user;
        mark_biz.getMarkList(user.id, 1, 10, function (err, arr) {
            res.render('myconcerned', {err: err, list: arr});
        });
    },
    'myreleased': function (req, res, next) {
        var user = res.locals.user;
        information_biz.getInformationsList({author: user.id}, 1, 10, function (err, arr) {
            res.render('myreleased', {err: err, list: arr});
        });
    }
}