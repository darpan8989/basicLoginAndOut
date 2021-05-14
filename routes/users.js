const express=require('express');
const { pass } = require('../config/mongoose');
const router =express.Router();
const bcrypt=require('bcryptjs');

const User=require('../models/User');

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
        //Validation passed
        User.findOne({email : email}).
        then(user=>{
            if(user){
                // user exists
                errors.push({msg:'Email is already registered'}); 
                res.render('register',{
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            }
            else {
                const newUser = new User({
                    name,
                    email,
                    password
                });
               // Hash password

               bcrypt.genSalt(10,(err,salt)=>
                bcrypt.hash(newUser.password,salt,(err,hash)=>{
                    if(err) throw err;

                    //Set password to hashed password
                    newUser.password=hash;
                    //Save user
                    newUser.save()
                        .then(user=>{
                            req.flash('success_msg','You are now registered and log in');
                            res.redirect('/users/login');
                        })
                        .catch(err=> console.log(err));

               }))
            }
        })
    }
})


module.exports=router;