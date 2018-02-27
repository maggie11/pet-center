var information_biz = require('../service/information');
var sessionFilter = require('../filters/session-filter');
exports.before = [sessionFilter.getUser];

exports.views = {
    'add': [sessionFilter.auth, function (req, res, next) {
        res.render('add', {information: null});
    }],

    //编辑信息
    'edit': [sessionFilter.auth, function (req, res, next) {
        var id = req.param('id');
        information_biz.getInformationsDetail(id, function (err, row) {
            if(err) {
                //错误提示
                res.redirect('/info/myreleased');
            } else {
                res.render('add', {information: row});
            }
        });
    }],

    //擦亮信息
    'fresh': [sessionFilter.auth, function (req, res, next) {
        var id = req.param('id');
        information_biz.updateInformation(id, function (err) {
            if(err) {
                //错误提示
            } else {
                //成功提示
            }
            res.redirect('/info/myreleased');
        });
    }],

    //删除信息
    'del': [sessionFilter.auth, function (req, res, next) {
        var id = req.param('id');
        information_biz.deleteInformation(id, function (err) {
            if(err) {
                //错误提示
            } else {
                //成功提示
            }
            res.redirect('/info/myreleased');
        });
    }]
}

/**
 * 保存信息
 * @param {*} req 
 * @param {*} res 
 */
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