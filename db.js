const mysql = require('mysql');

const db = mysql.createConnection({
    user:'rashmi',
    host:'ec2-16-171-137-229.eu-north-1.compute.amazonaws.com',
    port:'3306',
    password : 'iwbFR$$0102',
    database : 'invoiceGeneratorDB'
});

module.exports = db;