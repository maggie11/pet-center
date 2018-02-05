var md5 = require('MD5');
var async = require('async');

/**
 * 账号登录
 * @param {*} mail 
 * @param {*} pwd 
 * @param {*} callback 
 */
exports.login = function (mail, pwd, callback) {
    mail = mail ? mail : '';
    if (!mail.match(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/))
        callback('邮箱输入错误', null);
    else if (!pwd || pwd.length < 6) 
        callback('密码格式不正确', null);
    else {
        pwd = md5(pwd + mail).substring(10, 30);
        com.db.user.findOne({mail: mail, pwd: pwd}, function (err, user) {
            if (!err && user) {
                if(user.state == -1) {
                    callback('账号还未激活', null);
                } else {
                    callback(null, user);
                }
            } else 
                callback(err || '账号或密码错误', null);
        })
    }
}

/**
 * 账号注册
 * @param {*} user 
 * @param {*} callback 
 */
exports.register = function (user, callback) {
    async.waterfall([
        function (next) {
            if(user && user.mail && user.pwd && user.pwd2 && user.name) {
                if(user.pwd === user.pwd2) {
                    next(null);
                } else {
                    next('两次密码输入不一致');
                }
            } else {
                next('数据错误');
            }
        },
        function (next) {
            if(!(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/).test(user.mail))
                next('邮箱输入错误');
            else if (user.pwd.length < 6 || !(/^[0-9A-Za-z_-]+$/).test(user.pwd))
                next('登录密码格式不正确');
            else 
                next(null);
        },
        function (next) {
            _validateMail(user.mail, function (err, result) {
                if(err) {
                    next(err);
                } else {
                    if(!result) 
                        next(null)
                    else 
                        next('邮箱已经注册');
                }
            });
        },
        function (next) {
            _validateName(user.name, function (err, result) {
                if(err) {
                    next(err);
                } else {
                    if(!result) 
                        next(null);
                    else 
                        next('用户名已经存在');
                }
            });
        },
        function (next) {
            user.pwd = md5(user.pwd + user.mail).substring(10, 30);
            getNextSequenceValue("userid", function (err, id) {
                console.log(err, id);
                if(err)
                    next(err);
                else {
                    user.id = id;
                    user.regdate = new Date();
                    user.state = -1;
                    next(null);
                }
            });
        }
    ], function (err, result) {
        if(err) {
            callback(err, null);
        } else {
            com.db.user.save(user, function (err, row) {
                if(!err && row) {
                    callback(null, row);
                } else {
                    callback(err || '注册失败', null);
                }
            })
        }
    });
}

/**
 * 发送验证码邮件
 * @param {*} mail 
 * @param {*} callback 
 */
exports.sendEmailToValidate = function (mail, callback) {
    
}

exports.reset = function (user, callback) {
    async.waterfall([
        function (next) {
            if(user.mail && user.code && user.pwd && user.pwd2) {
                if(user.pwd === user.pwd2) {
                    next(null);
                } else {
                    next('两次密码输入不一致');
                }
            } else {
                next('参数错误');
            }
        },
        function (next) {
            _validateMail(user.mail, function (err, result) {
                if(err) {
                    next(err);
                } else {
                    if(result)
                        next(null);
                    else
                        next('邮箱还未注册');
                }
            });
        },
        function (next) {
            var code_in_session = req.session("code");
            if(user.code === code_in_session) {
                next(null);
            } else {
                next('验证码错误');
            }
        }, 
        function (next) {
            com.db.user.update({mail: mail}, {$set: {pwd: md5(user.pwd + user.mail).substring(10, 30)}}, function (err, count) {
                if(!err && count > 0) {
                    next(null);
                } else {
                    next('重置密码失败');
                }
            });
        }
    ], function (err) {
        callback(err);
    });
}

/**
 * 验证邮箱号 
 * @param {*} mail 
 * @param {*} callback true 存在 false 不存在
 */
function _validateMail (mail, callback) {
    com.db.user.findOne({mail: mail}, function (err, user) {
        callback(err, user ? true : false);
    });
}

/**
 * 验证昵称
 * @param {*} name 
 * @param {*} callback true 存在 false 不存在
 */
function _validateName (name, callback) {
    com.db.user.findOne({name: name}, function (err, user) {
        callback(err, user ? true : false);
    })
}

/**
 * 获取下一个递增id
 * @param {*} sequenceName 
 * @param {*} cb 
 */
function getNextSequenceValue(sequenceName, callback){
    com.db.counters.findAndModify({
        query:{_id: sequenceName },
        update: {$inc:{seq:1}},
        new:true
    }, function (err, row) {
        if(!err && row) {
            callback(null, row.seq);
        } else {
            callback(err || '生成编号出错', null);
        }
    });
}