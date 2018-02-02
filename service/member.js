var md5 = require('MD5');

exports.login = function (mobile, pwd, callback) {
    mobile = mobile ? (mobile.replace(/^\+*86(\d{11})$/, "$1")) : '';
    if (!mobile.match(/^\d{11}$/))
        callback('手机号输入错误', null);
    else if (!pwd || pwd.length < 6) 
        callback('密码格式不正确', null);
    else {
        pwd = md5(pwd + mobile).substring(10, 25);
        com.db.user.findOne({mobile: mobile, pwd: pwd}, function (err, user) {
            if (!err && user)
                callback(null, user);
            else 
                callback(err || '账号或密码错误', null);
        })
    }
}