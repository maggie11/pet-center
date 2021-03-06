/**
 * 宠物中心启动文件
 */
var env = process.argv[2];
require('./env/env-' + env);

var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

var path = require('path');

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
    secret: 'AH^%^2DKJS(*P',
    cookie: {maxAge: 60 * 1000 * 30}
}));

//加载数据集合
require('./global/db');

//加载视图
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//加载静态
app.use(express.static('static'));

//加载控制器
require('./lib/boot')(app, { verbose: !module.parent });

//异常捕获
process.on('uncaughtException', function (err) {
    console.log(err);
});

//监听
app.listen(3000, function () {
    console.log('Express started on port 3000');
});