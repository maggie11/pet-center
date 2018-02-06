(function () {
    this.com = this.com || {};
    com.db = com.db || {};
    require('./util');
    var Mongolian = require('mongolian');
    var dbs = [];
    var conn_counts = com.env.mongo_conn_counts || 5;

    //选择每个服务的连接数
    if(com.env.serviceName && com.env['mongo_conn_counts_' + com.env.serviceName]) {
        conn_counts = com.env['mongo_conn_counts_' + com.env.serviceName];
    }

    for(var i = 0; i < conn_counts; i ++) {
        dbs.push(new Mongolian(com.env.mongo_conn, {log: true}));
    }

    var _extend_db = {
        counters: 'counters',
        user: 'user', //用户信息集合
        message: 'message', //短信信息集合
        information: 'information', //发布信息集合
        comment: 'comment', //评论集合
        //city: 'city', //城市信息集合
        //area: 'area', //区县信息集合
        //part: 'part', //区域信息集合
        //type: 'type', //种类信息集合
        //tag: 'tag', //标签信息集合
    };

    $.extend(com.db, _extend_db);

    //待理解
    var _getModelName = function (name) {
        return name.replace(/(^|_)(\w)/g, function (a, b, c, d) {
            return c.toUpperCase();
        })
    }

    var modelName, collName, methods, methods2, coll;
    for (var key in _extend_db) {
        collName = com.db[key].toString();
        modelName = _getModelName(collName);
        //com.db[key] 扩展 mongo collection
        com.db[key] = {};//$.extend({}, db0.collection(collName));

        methods = ['save', 'insert'];
        for (var i = 0; i < methods.length; i++) {
            (function (i, key, model, collName) {
                com.db[key][methods[i]] = function (query, cb) {
                    var _query = query;
                    var _db = dbs[parseInt(Math.random() * conn_counts)];
                    var _coll = _db.collection(collName);
                    return _coll[methods[i]].call(_coll, _query, cb);
                };
            })(i, key, modelName, collName);
        }
        methods2 = ['count', 'find', 'findOne', 'update', 'remove', 'findAndModify', 'distinct', 'runCommand'];
        for (var i = 0; i < methods2.length; i++) {
            (function (i, key, model, collName) {
                com.db[key][methods2[i]] = function () {
                    var _db = dbs[parseInt(Math.random() * conn_counts)];
                    var _coll = _db.collection(collName);
                    return _coll[methods2[i]].apply(_coll, arguments);
                    //
                }
            })(i, key, modelName, collName);

        }
    }
})();