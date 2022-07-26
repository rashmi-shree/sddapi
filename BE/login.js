const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const db = mysql.createConnection({
    user:'rashmi',
    host:'ec2-34-201-38-7.compute-1.amazonaws.com',
    port:'3306',
    password : 'iwbFR$$0102',
    database : 'sdd'
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