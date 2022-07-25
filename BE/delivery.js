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

router.post('/getInvoices',(req, res)=>{
    const reqdata = req.body.params;
    const phone_number = reqdata.searchData;
    const invoice_no = reqdata.searchData;
    const customer_name = reqdata.searchData;
    const phone_number_alter_one = reqdata.searchData;
    const phone_number_alter_two = reqdata.searchData;
    db.query(`select distinct delivery_date, invoice_no, customer_name 
    from delivery_report_table where phone_number = ? or 
    invoice_no = ? or customer_name = ? or phone_number_alter_one = ?
    or phone_number_alter_two = ?`,
    [
        phone_number,
        invoice_no,
        customer_name,
        phone_number_alter_one,
        phone_number_alter_two
    ],
    (err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.json(result)
        }
    })
})
router.post('/getDeliveryReportData', (req,res)=>{
    const reqdata = req.body.params;
    const phoneno = reqdata.phoneno;
    const customer_name = reqdata.customer_name;
    const invoice_no = reqdata.invoiceNo;
    const customer_reference_no = reqdata.customer_reference_no;
    db.query(
        `select * from delivery_report_table
         where phone_number = ? or customer_name = ?
        or invoice_no = ? or customer_reference_no = ?`,
        [
            phoneno,
            customer_name,
            invoice_no,
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

router.post('/getpurchasestatus',(req,res)=>{
    const reqdata = req.body.params;
    const customer_reference_no = reqdata.e;
    db.query(
        `select distinct purchase_status from 
        delivery_report_table where 
        customer_reference_no = ?`,
        [customer_reference_no],
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

router.post('/getalldataofcustomer',(req,res)=>{
    const reqdata = req.body.params;
    const customer_reference_number = reqdata.currentCustomerReferenceNo;
    const invoice_no = reqdata.currentCustomerReferenceNo;
    const currentCustomerReferenceNoCustomerInvoice = reqdata.currentCustomerReferenceNoCustomerInvoice;
    db.query(
        `select * from delivery_report_table 
        where customer_reference_no = ? or invoice_no = ? 
        or customer_reference_no = ?`,
        [
            customer_reference_number,
            invoice_no,
            currentCustomerReferenceNoCustomerInvoice
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

router.post('/getstatecodefromdeliverytableonbook',(req,res)=>{
    const reqdata = req.body.params.data;
    let product_hsn_code = reqdata.map((data)=>{
        return data.product_hsn_code;
    })
    let customer_reference_no = reqdata.map((data)=>{
        return data.customer_reference_no.toString();
    });
    db.query(
        `select * from delivery_report_table where 
        customer_reference_no in (?) and product_hsn_code in (?)
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
router.put('/updatepurchasestatusofdeliverytable',(req,res)=>{
    const reqdata = req.body.params;
    const customer_reference_no = reqdata.customer_reference_no;
    db.query(
    `update delivery_report_table set 
    purchase_status= ?
    where customer_reference_no = ?`,
    [
        1,
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
router.post ('/getpurchasestatusfrom', (req, res)=>{
    const reqdata = req.body.params;
    let customer_reference_no = reqdata.rowdatadisplayed.map((data)=>{
        return data.customer_reference_no;
    });
    let product_hsn_code = reqdata.rowdatadisplayed.map((data)=>{
        return data.product_hsn_code;
    });
    db.query(
        `select * from delivery_report_table where 
        customer_reference_no in (?) and product_hsn_code in (?)
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
router.put('/updateDeliveryData',(req,res)=>{
    const reqdata = req.body.params;
    let extended_discount = reqdata.rowdatadisplayed.map((data)=>{
        return data.extended_discount;
    });
    let hsn_codes = reqdata.rowdatadisplayed.map((data)=>{
        return data.product_hsn_code;
    });
    let advance_amount = reqdata.rowdatadisplayed.map((data)=>{
        return data.booking_advance_amount;
    });
    let payment_status = reqdata.rowdatadisplayed.map((data)=>{
        return data.payment_status;
    });
    var myDate = new Date(new Date().getTime()+(5*24*60*60*1000));
    var myDate1 = myDate.toISOString();
    var requested_delivery_date = myDate1.substr(0,10);
    let date1 = new Date();
    date2 = date1.toISOString();
    var date2 = date2.substr(0, 10);
    let booked_date = date2;
    let customer_reference_no = reqdata.rowdatadisplayed.map((data)=>{
        return data.customer_reference_no.toString();
    });
    let querystring1 = `UPDATE sdddb1.delivery_report_table SET `;
    let querystring4 = "booking_advance_amount = ( case ";
    let querystring5 = " end )"
    let querystring6 = "requested_delivery_date = ( case ";
    let querystring9 = "payment_status = ( case ";
    let querystring11 = "booked_date = ( case ";
    let querystring12 = "extended_discount = (case ";
    let querystring2 = "";
    let querystring7 = "";
    let querystring8 = "";
    let querystring10 = "";
    let querystring13 = "";
    for (var i = 0; i<hsn_codes.length; i++){
        querystring2 += ` when product_hsn_code = ${hsn_codes[i]} then ${advance_amount[i]}`;
        querystring7 += ` when product_hsn_code = ${hsn_codes[i]} then  "${requested_delivery_date}"`;
        querystring8 += ` when product_hsn_code = ${hsn_codes[i]} then  "${payment_status[i]}"`;
        querystring10 += ` when product_hsn_code = ${hsn_codes[i]} then  "${booked_date}"`;
        if (extended_discount[i] != null){
            querystring13 += ` when product_hsn_code = ${hsn_codes[i]} then  "${extended_discount[i]}"`;
        }
        else{
            querystring13 += ` when product_hsn_code = ${hsn_codes[i]} then 0`;

        }
    }
    let querystring3 = ` WHERE product_hsn_code in (${hsn_codes}) and  customer_reference_no in ('${customer_reference_no[0]}')`;
    let midquerystring1 = querystring4 + querystring2 + querystring5;
    let midquerystring2 = querystring6 + querystring7 + querystring5;
    let midquerystring3 = querystring9 + querystring8 + querystring5;
    let midquerystring4 = querystring11 + querystring10 + querystring5;
    let midquerystring5 = querystring12 + querystring13 + querystring5;
    let finalquerystring = querystring1 + midquerystring1 + "," + 
    midquerystring2 + "," + midquerystring3 + "," + midquerystring4 + 
    "," + midquerystring5 + querystring3;
    db.query(finalquerystring,
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
router.put('/updaterateofdelivery',(req,res)=>{
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
router.post ('/getstatecodefromdelivery', (req, res)=>{
    const reqdata = req.body.params;
    let customer_reference_no = reqdata.rowdatadisplayed.map((data)=>{
        return data.customer_reference_no;
    });
    let product_hsn_code = reqdata.rowdatadisplayed.map((data)=>{
        return data.product_hsn_code;
    });
    db.query(
        `select * from delivery_report_table where 
        customer_reference_no in (?) and product_hsn_code in (?)
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
router.put('/updatebalanceamountdelivery',(req,res)=>{
    const reqdata = req.body.params;
    let hsn_codes = reqdata.rowdatadisplayed.map((data)=>{
        return data.product_hsn_code;
    });
    let customer_reference_no = reqdata.rowdatadisplayed.map((data)=>{
        return data.customer_reference_no.toString();
    });
    let booking_advance_amount = reqdata.rowdatadisplayed.map((data)=>{
        return data.booking_advance_amount;
    });
    let final_amount = reqdata.rowdatadisplayed.map((data)=>{
        return data.final_amount.toString();
    });
    let q1 = `UPDATE sdddb1.delivery_report_table d join sdddb1.product_details_table p
    on d.product_hsn_code = p.product_hsn_code SET `;
    let q2="";
    let q3="";
    let q4 = "";
    let q5 =`WHERE d.customer_reference_no = "${customer_reference_no[0]}"`
    for (var i =0; i<=hsn_codes.length-1; i++){
        if ((final_amount[i] - booking_advance_amount[i])>0){
            q2 += `d.balance_amount = CASE WHEN d.product_hsn_code = ${hsn_codes[i]} THEN (d.final_amount - ${booking_advance_amount[i]}) ELSE d.final_amount END,`
            q3 += `d.booking_advance_amount = CASE WHEN d.product_hsn_code = ${hsn_codes[i]} THEN ${booking_advance_amount[i]} ELSE d.booking_advance_amount END ,`
            q4 += `d.payment_status = CASE WHEN d.product_hsn_code = ${hsn_codes[i]} THEN "pending" else d.payment_status END `
            if(hsn_codes.length-1 != i){
                q4 += ","
            }
        }
        else {
            q2 += `d.balance_amount = CASE WHEN d.product_hsn_code = ${hsn_codes[i]} THEN (d.final_amount - ${booking_advance_amount[i]}) ELSE d.final_amount END, `
            q3 += `d.booking_advance_amount = CASE WHEN d.product_hsn_code = ${hsn_codes[i]} THEN ${booking_advance_amount[i]} ELSE d.booking_advance_amount END ,`
            q4 += `d.payment_status = CASE WHEN d.product_hsn_code = ${hsn_codes[i]} THEN "paid" else d.payment_status END `
            if(hsn_codes.length-1 != i){
                q4 += ","
            }
        }
    }
    let finalquery = q1 + q2 + q3 + q4 + q5;
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
router.put ('/updateotherstatesgstrates', (req, res)=>{
    const reqdata = req.body.params;
    let customer_reference_no = reqdata.customer_reference_no;
    let product_hsn_code = reqdata.product_hsn_code;
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
router.post('/addDeliveryData',(req,res)=>{
    const reqdata = req.body.params;
//     const customerReferenceNo = reqdata.customerReferenceNo;
//   const customerAddress = reqdata.customerAddress;
//   const statecode = reqdata.statename.value; 
//   const statename = reqdata.statename.label;
//   const phone_number = reqdata.phone_number;
//   const phone_number_alter_one = reqdata.phone_number_alter_one;
//   const phone_number_alter_two = reqdata.phone_number_alter_two;
//   const product_hsn_code = reqdata.product_hsn_code;
  const product = reqdata.product;
//   const quantity = reqdata.quantity;
//   const customer_name = reqdata.customer_name;
  const size = product.length;
    let temp = [];
    for (var i =0 ; i<size; i++){
        temp.push([
            reqdata.customerReferenceNo,
            reqdata.customerAddress,
            reqdata.statename.label,
            reqdata.statename.value,
            reqdata.phone_number,
            reqdata.phone_number_alter_one,
            reqdata.phone_number_alter_two,
            reqdata.product_hsn_code[i],
            reqdata.product[i],
            reqdata.quantity[i],
            reqdata.customer_name
        ])
    }
    // if(state1.length != 0){
    // }
    // else if (state2.length != 0 && state1.length != 0){
     
    // }
        db.query(
            `insert into delivery_report_table 
            (   
                customer_reference_no,
                customer_address,
                state,
                state_code,
                phone_number,
                phone_number_alter_one,
                phone_number_alter_two,
                product_hsn_code,
                product,
                quantity,
                customer_name
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
    }
)
router.post('/getDeliveryDataForVerification', (req,res)=>{
    const reqdata = req.body.params;
    const customer_reference_no = reqdata.customer_reference_no;
    const product_hsn_code = reqdata.product_hsn_code;
    db.query(
        `select * from delivery_report_table
         where customer_reference_no = ? and product_hsn_code = ?`,
        [
            customer_reference_no,
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
router.post('/fetchdeliverymatchinggstno', (req,res)=>{
    const reqdata = req.body.params;
    const gst = reqdata.gst;
    db.query(
        `select * from delivery_report_table 
        where gst =? `,
        [gst],
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
router.post('/fetchinvoicesfromdelivery',(req,res)=>{
    const reqdata = req.body.params;
    const gst = reqdata.gst;
    db.query(
        `select distinct invoice_no from delivery_report_table 
        where gst = ?`,
        [gst],
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
router.get('/fetchinvoicesfromdeliverytable',(req,res)=>{
    db.query(
        'select invoice_no from delivery_report_table',
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
router.put('/updateDeliveryDataafterverify',(req,res)=>{
    const reqdata = req.body.params;
    const invoice_no = reqdata.invoice_no;
    let date1 = new Date();
    date2 = date1.toISOString();
    var date2 = date2.substr(0, 10);
    const date_of_supply = date2;
    const po_number = reqdata.po_number;
    const vehicle_no = reqdata.vehicle_no;
    const pan_number = reqdata.pan_number;
    const place_of_supply = reqdata.place_of_supply;
    const customer_reference_no = reqdata.customer_reference_no;
    db.query(
    `update delivery_report_table set 
    invoice_no = ?, delivery_date =?,
    place_of_supply =?,
    po_number=?, vehicle_number=?, pan_number=?, verification_status = ?,
    delivery_status =?
    where customer_reference_no = ?`,
    [
        invoice_no,
        date_of_supply,
        place_of_supply,
        po_number,
        vehicle_no,
        pan_number,
        1,
        "Delivered",
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
router.get('/displayDeliveryReportsData',(req,res)=>{
    db.query(
        'select * from delivery_report_table',
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
router.post('/statusfilterdeliveryreport', (req,res)=>{
    const reqdata = req.body.params;
    const deliverystatus = reqdata.deliverystatus;
    const paymentstatus = reqdata.paymentstatus;
    db.query(
        `select * from delivery_report_table where 
        payment_status = ? and delivery_status = ?`,
        [
            deliverystatus,
            paymentstatus,
            paymentstatus,
            deliverystatus
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
router.post('/paymentstatusfilteronly', (req,res)=>{
    const reqdata = req.body.params;
    const paymentstatus = reqdata.paymentstatus;
    db.query(
        `select * from delivery_report_table where payment_status = ?`,
        [
            paymentstatus
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
router.post('/deliverystatusfilteronly', (req,res)=>{
    const reqdata = req.body.params;
    const deliverystatus = reqdata.deliverystatus;
    db.query(
        `select * from delivery_report_table where delivery_status = ?`,
        [
            deliverystatus
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
router.post('/fetchdealersdatatoverify',(req,res)=>{
    const reqdata = req.body.params;
    const invoice_no = reqdata.invoice_no;
    db.query(
        `select * from delivery_report_table 
        where invoice_no = ?`,
        [invoice_no],
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
router.post('/getverificationstatus',(req,res)=>{
    const reqdata = req.body.params;
    const invoice_no = reqdata.invoice_no;
    db.query(
        `select distinct verification_status from delivery_report_table
        where invoice_no = ?`,
        [invoice_no],
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
router.post('/setverificationstatus',(req,res)=>{
    const reqdata = req.body.params;
    const customer_reference_no = reqdata.customer_reference_no;
    db.query(
        `update delivery_report_table
        set verification_status = 1
        where customer_reference_no = ?`,
        [customer_reference_no],
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
router.put('/updateDeliveryDatafromdealersform',(req,res)=>{
    const reqdata = req.body.params;
    let date1 = new Date();
    date2 = date1.toISOString();
    var date2 = date2.substr(0, 10);
    let delivery_date = date2;
    let hsn_codes = reqdata.rowdatadisplayed.map((data)=>{
        return data.product_hsn_code;
    });
    let advance_amount = reqdata.rowdatadisplayed.map((data)=>{
        return data.booking_advance_amount;
    });
    let customer_reference_no = reqdata.rowdatadisplayed.map((data)=>{
        return data.customer_reference_no.toString();
    });
    let extended_discount = reqdata.rowdatadisplayed.map((data)=>{
        return data.extended_discount;
    });
    let querystring1 = `UPDATE sdddb1.delivery_report_table SET `;
    let querystring2 = `booking_advance_amount = ( case `;
    let querystring3 = ` end )`;
    let querystring4 = `delivery_date = ( case `;
    let querystring5 = `WHERE product_hsn_code in (${hsn_codes}) and  customer_reference_no in ('${customer_reference_no[0]}')`;
    let querystring9 = "extended_discount = ( case ";
    let querystring6 = "";
    let querystring7 = "";
    let querystring8 = "";
    for (var i = 0; i<hsn_codes.length; i++){
        querystring6 += ` when product_hsn_code = ${hsn_codes[i]} then ${advance_amount[i]}`;
        querystring7 += ` when product_hsn_code = ${hsn_codes[i]} then "${delivery_date}"`;
        if (extended_discount[i] != null){
            querystring8 += ` when product_hsn_code = ${hsn_codes[i]} then  "${extended_discount[i]}"`;
        }
        else{
            querystring8 += ` when product_hsn_code = ${hsn_codes[i]} then 0`;

        }
    }
    let midquerystring1 = querystring2 + querystring6 + querystring3;
    let midquerystring2 = querystring4 + querystring7 + querystring3;
    let midquerystring3 = querystring9 + querystring8 + querystring3;
    let finalquerystring = querystring1 + midquerystring1 + "," + midquerystring3 + "," + midquerystring2 + querystring5;
    db.query(finalquerystring,
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
router.post('/customizeddatefetchdeliverydata', (req,res)=>{
    const reqdata = req.body.params;
    const fromdate = reqdata.fromdate;
    const todate = reqdata.todate;
    db.query(
        `select * from delivery_report_table where 
        booked_date between ? and ?`,
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
router.put('/updateDeliveryDetails',(req,res)=>{
    const reqdata = req.body.params.updaterowdata;
    const customer_name = reqdata.customer_name;
    const customer_address = reqdata.customer_address;
    const phone_number = reqdata.phone_number;
    const phone_number_alter_one = reqdata.phone_number_alter_one;
    const phone_number_alter_two = reqdata.phone_number_alter_two;
    const balance_amount = reqdata.balance_amount;
    const product_sl_no = reqdata.product_sl_no;
    const delivery_status = reqdata.delivery_status;
    const customer_reference_no = reqdata.customer_reference_no;
    if(balance_amount == 0){
        db.query(
        `update delivery_report_table set 
        customer_name=?,customer_address= ?,
        phone_number = ?, phone_number_alter_one = ?,
        phone_number_alter_two = ?,
        balance_amount = ?,payment_status= ?,
        product_sl_no=?,
        delivery_status =?
        where customer_reference_no = ?`,
        [
            customer_name,
            customer_address,
            phone_number,
            phone_number_alter_one,
            phone_number_alter_two,
            balance_amount,
            "Paid",
            product_sl_no,
            delivery_status,
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
    }else{
        db.query(
            `update delivery_report_table set 
            customer_name=?,customer_address= ?,
            phone_number = ?, phone_number_alter_one = ?,
            phone_number_alter_two = ?,
            balance_amount = ?,
            product_sl_no =?,
            delivery_status =?
            where customer_reference_no = ?`,
            [
                customer_name,
                customer_address,
                phone_number,
                phone_number_alter_one,
                phone_number_alter_two,
                balance_amount,
                product_sl_no,
                delivery_status,
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