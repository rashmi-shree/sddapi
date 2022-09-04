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
router.post('/getCustomerFollowUpData', (req,res)=>{
    const reqdata = req.body.params;
    const searchData = reqdata.searchData;
    db.query(
        `select c.customer_reference_no, c.enquiry_date,
        c.customer_address, c.phone_number, c.comments,
        c.follow_up_call, c.customer_name, c.state, c.phone_number_alter_one, 
        c.phone_number_alter_two, c.from_dealer,
         d.product, d.quantity, c.final_status, d.product_hsn_code, 
         c.comments, c.follow_up_call
         from sdd.customer_follow_up_data c , sdd.delivery_report_table d 
        where c.customer_reference_no = d.customer_reference_no and
         (c.phone_number = ? or c.customer_name = ? or
            c.phone_number_alter_one = ? or c.phone_number_alter_two = ?
          )`,
        [
            searchData,
            searchData,
            searchData,
            searchData
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
router.post('/getCustomerFollowUpDataCustomer', (req,res)=>{
    const reqdata = req.body.params;
    const searchData = reqdata.searchvalue;
    db.query(
        `select c.customer_reference_no, c.enquiry_date,
        c.customer_address, c.phone_number, c.comments,
        c.follow_up_call, c.customer_name, c.state, c.phone_number_alter_one, 
        c.phone_number_alter_two, c.from_dealer,
         d.product, d.quantity, c.final_status, d.product_hsn_code, 
         c.comments, c.follow_up_call
         from sdd.customer_follow_up_data c , sdd.delivery_report_table d 
        where c.customer_reference_no = d.customer_reference_no and
         (c.phone_number = ? or c.customer_name = ? or
            c.phone_number_alter_one = ? or c.phone_number_alter_two = ?
          )`,
        [
            searchData,
            searchData,
            searchData,
            searchData
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

router.get('/displayCustomerFollowUpData',(req,res)=>{
    db.query(
        `select * from customer_follow_up_data c ,
        delivery_report_table d where 
        c.customer_reference_no = d.customer_reference_no`,
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
router.put('/updatefinalstatuscustomertable',(req,res)=>{
    const reqdata = req.body.params;
    const final_status = reqdata.final_status;
   const customer_reference_no = reqdata.customer_reference_no;
    db.query(
    `update customer_follow_up_data set 
    final_status = ? where customer_reference_no=?`,
    [
        final_status,
        customer_reference_no
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
router.put('/updatefinalstatuscustomertablepurchased',(req,res)=>{
    const reqdata = req.body.params;
   const customer_reference_no = reqdata.customer_reference_no;
    db.query(
    `update customer_follow_up_data set 
    final_status = ? where customer_reference_no=?`,
    [
        "Purchased",
        customer_reference_no
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
router.post('/addCustomerFollowUpData',(req,res)=>{
    const reqdata = req.body.params;
    var phonenoalterone = 'null';
    var phonenoaltertwo = 'null';
    const customerReferenceNo = reqdata.customerReferenceNo;
    const enquiryDate = reqdata.enquiryDate;
    const customerName = reqdata.customerName;
    const customerAddress = reqdata.customerAddress;
    const statename = reqdata.statename.label;
    const phoneno = reqdata.phoneno;
    phonenoalterone = reqdata.phonenoalterone;
    phonenoaltertwo = reqdata.phonenoaltertwo;
    const finalStatus = reqdata.finalStatus;
    if (phonenoalterone.length == 0){
        phonenoalterone = null;
    }
    if (phonenoaltertwo.length == 0){
        phonenoaltertwo = null;
    }
    db.query(
                `insert into customer_follow_up_data 
                (
                    customer_reference_no, 
                    enquiry_date, customer_name, customer_address, state, 
                    phone_number, phone_number_alter_one, 
                     phone_number_alter_two,final_status) values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    customerReferenceNo,
                    enquiryDate,
                    customerName,
                    customerAddress,
                    statename,
                    phoneno,
                    phonenoalterone,
                    phonenoaltertwo,
                    finalStatus
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
        }
)
router.post('/displayBookedCustomeerData',(req,res)=>{
    const reqdata = req.body.params;
    const final_status = reqdata.final_status;
    db.query(
        `select d.customer_reference_no, c.enquiry_date,
        d.customer_address, d.phone_number, d.phone_number_alter_one,
         d.phone_number_alter_two,
        d.product_hsn_code, d.product, d.quantity, c.comments, c.follow_up_call,
        c.final_status, c.customer_name, c.from_dealer
        from sdd.customer_follow_up_data c, sdd.delivery_report_table d
        where c.customer_reference_no = d.customer_reference_no and c.final_status = ?`,
        [final_status],
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
router.post('/insertdealerscustomertable',(req,res)=>{
    const reqdata = req.body.params;
    const customer_reference_no = reqdata.customer_reference_no;
    const customer_address = reqdata.dealersdata.enterprise_address;
    const phone_number = reqdata.dealersdata.proprietor_phone_number;
    const customer_name = reqdata.dealersdata.enterprise_name;
    const state = reqdata.state.label;
    const phone_number_alter_one = reqdata.changed_data.phone_number_alter_one;
    if (!phone_number_alter_one){
        phone_number_alter_one = null
    }
    const phone_number_alter_two = reqdata.changed_data.phone_number_alter_two;
    db.query(
        `insert into customer_follow_up_data 
        (   
            customer_reference_no,
            customer_address,
            phone_number,
            customer_name,
            state,
            phone_number_alter_one,
            phone_number_alter_two,
            final_status,
            from_dealer
        ) values (?,?,?,?,?,?,?,?,?)`,
        [
            customer_reference_no,
            customer_address,
            phone_number,
            customer_name,
            state,
            phone_number_alter_one,
            phone_number_alter_two,
            "Booked",
            "1"
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
router.post('/statusfiltercustomerdata', (req,res)=>{
    const reqdata = req.body.params;
    const status = reqdata.status;
    db.query(
        'select * from customer_follow_up_data where final_status = ?',
        [status],
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
router.post('/customizeddatefetchcustomerdata', (req,res)=>{
    const reqdata = req.body.params;
    const fromdate = reqdata.fromdate;
    const todate = reqdata.todate;
    db.query(
        `select * from customer_follow_up_data where 
        enquiry_date between ? and ?`,
        [
            fromdate,
            todate
        ],
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
router.put('/updateCustomerDetails',(req,res)=>{
    const reqdata = req.body.params.updaterowdata;
    const customer_name = reqdata.customer_name;
    const customer_address = reqdata.customer_address;
    const phone_number = reqdata.phone_number;
    const comments = reqdata.comments;
    const follow_up_call = reqdata.follow_up_call;
    const final_status = reqdata.final_status;
    const customer_reference_no = reqdata.customer_reference_no;
    if (follow_up_call == null){
        db.query(
            `update customer_follow_up_data set
            customer_name =?, customer_address =?,
            phone_number =?, comments = ?,
            final_status =?
            where customer_reference_no = ?`,
            [
                customer_name,
                customer_address,
                phone_number,
                comments,
                final_status,
                customer_reference_no
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
    }
    else {
        db.query(
            `update customer_follow_up_data set
            customer_name =?, customer_address =?,
            phone_number =?, comments = ?,
            follow_up_call = ?,
            final_status =?
            where customer_reference_no = ?`,
            [
                customer_name,
                customer_address,
                phone_number,
                comments,
                follow_up_call,
                final_status,
                customer_reference_no
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
    }
})
module.exports = router;