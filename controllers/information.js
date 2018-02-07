var information_biz = require('../service/information');
var sessionFilter = require('../filters/session-filter');
exports.before = [sessionFilter.getUser];

exports.views = {
    'add': [sessionFilter.auth, function (req, res, next) {
        res.render('add');
    }],


}

exports.saveInformation = function (req, res) {
    var info = {
        title: req.param('title') || '',
        content: req.param('content') || '',
        images: req.param('images') || '',
        local: req.param('local') || '',
        type: req.param('type') || '',
        _id: req.param('_id') || com.env.guid(),
        author: res.locals.user.id,
        regdate: new Date(),
        state: 0
    };
    information_biz.saveInformation(info, function (err, row) {
        res.json({
            err: err ? err : null,
            errcode: err ? 300 : 0,
            result: row
        });
    });
}