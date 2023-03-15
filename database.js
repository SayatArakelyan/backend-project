const mysql = require('mysql');
const configs = require('./configs/configs');

module.exports = mysql.createConnection({
    user: configs.user,
    host: configs.host,
    password: configs.password,
    database: configs.database
});

