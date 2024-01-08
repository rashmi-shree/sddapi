const express = require('express');
const router = express.Router();
'use strict';
const db = require("../db");
router.post('/login',(req,res)=>{
    pool.getConnection((err, connection) => {
        if (err) {
        // Handle connection errors
        console.error('Error connecting to database:', err);
        return;
        }
        // Use the connection for queries
        const username = req.body.username;
        // // holds the base64-encoded password
        const password = req.body.password;
        // // A Buffer object created from the base64-encoded username.
        let buffusername = new  Buffer.from(username, 'base64');
        // // The buffusername is then converted to a string in ASCII encoding, effectively decoding the base64-encoded username.
        let decodedusername = buffusername.toString('ascii');
        
        // // A Buffer object created from the base64-encoded password.
        let buffpassword = new Buffer.from(password, 'base64');
        // // The buffpassword is then converted to a string in ASCII encoding, effectively decoding the base64-encoded password.
        let decodedpassword = buffpassword.toString('ascii');
        // console.log("decodedpassword",decodedpassword);
        var error;
        try{
            if (username.length == 0){
                throw error="Username is missing";
            }
            else if(password.length == 0){
                throw error="Password is missing";
            }
            else {
                connection.query(`select username
                from users where username = ? and password = ?`,
                [decodedusername, decodedpassword],
                (err, result)=>{
                    console.log("hey",result)
                    if(result.length == 0){
                        // res.status(401).send({message:"Password Incorrect"});
                        res.send({message:"Password Incorrect"});
                    }
                    else{
                        let string = result[0].username;
                        let buffresult = Buffer.from(string, 'utf8');
                        let base64String = buffresult.toString("base64");
                        res.json(base64String);
                    }
                }
                )
            }
        }
        catch(e){
            res.send({message:error});
        }

    });
})
// router.post('/login',(req,res)=>{
//     // const reqestData = req.body.params.logindataalter;
//     // // holds the base64-encoded username
//     const username = req.body.username;
//     // // holds the base64-encoded password
//     const password = req.body.password;
//     // // A Buffer object created from the base64-encoded username.
//     let buffusername = new  Buffer.from(username, 'base64');
//     // // The buffusername is then converted to a string in ASCII encoding, effectively decoding the base64-encoded username.
//     let decodedusername = buffusername.toString('ascii');
    
//     // // A Buffer object created from the base64-encoded password.
//     let buffpassword = new Buffer.from(password, 'base64');
//     // // The buffpassword is then converted to a string in ASCII encoding, effectively decoding the base64-encoded password.
//     let decodedpassword = buffpassword.toString('ascii');
//     // console.log("decodedpassword",decodedpassword);
//     var error;
//     try{
//         if (username.length == 0){
//             throw error="Username is missing";
//         }
//         else if(password.length == 0){
//             throw error="Password is missing";
//         }
//         else {
//             db.query(`select username
//             from users where username = ? and password = ?`,
//             [decodedusername, decodedpassword],
//             (err, result)=>{
//                 console.log("hey",result)
//                 if(result.length == 0){
//                     // res.status(401).send({message:"Password Incorrect"});
//                     res.send({message:"Password Incorrect"});
//                 }
//                 else{
//                     let string = result[0].username;
//                     let buffresult = Buffer.from(string, 'utf8');
//                     let base64String = buffresult.toString("base64");
//                     res.json(base64String);
//                 }
//             }
//             )
//         }
//     }
//     catch(e){
//         res.send({message:error});
//     }
// })

module.exports = router;