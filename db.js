const mysql = require('mysql');

const db = mysql.createConnection({
    // localhost
    user:'root',
    host:'127.0.0.1',
    port:'3306',
    password : 'iwbFR$$0102',
    database : 'sdddb1',

    // production code
    // host:'ec2-16-171-137-229.eu-north-1.compute.amazonaws.com',
    // database : 'invoiceGeneratorDB',
    // user:'rashmi',
    // port:'3306',
    // password : 'iwbFR$$0102',
});
  

module.exports = db;