const url = require('./url.js');
const email = require('./email.js');

module.exports = exports = function (mongo){
    var mongo = mongo || require('mongoose');

    mongo = email(mongo);
    return url(mongo);
};