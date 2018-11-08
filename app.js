const express=require('express');
const bodyParser=require('body-parser');
const index=require('./routes/index');
const rank=require('./routes/rank');
const search=require('./routes/search');
const register=require('./routes/register');
const login=require('./routes/login');

var app=express();
var server=app.listen(5000);
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('static'));
const cors=require("cors");
app.use(cors({
    origin:["http://127.0.0.1:5000"],
    credentials:true
}));
app.use("/index",index);
app.use("/rank",rank);
app.use("/search",search);
app.use("/register",register);
app.use("/login",login);
