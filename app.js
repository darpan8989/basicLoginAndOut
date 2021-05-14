const express = require("express");
const expressLayouts=require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash=require('connect-flash');
const session = require('express-session');


const app=express();

const db=require('./config/mongoose');

//EJS
app.use(expressLayouts);
app.set('view engine','ejs');

//Bodyparser
app.use(express.urlencoded({extended:false}));//This helps in getting data to req.body from the forms

//Express session
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}));

//Connect flash
app.use(flash());

app.use((req,res,next)=>{
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    next();
})

//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));

const PORT=process.env.PORT || 5000;

app.listen(PORT,console.log(`Server started on port ${PORT}`));