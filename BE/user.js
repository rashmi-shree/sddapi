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
router.put('/edituserdata',(req,res)=>{
    const reqdata = req.body.params;
    console.log("reqdata",reqdata);
    const username = reqdata.data.username;
    const password = reqdata.data.password;
    const id = reqdata.id;
    db.query(
    `update 
        users 
    set 
        username = ?, 
        password = ? 
    where id=?`,
    [
        username,
        password,
        id
    ],
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
router.delete('/deleteuserdata', (req,res)=>{
    const reqdata = req.body;
    console.log("reqdata",reqdata);
    const id = reqdata.id;
    db.query(
        'DELETE FROM users WHERE id = ?',
        [id],
        (err, result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.send(result);
            }
        }
    )
})
router.post('/insertuserdata',(req,res)=>{
    const reqdata = req.body.params;
    const username = reqdata.addFormData.username;
    const password = reqdata.addFormData.password;
    console.log("hello", reqdata);
    db.query(
        `insert into users 
        (   
            username,
            password
        ) values (?, ?)`,
        [
            username,
            password
        ],
     (err, result)=>
     {
            if(err){
                res.send(err);
            }
            else{
                res.json(result);
            }
        }
    )
})
module.exports = router;