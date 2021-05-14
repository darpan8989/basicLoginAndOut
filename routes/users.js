const express=require('express');
const { pass } = require('../config/mongoose');
const router =express.Router();

router.get('/login',(req,res)=>res.render('login'));

router.get('/register',(req,res)=>res.render('register'));

router.post('/register',(req,res)=>{
    const {name,email,password,password2}=req.body;
    let errors=[];

    if(!name || !email || !password || !password2){
        errors.push({msg:'Please fill in all fields'});
    }

    if(password!==password2){
        errors.push({msg:'Passwords don\'t macth'});
    }

    if(password.length<6){
        errors.push({msg:'Minimum 6 chracter required for password'})
    }

    if(errors.length>0){
        res.render('register',{
            errors,
            name,
            email,
            password,
            password2
        });
    }
    else {
        res.send('pass');
    }
})


module.exports=router;