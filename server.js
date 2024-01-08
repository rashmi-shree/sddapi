const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());

const login = require("./BE/login");
const users = require("./BE/user");
const delivery = require("./BE/delivery");
const customer = require("./BE/customer");
const jointables = require("./BE/jointables");
const product = require("./BE/product");
const stateandstatecodes = require("./BE/stateandstatecodes");
const dealers = require("./BE/dealers");

app.use("/users",login);
app.use("/employees",users);
app.use("/delivery",delivery);
app.use("/customer",customer);
app.use("/jointables",jointables);
app.use("/product",product);
app.use("/stateandstatecodes",stateandstatecodes);
app.use("/dealers",dealers);

app.listen(5001,()=>{
    console.log("server running on port 5001");
})
app.get('/', (req, res) => {
    // Attempt to establish a connection to the database
    db.connect((err) => {
        if (err) {
            console.error('Error connecting to database:', err);
            res.status(500).send('Error connecting to database');
            return;
        }
        console.log('Connected to the database');
        res.send('Connected to the database, server running on 5001');
        // You might want to close the connection here if it's not needed for further operations immediately
        // db.end();
    });
});