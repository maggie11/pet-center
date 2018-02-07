/**
 * 关注信息
 * @param {*} userid 
 * @param {*} infoid 
 * @param {*} callback 
 */
exports.addMark = function (userid, infoid, callback) {
    com.db.mark.save({
        _id: com.env.guid(),
        userid: userid,
        infoid: infoid,
        regdate: new Date()
    }, function (err, row) {
        if(!err && row) {
            callback(null);
        } else {
            callback(err || '关注失败');
        }
    });
}

/**
 * 取消关注
 * @param {*} id 
 * @param {*} callback 
 */
exports.removeMark = function (id, callback) {
    com.db.mark.remove({_id: id}, function (err, count) {
        if(!err && count > 0) {
            callback(null);
        } else {
            callback(err || '取消关注失败');
        }
    });
}

/**
 * 获取关注列表
 * @param {*} userid 
 * @param {*} pn 
 * @param {*} size 
 * @param {*} callback 
 */
exports.getMarkList = function (userid, pn, size, callback) {
    com.db.mark.find({userid: userid})
    .sort({regdate: -1})
    .skip((pn - 1) * size)
    .limit(size)
    .toArray(function (err, arr) {
        callback(err, arr);
    });
}