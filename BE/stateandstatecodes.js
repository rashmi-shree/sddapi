const express = require('express');
const router = express.Router();
const db = require("../db");

router.get('/getstateandstatecodes',(req,res)=>{
    db.query(
        'select * from state_and_state_codes',
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
router.post('/fetchstatecode', (req,res)=>{
    const reqdata = req.body.params;
    var statename = "";
    if (reqdata.statename != null){
        statename = reqdata.statename.label;
    }
    else{
        statename = "Karnataka"
    }
    db.query(
        `select statecode from state_and_state_codes
        where statename =? `,
        [statename],
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