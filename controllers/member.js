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
        res.render('reset');
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
    var name = req.param('name');
    var user = {};
    user.mail = mail;
    user.pwd = pwd;
    user.pwd2 = pwd2;
    user.name = name;
    member_biz.register(user, function (err, user) {
        res.json({err: err});
    });
}

/**
 * 重置密码
 */
exports.reset = function (req, res, next) {
    var mail = req.param('mail');
    var code = req.param('code');
    var pwd = req.param('pwd');
    var pwd2 = req.param('pwd2');
    var user = {};
    user.mail = mail;
    user.pwd = pwd;
    user.pwd2 = pwd2;
    user.code = code;
    member_biz.reset(user, function (err) {
        res.json({err: err});
    });
}

/**
 * 发送验证码邮件
 */
exports.sendEmailToValidate = function (req, res, next) {

}