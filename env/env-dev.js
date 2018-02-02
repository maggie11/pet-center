/**
 * 定义测试环境参数配置，全局变量:env
 */
(function () {
    this.com = this.com || {};
    com.env = {
        mongo_conn_counts: 1,
        mongo_conn: 'mongodb://localhost:27017/pet',
        hostname: 'http://localhost:3000'
    }
})();