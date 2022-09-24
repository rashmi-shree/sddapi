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
router.get('/getusers',(req,res)=>{
    db.query(
        `select * from users`,
        (err, result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.json(result);
            }
        }
    )
})
module.exports = router;