var member_biz = require('../service/member');
var sessionFilter = require('../filters/session-filter');
//exports.before = [sessionFilter.getUser];

exports.views = {
    'register': function (req, res, next) {
        res.render('register');
    },
    'login': function (req, res, next) {
        var user = res.locals.user;
        if(!user) {
            res.render('login');
        } else {
            res.redirect('');
        }
    },
    'reset': function (req, res, next) {

    },
    'logout': function (req, res, next) {
        req.session.destroy();
        res.clearCookie("pet_uid").redirect('/member/login');
    }
}

/**
 * 登录
 */
exports.login = function (req, res, next) {
    var mail = req.param('mail');
    var pwd = req.param('pwd');
    member_biz.login(mail, pwd, function (err, user) {
        if(!err) {
            req.session['uid'] = user.id;
            res.json({});
        } else {
            res.json({err: err});
        }
    });
}

/**
 * 注册
 */
exports.register = function (req, res, next) {
    var mail = req.param('mail');
    var pwd = req.param('pwd');
    var pwd2 = req.param('pwd2');
    var user = {};
    user.mail = mail;
    user.pwd = pwd;
    member_biz.register(user, function (err, user) {
        res.json({err: err});
    });
}