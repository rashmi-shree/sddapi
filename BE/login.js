const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const db = mysql.createConnection({
    user:'rashmi',
    host:'ec2-3-91-186-253.compute-1.amazonaws.com',
    port:'3306',
    password : 'iwbFR$$0102',
    database : 'sdd'
});
router.post('/login',(req,res)=>{
    const reqestData = req.body.params.logindata;
    const username = reqestData.username;
    const password = reqestData.password;
    db.query("select username from users where username = username",(err,res)=>{
        if (res.length>0){
            db.query(
                `select username, password
                 from users where username = ? and password = ?`,
                [username, password],
                (err, result)=>{
                    if (err){
                        // console.log(err);
                        res.json({msg:"password incorrect", code:401})
                    }else{
                        res.json(result);
                    }
                }
            );
        }
        else{
            res.json({msg:"user is not present", code:404});
        }
    })
 
})

module.exports = router;