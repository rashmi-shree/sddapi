const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const db = mysql.createConnection({
    user:'root',
    host:'127.0.0.1',
    port:'3306',
    password : 'iwbFR$$0102',
    database : 'sdddb1'
});
router.post('/login',(req,res)=>{
    const reqestData = req.body.params.logindata;
    const username = reqestData.username;
    const password = reqestData.password;
    db.query(
        `select username, password
         from users where username = ? and password = ?`,
        [username, password],
        (err, result)=>{
            if (err){
                console.log(err);
            }else{
                res.json(result);
            }
        }
    );
})

module.exports = router;