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
router.put('/updaterateofdeliverytableonbook',(req,res)=>{
    const reqdata = req.body.params.data;
    console.log("reqdata", reqdata);
    let product_hsn_code = reqdata.map((data)=>{
        return data.product_hsn_code;
    })
    let customer_reference_no = reqdata.map((data)=>{
        return data.customer_reference_no.toString();
    });
    db.query(
        `update delivery_report_table d
        join product_details_table p
        on d.product_hsn_code = p.product_hsn_code
        set d.rate = d.quantity * p.rate_per_unit
        where d.product_hsn_code in (?)
         and d.customer_reference_no in (?)`,
    [
        product_hsn_code,
        customer_reference_no,
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

router.put ('/updatekarnatakagstratesdeliverytableonbook', (req, res)=>{
    const reqdata = req.body.params;
    let product_hsn_code = reqdata.data.map((data)=>{
        return data.product_hsn_code;
    })
    let customer_reference_no = reqdata.data.map((data)=>{
        return data.customer_reference_no.toString();
    });
    db.query(
        `update delivery_report_table d
        join product_details_table p
        on d.product_hsn_code = p.product_hsn_code
        set d.discount = d.rate * (p.discount/100), 
        d.cgst = d.rate * ((p.gst_rate/2)/100), 
        d.sgst = d.rate * ((p.gst_rate/2)/100), d.igst = 0
        where d.customer_reference_no in (?) and d.product_hsn_code in (?);
        `,
        [
            customer_reference_no,
            product_hsn_code
        ],
        (err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.json(result);
            }
        }
    )
})
router.put('/updatefinalamountdeliverytableonbook',(req,res)=>{
    const reqdata = req.body.params.data;
    let hsn_codes = reqdata.map((data)=>{
        return data.product_hsn_code;
    });
    let customer_reference_no = reqdata.map((data)=>{
        return data.customer_reference_no.toString();
    });
    db.query(
        `
        update sdd.delivery_report_table d
        join sdd.product_details_table p
        on d.product_hsn_code = p.product_hsn_code
        set d.final_amount = (d.rate + d.cgst + d.sgst + d.igst) - d.discount
        where d.product_hsn_code in (?)
        and d.customer_reference_no in (?)
        `,

    [
        hsn_codes,
        customer_reference_no,
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
router.put('/updatebalanceamountdeliverytableonbook',(req,res)=>{
    const reqdata = req.body.params.data;
    let hsn_codes = reqdata.map((data)=>{
        return data.product_hsn_code;
    });
    let customer_reference_no = reqdata.map((data)=>{
        return data.customer_reference_no.toString();
    });
    db.query(
        `
        update sdd.delivery_report_table d
        join sdd.product_details_table p
        on d.product_hsn_code = p.product_hsn_code
        set d.balance_amount = d.final_amount
        where d.product_hsn_code in (?)
        and d.customer_reference_no in (?)
        `,

    [
        hsn_codes,
        customer_reference_no,
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
router.put('/updatepaymentstatusdeliverytableonbook',(req,res)=>{
    const reqdata = req.body.params.data;
    let hsn_codes = reqdata.map((data)=>{
        return data.product_hsn_code;
    });
    let customer_reference_no = reqdata.map((data)=>{
        return data.customer_reference_no.toString();
    });
    db.query(
        `
        update sdd.delivery_report_table d
        join sdd.product_details_table p
        on d.product_hsn_code = p.product_hsn_code
        set d.payment_status = "Pending"
        where d.product_hsn_code in (?)
        and d.customer_reference_no in (?)
        `,

    [
        hsn_codes,
        customer_reference_no,
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
router.put ('/updateotherstatesgstratesdeliverytableonbook', (req, res)=>{
    const reqdata = req.body.params.data;
    let product_hsn_code = reqdata.map((data)=>{
        return data.product_hsn_code;
    });
    let customer_reference_no = reqdata.map((data)=>{
        return data.customer_reference_no.toString();
    });
    db.query(
        `update delivery_report_table d
        join product_details_table p
        on d.product_hsn_code = p.product_hsn_code
        set d.discount = d.rate * (p.discount/100), 
        d.cgst = 0, 
        d.sgst = 0, d.igst = d.rate * (p.gst_rate/100)
        where d.customer_reference_no in (?) and d.product_hsn_code in (?);
        `,
        [
            customer_reference_no,
            product_hsn_code
        ],
        (err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.json(result);
            }
        }
    )
})
router.put('/tableonbook',(req,res)=>{
    const reqdata = req.body.params;
    let hsn_codes = reqdata.temprowdataonbooking.map((data)=>{
        return data.product_hsn_code;
    });
    let customer_reference_no = reqdata.temprowdataonbooking.map((data)=>{
        return data.customer_reference_no.toString();
    });
    db.query(
        `
        update sdd.delivery_report_table d
        join sdd.product_details_table p
        on d.product_hsn_code = p.product_hsn_code
        set d.final_amount = (d.rate + d.cgst + d.sgst + d.igst) - d.discount
        where d.product_hsn_code in (?)
        and d.customer_reference_no in (?)
        `,

    [
        hsn_codes,
        customer_reference_no,
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
router.put ('/updatekarnatakagstrates', (req, res)=>{
    const reqdata = req.body.params;
    let customer_reference_no = reqdata.customer_reference_no;
    let product_hsn_code = reqdata.product_hsn_code;
    db.query(
        `update delivery_report_table d
        join product_details_table p
        on d.product_hsn_code = p.product_hsn_code
        set d.discount = d.rate * (p.discount/100), 
        d.cgst = d.rate * ((p.gst_rate/2)/100), 
        d.sgst = d.rate * ((p.gst_rate/2)/100), d.igst = 0
        where d.customer_reference_no = ? and d.product_hsn_code = ?;
        `,
        [
            customer_reference_no,
            product_hsn_code
        ],
        (err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.json(result);
            }
        }
    )
})
router.put('/updatefinalamountdelivery',(req,res)=>{
    const reqdata = req.body.params;
    let product_hsn_code = reqdata.rowdatadisplayed.map((data)=>{
        return data.product_hsn_code;
    })
    let customer_reference_no = reqdata.rowdatadisplayed.map((data)=>{
        return data.customer_reference_no.toString();
    });
    db.query(
        `update sdd.delivery_report_table d
        join sdd.product_details_table p
        on d.product_hsn_code = p.product_hsn_code
        set d.final_amount = (d.rate + d.cgst + d.sgst + d.igst) - d.discount
        where d.product_hsn_code in (?)
        and d.customer_reference_no in (?)
        `,
    [
        product_hsn_code,
        customer_reference_no,
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
router.post('/getCustomerFollowUpDataBooked', (req,res)=>{
    const reqdata = req.body.params;
    const phoneno = reqdata.phoneno;
    const customer_name = reqdata.customer_name;
    const phone_number_alter_one = reqdata.phone_number_alter_one;
    const phone_number_alter_two = reqdata.phone_number_alter_two;
    db.query(
        `select c.customer_reference_no, c.enquiry_date,
        c.customer_address, c.phone_number, c.comments,
        c.follow_up_call, c.customer_name, c.state, c.phone_number_alter_one, 
        c.phone_number_alter_two, c.from_dealer,
         d.product, d.quantity, c.final_status, d.product_hsn_code, 
         c.comments, c.follow_up_call
         from sdd.customer_follow_up_data c , sdd.delivery_report_table d 
        where c.customer_reference_no = d.customer_reference_no and c.final_status = "Booked"
        and 
         (c.phone_number = ? or c.customer_name = ? or
            c.phone_number_alter_one = ? or c.phone_number_alter_two = ?
          )`,
        [
            phoneno,
            customer_name,
            phone_number_alter_one,
            phone_number_alter_two
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
router.post('/downloadinvoicedisplayedastable',(req,res)=>{
    const reqdata = req.body.params;
    const invoice_no = reqdata.invoice_no;
    const customer_reference_no = reqdata.customer_reference_no;
    db.query(
        `select d.invoice_no as 'InvoiceNo', d.delivery_date as 'DateOfSupply',
        d.gst as 'GSTINUIN', d.phone_number as 'ContactNo', p.product_description as 'DescriptionOfProduct',
        d.product_hsn_code as 'HSNCode', d.quantity as 'Qty', d.rate as 'rate', d.final_amount as 'amount',
        d.cgst as 'CGST', d.sgst as 'SGST', d.igst as 'IGST'
        from sdd.customer_follow_up_data c, 
        sdd.delivery_report_table d, sdd.product_details_table p
        where c.customer_reference_no = d.customer_reference_no 
        and d.product_hsn_code = p.product_hsn_code and 
        (d.invoice_no  = ? or c.customer_reference_no =?)`,
        [invoice_no, customer_reference_no],
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
router.post('/calculaterateofdeliveryofdealers',(req,res)=>{
    const reqdata = req.body.params;
    let hsn_codes = reqdata.rowdatadisplayed.map((data)=>{
        return data.product_hsn_code;
    });
    let extended_discount = reqdata.rowdatadisplayed.map((data)=>{
        return data.extended_discount;
    });
    let customer_reference_no = reqdata.rowdatadisplayed.map((data)=>{
        return data.customer_reference_no.toString();
    });
    let finalquery = "";
    let q3 = ``;
    let q6 = "";
    for(var i =0; i<=extended_discount.length-1; i++){
            let q1 = `UPDATE delivery_report_table d join product_details_table p on 
            d.product_hsn_code = p.product_hsn_code SET `;
            let q2 = `d.rate = (case`;
            let q5 = " end )"
            let q4 = ` WHERE d.product_hsn_code in (${hsn_codes}) and  d.customer_reference_no in ('${customer_reference_no[0]}')`;
            if(extended_discount[i] >0 ){
                q3 += ` when d.product_hsn_code = ${hsn_codes[i]} then d.quantity * d.extended_discount`;
            }
            else {
                q6 += ` when d.product_hsn_code = ${hsn_codes[i]} then d.quantity * p.rate_per_unit `;
            }
            let midquerystring1 = q2 + q3 +q6 + q5;
            finalquery = q1 + midquerystring1 + q4;
    }
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
router.put('/updatekarnatakagstratesfromdealers', (req, res)=>{
    const reqdata = req.body.params;
    let hsn_codes = reqdata.rowdatadisplayed.map((data)=>{
        return data.product_hsn_code;
    });
    let extended_discount = reqdata.rowdatadisplayed.map((data)=>{
        return data.extended_discount;
    });
    let customer_reference_no = reqdata.rowdatadisplayed.map((data)=>{
        return data.customer_reference_no.toString();
    });
    console.log("extended_discount", extended_discount);
    let finalquery = "";
    let q3 = ``;
    let q6 = "";
    let q9 = "";
    let q10 = "";
    for(var i =0; i<=extended_discount.length-1; i++){
            let q1 = `UPDATE delivery_report_table d join product_details_table p on 
            d.product_hsn_code = p.product_hsn_code SET `;
            let q2 = `d.discount = (case`;
            let q7 = `d.cgst = (case`;
            let q8 = `d.sgst = (case`;
            let q5 = " end )"
            let q4 = ` WHERE d.product_hsn_code in (${hsn_codes}) and  d.customer_reference_no in ('${customer_reference_no[0]}')`;
            if(extended_discount[i] >0 ){
                q3 += ` when d.product_hsn_code = ${hsn_codes[i]} then d.extended_discount * (p.discount/100)`;
                q9 += ` when d.product_hsn_code = ${hsn_codes[i]} then d.extended_discount * ((p.gst_rate/2)/100)`;
                q10 += ` when d.product_hsn_code = ${hsn_codes[i]} then d.extended_discount * ((p.gst_rate/2)/100)`;
            }
            else {
                q3 += ` when d.product_hsn_code = ${hsn_codes[i]} then d.rate * (p.discount/100)`;
                q9 += ` when d.product_hsn_code = ${hsn_codes[i]} then d.rate * ((p.gst_rate/2)/100)`;
                q10 += ` when d.product_hsn_code = ${hsn_codes[i]} then d.rate * ((p.gst_rate/2)/100)`;
            }
            finalquery = q1 + q2 + q3 + q5 + q7 + q9 + q5 + q8 + q10 + q5 + "," + q4;
    }
    console.log("finalquery", finalquery);

    // db.query(finalquery,
    //     (err, result)=>{
    //         if(err){
    //             res.send(err);
    //             console.log(err);
    //         }
    //         else{
    //             res.json(result);
    //         }
    //     }
    // )
    // db.query(
    //     `update delivery_report_table d
    //     join product_details_table p
    //     on d.product_hsn_code = p.product_hsn_code
    //     set d.discount = d.rate * (p.discount/100), 
    //     d.cgst = d.rate * ((p.gst_rate/2)/100), 
    //     d.sgst = d.rate * ((p.gst_rate/2)/100), d.igst = 0
    //     where d.customer_reference_no = ?;
    //     `,
    //     [
    //         customer_reference_no
    //     ],
    //     (err,result)=>{
    //         if(err){
    //             console.log(err);
    //         }
    //         else{
    //             res.json(result);
    //         }
    //     }
    // )
})
router.put('/updatefinalamountdeliveryfromdealers',(req,res)=>{
    const reqdata = req.body.params;
    let customer_reference_no = reqdata.customer_reference_no;
    db.query( `update sdd.delivery_report_table d
        join sdd.product_details_table p
        on d.product_hsn_code = p.product_hsn_code
        set d.final_amount = (d.rate + d.cgst + d.sgst + d.igst) - d.discount
        where d.customer_reference_no in (?)
        `,
    [
        customer_reference_no,
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
router.put('/updatebalanceamountdeliveryfromdealers',(req,res)=>{
    const reqdata = req.body.params;
    let booking_advance_amount = reqdata.rowdatadisplayed.map((data)=>{
        return data.booking_advance_amount;
    });
    let customer_reference_no = reqdata.rowdatadisplayed.map((data)=>{
        return data.customer_reference_no.toString();
    });
    let final_amount = reqdata.rowdatadisplayed.map((data)=>{
        return data.final_amount.toString();
    });
    let hsn_codes = reqdata.rowdatadisplayed.map((data)=>{
        return data.product_hsn_code;
    });
    let q1 = `UPDATE sdd.delivery_report_table d join sdd.product_details_table p
    on d.product_hsn_code = p.product_hsn_code SET `;
    let q6 = "d.balance_amount = ( case ";
    let q7 = "d.booking_advance_amount = ( case ";
    let q8 = "d.payment_status = ( case ";
    let q2="";
    let q3="";
    let q4 = "";
    let q5 =`WHERE d.customer_reference_no = "${customer_reference_no[0]}"`
    for (var i =0; i<=booking_advance_amount.length-1; i++){
        if ((final_amount[i] - booking_advance_amount[i])>0){
            q2 += `when d.product_hsn_code = ${hsn_codes[i]} THEN (d.final_amount - ${booking_advance_amount[i]})`
            q3 += `when d.product_hsn_code = ${hsn_codes[i]} THEN ${booking_advance_amount[i]} `
            q4 += `when d.product_hsn_code = ${hsn_codes[i]} THEN "pending"`
            if(hsn_codes.length-1 != i){
                q4 += ","
            }
        }
        else {
            q2 += `when d.product_hsn_code = ${hsn_codes[i]} THEN (d.final_amount - ${booking_advance_amount[i]}) `
            q3 += `when d.product_hsn_code = ${hsn_codes[i]} THEN ${booking_advance_amount[i]} `
            q4 += `when d.product_hsn_code = ${hsn_codes[i]} THEN "paid" `
            // if(hsn_codes.length-1 != i){
            //     q4 += ","
            // }
        }
    }
    let finalquery = q1 + q6 + q2 + "end )," + q7 + q3 + "end )," + q8 + q4 + "end )" + q5;
    
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
router.put ('/updateotherstatesgstratesfromdealers', (req, res)=>{
    const reqdata = req.body.params;
    let hsn_codes = reqdata.rowdatadisplayed.map((data)=>{
        return data.product_hsn_code;
    });
    let extended_discount = reqdata.rowdatadisplayed.map((data)=>{
        return data.extended_discount;
    });
    let customer_reference_no = reqdata.rowdatadisplayed.map((data)=>{
        return data.customer_reference_no.toString();
    });
    let finalquery = "";
    let q3 = ``;
    let q6 = "";
    let q9 = "";
    let q10 = "";
    let q12 = "";
    for(var i =0; i<=extended_discount.length-1; i++){
            let q1 = `UPDATE delivery_report_table d join product_details_table p on 
            d.product_hsn_code = p.product_hsn_code SET `;
            let q2 = `d.discount = (case`;
            let q7 = `d.cgst = (case`;
            let q8 = `d.sgst = (case`;
            let q11 = `d.igst = (case`;
            let q5 = " end )"
            let q4 = ` WHERE d.product_hsn_code in (${hsn_codes}) and  d.customer_reference_no in ('${customer_reference_no[0]}')`;
            if(extended_discount[i] >0 ){
                q3 += ` when d.product_hsn_code = ${hsn_codes[i]} then d.extended_discount * (p.discount/100)`;
                q9 += ` when d.product_hsn_code = ${hsn_codes[i]} then 0`;
                q10 += ` when d.product_hsn_code = ${hsn_codes[i]} then 0`;
                q12 += ` when d.product_hsn_code = ${hsn_codes[i]} then d.extended_discount * (p.gst_rate/100)`;
            }
            else {
                q3 += ` when d.product_hsn_code = ${hsn_codes[i]} then d.rate * (p.discount/100)`;
                q9 += ` when d.product_hsn_code = ${hsn_codes[i]} then 0`;
                q10 += ` when d.product_hsn_code = ${hsn_codes[i]} then 0`;
                q12 += ` when d.product_hsn_code = ${hsn_codes[i]} then d.rate * (p.gst_rate/100)`;
            }
            finalquery = q1 + q2 + q3 + q5 + "," + q7 + q9 + q5 + "," + q8 + q10 + q5 + "," + q11 + q12 + q5 + q4;
    }
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
    // const reqdata = req.body.params;
    // let customer_reference_no = reqdata.customer_reference_no;
    // let product_hsn_code = reqdata.product_hsn_code;
    // db.query(
    //     `update delivery_report_table d
    //     join product_details_table p
    //     on d.product_hsn_code = p.product_hsn_code
    //     set d.discount = d.rate * (p.discount/100), 
    //     d.cgst = 0, 
    //     d.sgst = 0, d.igst = d.rate * (p.gst_rate/100)
    //     where d.customer_reference_no in (?);
    //     `,
    //     [
    //         customer_reference_no
    //     ],
    //     (err,result)=>{
    //         if(err){
    //             console.log(err);
    //         }
    //         else{
    //             res.json(result);
    //         }
    //     }
    // )
})

module.exports = router;