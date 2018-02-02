(function () {
    this.com = this.com || {};
    com.db = com.db || {};
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
        user: 'user', //用户信息集合
        message: 'message', //短信信息集合
        information: 'information', //发布信息集合
        city: 'city', //城市信息集合
        area: 'area', //区县信息集合
        part: 'part', //区域信息集合
        type: 'type', //种类信息集合
        tag: 'tag' //标签信息集合
    };

    $.extend(com.db, _extend_db);
})();