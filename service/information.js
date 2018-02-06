var async = require('async');

/**
 * 获取信息列表
 * @param {*} city 
 * @param {*} callback 
 */
exports.getInformationsList = function (query, page, size, callback) {
    com.db.information
    .find(query)
    .sort({regdate: -1})
    .skip((page - 1) * size)
    .limit(size)
    .toArray(function (err, result) {
        callback(err, result);
    });
}

/**
 * 获取信息详情
 * @param {*} id 
 * @param {*} callback 
 */
exports.getInformationsDetail = function (id, callback) {
    com.db.information.findOne({_id: id}, function (err, row) {
        if(!err && row) {
            callback(null, row);
        } else {
            callback(err || '该记录不存在', null);
        }
    });
}

/**
 * 保存信息内容
 * @param {*} information 
 * @param {*} callback 
 */
exports.saveInformation = function (information, callback) {
    com.db.information.save(information, function (err, row) {
        if(!err && row) {
            callback(null, row);
        } else {
            callback(err || '保存失败', null);
        }
    });
}

/**
 * 擦亮信息
 * @param {*} id 
 * @param {*} callback 
 */
exports.updateInformation = function (id, callback) {
    com.db.information.update({_id: id}, {$set: {regdate: new Date()}}, function (err, count) {
        if(!err && count > 0) {
            callback(null);
        } else {
            callback(err || '擦亮失败');
        }
    });
}

/**
 * 删除信息
 * @param {*} id 
 * @param {*} callback 
 */
exports.deleteInformation = function (id, callback) {
    com.db.information.update({_id: id}, {$set: {state: -1}}, function (err, count) {
        if(!err && count > 0) {
            callback(null);
        } else {
            callback(err || '删除失败');
        }
    });
}