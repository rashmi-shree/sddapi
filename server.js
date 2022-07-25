const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());

const login = require("./BE/login");
const delivery = require("./BE/delivery");
const customer = require("./BE/customer");
const jointables = require("./BE/jointables");
const product = require("./BE/product");
const stateandstatecodes = require("./BE/stateandstatecodes");
const dealers = require("./BE/dealers");

app.use("/users",login);
app.use("/delivery",delivery);
app.use("/customer",customer);
app.use("/jointables",jointables);
app.use("/product",product);
app.use("/stateandstatecodes",stateandstatecodes);
app.use("/dealers",dealers);

app.listen(3000,()=>{
    console.log("server running");
})
