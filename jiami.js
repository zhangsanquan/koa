const md5 = require('md5');

module.exports = function (msg) {
    return md5(msg)
};