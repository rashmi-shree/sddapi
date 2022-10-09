const express = require('express');
const router = express.Router();
const mysql = require('mysql');
'use strict';

const db = mysql.createConnection({
    user:'rashmi',
    host:'ec2-3-91-186-253.compute-1.amazonaws.com',
    port:'3306',
    password : 'iwbFR$$0102',
    database : 'sdd'
});
router.post('/login',(req,res)=>{
    const reqestData = req.body.params.logindataalter;
    const username = reqestData.username;
    const password = reqestData.password;
    let buffusername = new  Buffer.from(username, 'base64');
    let decodedusername = buffusername.toString('ascii');
    
    let buffpassword = new Buffer.from(password, 'base64');
    let decodedpassword = buffpassword.toString('ascii');
    var error;
    try{
        if (username.length == 0){
            throw error="Username is missing";
        }
        else if(password.length == 0){
            throw error="Password is missing";
        }
        else {
            db.query(`select username
            from users where username = ? and password = ?`,
            [decodedusername, decodedpassword],
            (err, result)=>{
                if(result.length == 0){
                    res.send({message:"Password Incorrect"});
                }
                else{
                    res.json(result);
                }
            }
            )
        }
    }
    catch(e){
        res.send({message:error});
    }
})

module.exports = router;