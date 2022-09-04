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
router.post('/displayProductDetailsDatabasedonproducthsn',(req,res)=>{
    const reqdata = req.body.params;
    const product_hsn_code = reqdata.product_hsn_code;
    db.query(
        'select * from product_details_table where product_hsn_code = ?',
        [product_hsn_code],
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
router.post('/fetchproducthsnfromproductdetails',(req,res)=>{
    const reqdata = req.body.params;
    const product_name = reqdata.product_name;
    var a = product_name.split(",");
    db.query(
        `select product_hsn_code from product_details_table 
        where product_name in (?)`,
        [a],
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
router.get('/displayProductDetailsData',(req,res)=>{
    db.query(
        `select * from product_details_table`,
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
router.post('/displayProductDetailsDataforcombobox',(req,res)=>{
    const selectedowner = req.body.params.selectedowner;
    console.log(selectedowner);
    db.query(
        `select * from product_details_table where stock > 0
        and owner_company = ?`,
        [selectedowner],
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

router.post('/fetchallproductdetails',(req,res)=>{
    const reqdata = req.body.params;
    const productsdata = reqdata.productsdata;
    const productnames = productsdata.map((data)=>{
        return data.productname;
    })
    db.query(
        `select * from product_details_table 
        where product_name in (?)`,
        [productnames],
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
router.post('/productstatusfilter', (req,res)=>{
    const reqdata = req.body.params;
    const status = reqdata.status;
    db.query(
        'select * from product_details_table where product_status = ?',
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
router.delete('/deletefromproductdetailstable', (req,res)=>{
    const id = req.body.id;
    db.query(
        'DELETE FROM product_details_table WHERE product_hsn_code = ?',
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
router.post('/getProductDetailsData', (req,res)=>{
    const reqdata = req.body.params;
    const product_name = reqdata.product_name;
    const product_hsn = reqdata.product_hsn;
    db.query(
        `select * from product_details_table 
        where product_name = ? or product_hsn_code = ? `,
        [product_name, product_hsn],
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
router.post('/addProductData',(req,res)=>{
    const reqdata = req.body.params;
    const product_name = reqdata.data.product_name;
    const owner_company = reqdata.selectedowner;
    const product_hsn_code = reqdata.data.product_hsn_code;
    const product_description = reqdata.data.product_description;
    const unit_of_measure = reqdata.data.unit_of_measure;
    const rate_per_unit = reqdata.data.rate_per_unit;
    const gst_rate = reqdata.data.gst_rate;
    const product_status = reqdata.data.product_status;
    const stock = reqdata.data.stock;
    const discount = reqdata.data.discount;
    db.query(
        `insert into product_details_table 
        (   
            product_hsn_code,
            product_name,
            owner_company,
            product_description,
            unit_of_measure,
            rate_per_unit,
            gst_rate,
            product_status,
            stock,
            discount
        ) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            product_hsn_code,
            product_name,
            owner_company,
            product_description,
            unit_of_measure,
            rate_per_unit,
            gst_rate,
            product_status,
            stock,
            discount
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
router.put('/updateProductsDetails',(req,res)=>{
    const reqdata = req.body.params;
    const product_hsn_code = reqdata.data.product_hsn_code;
    const product_name = reqdata.data.product_name;
    const owner_company = reqdata.selectedowner;
    const product_description = reqdata.data.product_description;
    const unit_of_measure = reqdata.data.unit_of_measure;
    const rate_per_unit = reqdata.data.rate_per_unit;
    const gst_rate = reqdata.data.gst_rate;
    const product_status = reqdata.data.product_status;
    const discount = reqdata.data.discount;
    const stock = reqdata.data.stock;
    db.query(
    `update product_details_table set 
    product_name = ?, owner_company = ? ,product_description= ?,
    unit_of_measure = ?, rate_per_unit= ?, gst_rate = ?,
    product_status = ?,stock = ?, discount = ? where product_hsn_code=?`,
    [
        product_name,
        owner_company,
        product_description,
        unit_of_measure,
        rate_per_unit,
        gst_rate,
        product_status,
        stock,
        discount,
        product_hsn_code
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
router.put('/updateProductsDetailsProductDataDecrement',(req,res)=>{
    const reqdata = req.body.rowdatadisplayed;
    console.log("hallelua", reqdata);
    var query1 = `UPDATE sdd.product_details_table SET stock = ( CASE `;
    var query3 = "";
    var query6 = ` ELSE  (stock) END )`;
    for(var i =0; i<reqdata.length; i++){
        query3 += `WHEN (product_name = "${reqdata[i].product}") THEN (stock - ${reqdata[i].quantity}) `;
    }
    finalquery = query1  + query3 + query6;
    console.log("final query",finalquery);
    db.query(finalquery,
        (err, result)=>{
            if(err){
                res.send(err);
                console.log(err);
            }
            else{
                res.json(result);
            }
        }
    )
})
router.put('/updateProductsDetailsProductDataIncrement',(req,res)=>{
    const reqdata = req.body.params.updaterowdata;
    const product = reqdata.product;
    const quantity = reqdata.quantity;
    const delivery_status = reqdata.delivery_status;
    if (delivery_status == "Cancelled"){
       var q1 = `UPDATE sdd.product_details_table p SET p.stock = ( CASE `;
       var q2 = `when product_name = "${product}" then stock + ${quantity} `;
       var q3 = ` end )`;
       var q4 = `where product_name = "${product}"`;
       var finalquery = q1 + q2 + q3 + q4;
       db.query(finalquery,
            (err, result)=>{
                if(err){
                    res.send(err);
                    console.log(err);
                }
                else{
                    res.json(result);
                }
            }
        )
    }
    // var query1 = `UPDATE sdd.product_details_table SET stock = ( CASE `;
    // var query3 = "";
    // var query6 = ` ELSE  (stock) END )`;
    // query3 = `WHEN (product_name = "${reqdata.product}") THEN (stock + ${reqdata.quantity}) `;
    // // for(var i =0; i<reqdata.length; i++){
    // //     query3 += `WHEN (product_name = "${reqdata.product}") THEN (stock + ${reqdata[i].quantity}) `;
    // // }
    // finalquery = query1  + query3 + query6;
    
})
router.post('/getquantitybasedonproductname',(req,res)=>{
    const reqdata = req.body.params;
    const product_name = reqdata.productname;
    db.query(
        `select product_name, stock from 
        product_details_table where product_name = ?`,
        [product_name],
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