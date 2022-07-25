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
router.get('/displayDealersDetailsDatawithstatusactive',(req,res)=>{
    db.query(
        `select * from dealers_details_table where gstin_status = 'active' `,
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
router.post('/getdealersfromgst',(req, res)=>{
    const reqdata = req.body.params;
    const gstinNumber = reqdata.gstin_Number;
    db.query(
        `select enterprise_address as 'buyer', gstin_number as 'GST', 
        proprietor_phone_number as 'contactNo' 
        from dealers_details_table where gstin_number = ?`,
        [gstinNumber],
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
router.post('/getDealersDetailsData', (req,res)=>{
    const reqdata = req.body.params;
    const searchData = reqdata.searchData;
    db.query(
        `select * from dealers_details_table 
        where proprietor_name = ? or proprietor_phone_number = ? `,
        [
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
router.post('/insertdealersdataintodeliverytable',(req,res)=>{
    const reqdata = req.body.params;
    const customer_reference_no = reqdata.customer_reference_no;
    const invoice_no = reqdata.invoice_no;
    const customer_address = reqdata.dealersdata.enterprise_address;
    const gstin_number = reqdata.dealersdata.gstin_number;
    const phone_number = reqdata.dealersdata.proprietor_phone_number;
    const product_hsn_code = reqdata.productsdata.map((data)=>{
        return data.product_hsn_code;
    })
    const product = reqdata.productsdata.map((data)=>{
        return data.productname;
    })
    const quantity = reqdata.productsdata.map((data)=>{
        return data.quantity;
    })
    const customer_name = reqdata.dealersdata.enterprise_name;
    const state = reqdata.state;
    const state_code = reqdata.state_code;
    const po_number = reqdata.changed_data.po_number;
    const pan_number = reqdata.changed_data.pan_number;
    const vehicle_number = reqdata.changed_data.vehicle_number;
    const place_of_supply = reqdata.changed_data.place_of_supply;
    const phone_number_alter_one = reqdata.changed_data.phone_number_alter_one;
    const phone_number_alter_two = reqdata.changed_data.phone_number_alter_two;
    var date1 = new Date();
    var date2 = date1.toISOString();
    date2 = date2.substr(0, 10);
    let booked_date = date2;
    let delivery_status = "Delivered";
    const size = product.length;
    let temp = [];
    for (var i =0 ; i<size; i++){
        temp.push([
            customer_reference_no,
            invoice_no,
            customer_address,
            gstin_number,
            phone_number,
            product_hsn_code[i],
            product[i],
            quantity[i],
            customer_name,
            state,
            state_code,
            po_number,
            pan_number,
            vehicle_number,
            place_of_supply,
            phone_number_alter_one,
            phone_number_alter_two,
            booked_date,
            delivery_status
        ])
    }
    db.query(
        `insert into delivery_report_table 
        (   
            customer_reference_no,
            invoice_no,
            customer_address,
            gst,
            phone_number,
            product_hsn_code,
            product,
            quantity,
            customer_name,
            state,
            state_code,
            po_number,
            pan_number,
            vehicle_number,
            place_of_supply,
            phone_number_alter_one,
            phone_number_alter_two,
            booked_date,
            delivery_status
        ) values ?`,
        [temp],
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
router.get('/displayDealersDetailsData',(req,res)=>{
    db.query(
        `select * from dealers_details_table `,
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
router.post('/gstinstatusfilterdealersdata', (req,res)=>{
    const reqdata = req.body.params;
    const status = reqdata.status;
    const proprietor_name = reqdata.proprietor_name;
    const proprietor_phone_number = reqdata.proprietor_phone_number;
    db.query(
        `select * from dealers_details_table where gstin_status = ?
        or proprietor_name = ? or proprietor_phone_number = ?`,
        [
            status,
            proprietor_name,
            proprietor_phone_number
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
router.delete('/deletefromdealersdetailstable', (req,res)=>{
    const id = req.body.id;
    db.query(
        'DELETE FROM dealers_details_table WHERE gstin_number = ?',
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
router.put('/updateDealersDetails',(req,res)=>{
    const reqdata = req.body.params.updaterowdata;
    const enterprise_address = reqdata.enterprise_address;
    const enterprise_name = reqdata.enterprise_name;
    const gstin_number = reqdata.gstin_number;
    const gstin_status = reqdata.gstin_status;
    const proprietor_name = reqdata.proprietor_name;
    const proprietor_phone_number = reqdata.proprietor_phone_number;
    db.query(
    `update dealers_details_table set 
    gstin_number = ?, enterprise_name= ?,
    enterprise_address = ?, proprietor_name= ?, proprietor_phone_number = ?,
    gstin_status = ? where gstin_number=?`,
    [
        gstin_number,
        enterprise_name,
        enterprise_address,
        proprietor_name,
        proprietor_phone_number,
        gstin_status,
        gstin_number
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
router.post('/addDealersData',(req,res)=>{
    const reqdata = req.body.params.data;
    const gstin_number = reqdata.gstin_number;
    const enterprise_name = reqdata.enterprise_name;
    const enterprise_address = reqdata.enterprise_address;
    const proprietor_name = reqdata.proprietor_name;
    const proprietor_phone_number = reqdata.proprietor_phone_number;
    const gstin_status = reqdata.gstin_status;
    db.query(
        `insert into dealers_details_table 
        (   
            gstin_number,
            enterprise_name,
            enterprise_address,
            proprietor_name,
            proprietor_phone_number,
            gstin_status
        ) values (?, ?, ?, ?, ?, ?)`,
        [
            gstin_number,
            enterprise_name,
            enterprise_address,
            proprietor_name,
            proprietor_phone_number,
            gstin_status
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
module.exports = router;