/**
 * 定义正式环境参数配置，全局变量:env
 */
(function () {
    this.com = this.com || {};
    com.env = {
        mongo_conn: 'mongodb://192.168.1.208:27019/pet_pd',
        hostname: 'http://localhost:3000'
    }
})();