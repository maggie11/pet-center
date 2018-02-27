var information_biz = require('../service/information');

exports.views = {
    '/': function (req, res, next) {
        information_biz.getInformationsList({}, 1, 10, function (err, list) {
            console.log(list);
            res.render('index', {list: list});
        });
    }
}