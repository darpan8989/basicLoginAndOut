const express = require("express");
const expressLayouts=require('express-ejs-layouts');
const mongoose = require('mongoose');
const app=express();

const db=require('./config/mongoose');

//EJS
app.use(expressLayouts);
app.set('view engine','ejs');

//Bodyparser
app.use(express.urlencoded({extended:false}));//This helps in getting data to req.body from the forms

//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));

const PORT=process.env.PORT || 5000;

app.listen(PORT,console.log(`Server started on port ${PORT}`));