/**
 * 过滤器: 保存res.locals.user
 */
exports.getUser = function (req, res, next) {
    var uid = req.session['uid'];
    if(uid) {
        com.db.user.findOne({id: parseInt(uid)}, function (err, user) {
            if(!err && user) {
                res.locals.user = user;
                next();
            } else {
                req.locals.user = null;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
}