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
router.get('/getInvoices',(req, res)=>{
    db.query(`select distinct delivery_date, invoice_no, 
    customer_name, phone_number, phone_number_alter_one,
    phone_number_alter_two 
    from delivery_report_table where invoice_no IS NOT NULL`,
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
        `select * from delivery_report_table d, product_details_table p
        where d.product_hsn_code = p.product_hsn_code
         and ( phone_number = ? or customer_name = ?
        or invoice_no = ? or customer_reference_no = ? )`,
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
router.post('/getbookingstatus',(req,res)=>{
    const reqdata = req.body.params;
    const customer_reference_no = reqdata.e;
    db.query(
        `select distinct booking_status from 
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
router.put('/updatebookingstatusofdeliverytable',(req,res)=>{
    const reqdata = req.body.params;
    const customer_reference_no = reqdata.customer_reference_no;
    db.query(
    `update delivery_report_table set 
    booking_status= ?
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
    // let owner_company1 = reqdata.rowdatadisplayed.map((data)=>{
    //     return data.owner_company;
    // });
    let owner_company = reqdata.customerdata.owner_company;
    // let state1 = reqdata.rowdatadisplayed.map((data)=>{
    //     return data.state;
    // });
    let state = reqdata.customerdata.statename.label;
    let state_code = reqdata.customerdata.statename.value;
    // let state_code1 = reqdata.rowdatadisplayed.map((data)=>{
    //     return data.state_code;
    // });
    console.log("----------------------------------owner_company",owner_company);
    console.log("----------------------------------state",state);
    console.log("----------------------------------state_code",state_code);
    // console.log("----------------------------------owner_company1",owner_company1);
    // console.log("----------------------------------state1",state1);
    // console.log("----------------------------------state_code1",state_code1);
    // if (owner_company1 !=owner_company){
    //     owner_company = owner_company;
    //     state = state;
    //     state_code = state_code;
    // }
    // if(state1 != state){
    //     state = state1;
    //     state_code = state_code1;
    // }

    var phone_number_alter_one = '';
    var phone_number_alter_two = '';
    var requested_delivery_date = '';
    let customer_name = reqdata.rowdatadisplayed.map((data)=>{
        return data.customer_name;
    });
    let customer_address = reqdata.rowdatadisplayed.map((data)=>{
        return data.customer_address;
    });
    let phone_number = reqdata.rowdatadisplayed.map((data)=>{
        return data.phone_number;
    });
    
    if (phone_number_alter_one.length == 0){
        phone_number_alter_one = null;
    }
    else {
        phone_number_alter_one = reqdata.rowdatadisplayed.map((data)=>{
            return data.phone_number_alter_one;
        });
    }
    if (phone_number_alter_two.length == 0){
        phone_number_alter_two = null;
    }
    else {
        phone_number_alter_two = reqdata.rowdatadisplayed.map((data)=>{
            return data.phone_number_alter_two;
        });
    }
    let quantity = reqdata.rowdatadisplayed.map((data)=>{
        return data.quantity;
    });
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
    requested_delivery_date = reqdata.rowdatadisplayed.map((data)=>{
        return data.requested_delivery_date;
    });
    // if (requested_delivery_date.length == 0){
    //     requested_delivery_date = null;
    // }
    // else {
    //     requested_delivery_date = reqdata.rowdatadisplayed.map((data)=>{
    //         return data.requested_delivery_date;
    //     });
    // }
    // var myDate = new Date(new Date().getTime()+(5*24*60*60*1000));
    // var myDate1 = myDate.toISOString();
    // var requested_delivery_date = myDate1.substr(0,10);
    let date1 = new Date();
    date2 = date1.toISOString();
    var date2 = date2.substr(0, 10);
    let booked_date = date2;
    let customer_reference_no = reqdata.rowdatadisplayed.map((data)=>{
        return data.customer_reference_no.toString();
    });
    let querystring1 = `UPDATE sdd.delivery_report_table SET `;
    let querystring4 = "booking_advance_amount = ( case ";
    let querystring5 = " end )"
    let querystring6 = "requested_delivery_date = ( case ";
    let querystring9 = "payment_status = ( case ";
    let querystring11 = "booked_date = ( case ";
    let querystring12 = "extended_discount = (case ";
    let querystring14 = "owner_company = (case ";
    let querystring16 = "state = (case ";
    let querystring18 = "state_code = (case ";
    let querystring20 = "customer_name = (case ";
    let querystring22 = "customer_address = (case ";
    let querystring23 = "phone_number = (case ";
    let querystring24 = "phone_number_alter_one = (case ";
    let querystring25 = "phone_number_alter_two = (case ";
    let querystring26 = "quantity = (case ";
    let querystring2 = "";
    let querystring7 = "";
    let querystring8 = "";
    let querystring10 = "";
    let querystring13 = "";
    let querystring15 = "";
    let querystring17 = "";
    let querystring19 = "";
    let querystring21 = "";
    let querystring27 = "";
    let querystring28 = "";
    let querystring29 = "";
    let querystring30 = "";
    let querystring31 = "";
    for (var i = 0; i<hsn_codes.length; i++){
        querystring2 += ` when product_hsn_code = ${hsn_codes[i]} then ${advance_amount[i]}`;
        querystring7 += ` when product_hsn_code = ${hsn_codes[i]} then  "${requested_delivery_date}"`;
        querystring8 += ` when product_hsn_code = ${hsn_codes[i]} then  "${payment_status[i]}"`;
        querystring10 += ` when product_hsn_code = ${hsn_codes[i]} then  "${booked_date}"`;
        querystring15 += ` when product_hsn_code = ${hsn_codes[i]} then  "${owner_company}"`;
        querystring17 += ` when product_hsn_code = ${hsn_codes[i]} then  "${state}"`;
        querystring19 += ` when product_hsn_code = ${hsn_codes[i]} then  "${state_code}"`;
        querystring21 += ` when product_hsn_code = ${hsn_codes[i]} then  "${customer_name}"`;
        querystring27 += ` when product_hsn_code = ${hsn_codes[i]} then  "${customer_address}"`;
        querystring28 += ` when product_hsn_code = ${hsn_codes[i]} then  "${phone_number}"`;
        querystring29 += ` when product_hsn_code = ${hsn_codes[i]} then  "${phone_number_alter_one}"`;
        querystring30 += ` when product_hsn_code = ${hsn_codes[i]} then  "${phone_number_alter_two}"`;
        querystring31 += ` when product_hsn_code = ${hsn_codes[i]} then  "${quantity}"`;
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
    let midquerystring6 = querystring14 + querystring15 + querystring5;
    let midquerystring7 = querystring16 + querystring17 + querystring5;
    let midquerystring8 = querystring18 + querystring19 + querystring5;
    let midquerystring9 = querystring20 + querystring21 + querystring5;
    let midquerystring10 = querystring22 + querystring27 + querystring5;
    let midquerystring11 = querystring23 + querystring28+ querystring5;
    let midquerystring12 = querystring24 + querystring29 + querystring5;
    let midquerystring13 = querystring25 + querystring30 + querystring5;
    let midquerystring14 = querystring26 + querystring31 + querystring5;


    let finalquerystring = querystring1 + midquerystring1 + "," + 
    midquerystring2 + "," + midquerystring3 + "," + midquerystring4 + 
    "," + midquerystring5 + "," + midquerystring6 + "," + midquerystring7 +
    "," + midquerystring8 + "," + midquerystring9 + "," + midquerystring10 + ","
    +midquerystring11 + "," +
    midquerystring14 + querystring3;
    console.log("finalquerystring",finalquerystring);
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
    console.log("hiii helloo", finalquery);
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
    let q1 = `UPDATE sdd.delivery_report_table d join sdd.product_details_table p
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
    // console.log("finalquery",finalquery);
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
  const customerAddress = reqdata.customerAddress;
  const customerName = reqdata.customerName;
  const phone_number = reqdata.phone_number;
  var statename = reqdata.statename.label;
  var statecode = reqdata.statename.value;
  var owner_company = reqdata.owner_company;
  if(statename == undefined){
    if (owner_company == "SRI PARAMANANDA ENTERPRISES"){
        statename = "Karnataka";
        statecode = "29";
    }
    else if (owner_company == "SDD ENTERPRISES"){
        statename = "Tamil Nadu";
        statecode = "33";
    }
  }
  var phone_number_alter_one = reqdata.phone_number_alter_one;
  var phone_number_alter_two = reqdata.phone_number_alter_two;

  if (phone_number_alter_one.length == 0){
    phone_number_alter_one = null;
}
if (phone_number_alter_two.length == 0){
    phone_number_alter_two = null;
}
  const product = reqdata.product;
  const size = product.length;
    let temp = [];
    
    for (var i =0 ; i<size; i++){
        temp.push([
            reqdata.customerReferenceNo,
            reqdata.customerAddress,
            statename,
            statecode,
            reqdata.phone_number,
            phone_number_alter_one,
            phone_number_alter_two,
            reqdata.product_hsn_code[i],
            reqdata.product[i],
            reqdata.quantity[i],
            reqdata.customer_name,
            owner_company
        ])
    }
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
                customer_name,
                owner_company
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
        `select distinct invoice_no, verification_status, purchase_status from delivery_report_table 
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
    let querystring1 = `UPDATE sdd.delivery_report_table SET `;
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
    const product = reqdata.product;
    const quantity = reqdata.quantity;
    if(balance_amount == 0){
        if (delivery_status != "Cancelled"){
            db.query(
            `update delivery_report_table set 
            customer_name=?,customer_address= ?,
            phone_number = ?, phone_number_alter_one = ?,
            phone_number_alter_two = ?,
            balance_amount = ?,payment_status= ?,
            product_sl_no=?,
            delivery_status =?
            where customer_reference_no = ? and product = ?`,
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
                customer_reference_no,
                product
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
        }else if(delivery_status == "Cancelled"){
            db.query(
                `update delivery_report_table set 
                customer_name=?,customer_address= ?,
                phone_number = ?, phone_number_alter_one = ?,
                phone_number_alter_two = ?,
                balance_amount = ?,payment_status= ?,
                product_sl_no=?,
                delivery_status =?, quantity =?
                where customer_reference_no = ? and product = ?`,
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
                    quantity-quantity,
                    customer_reference_no,
                    product
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
    }else{
        if(delivery_status != "Cancelled"){
            db.query(
                `update delivery_report_table set 
                customer_name=?,customer_address= ?,
                phone_number = ?, phone_number_alter_one = ?,
                phone_number_alter_two = ?,
                balance_amount = ?,payment_status= ?,
                product_sl_no =?,
                delivery_status =?
                where customer_reference_no = ? and product = ?`,
                [
                    customer_name,
                    customer_address,
                    phone_number,
                    phone_number_alter_one,
                    phone_number_alter_two,
                    balance_amount,
                    "pending",
                    product_sl_no,
                    delivery_status,
                    customer_reference_no,
                    product
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
        else if (delivery_status == "Cancelled"){
            db.query(
                `update delivery_report_table set 
                customer_name=?,customer_address= ?,
                phone_number = ?, phone_number_alter_one = ?,
                phone_number_alter_two = ?,
                balance_amount = ?,payment_status= ?,
                product_sl_no =?,
                delivery_status =?, quantity =?
                where customer_reference_no = ? and product = ?`,
                [
                    customer_name,
                    customer_address,
                    phone_number,
                    phone_number_alter_one,
                    phone_number_alter_two,
                    balance_amount,
                    "pending",
                    product_sl_no,
                    delivery_status,
                    quantity-quantity,
                    customer_reference_no,
                    product
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
       
    }
})
module.exports = router;