var member_biz = require('../service/member');

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
    'logout': function (req, res, next) {
        req.session.destroy();
        res.clearCookie("pet_uid").redirect('/member/login');
    }
}

/**
 * 登录
 */
exports.login = function (req, res, next) {
    var mobile = req.param('mobile');
    var pwd = req.param('pwd');
    
}

/**
 * 注册
 */
exports.register = function (req, res, next) {

}