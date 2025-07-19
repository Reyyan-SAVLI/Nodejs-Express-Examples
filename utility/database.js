const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'node-app',
    password: '35848011314r'
});

module.exports = connection.promise();