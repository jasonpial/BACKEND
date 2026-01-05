
const r=require('express').Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const db=require('../config/db');

r.post('/register',async(req,res)=>{
 const {full_name,email,password,role}=req.body;
 const hash=await bcrypt.hash(password,10);
 await db.query('INSERT INTO users(full_name,email,password_hash,role) VALUES($1,$2,$3,$4)',
 [full_name,email,hash,role]);
 res.json({message:'registered'});
});

r.post('/login',async(req,res)=>{
 const {email,password}=req.body;
 const u=(await db.query('SELECT * FROM users WHERE email=$1',[email])).rows[0];
 if(!u||!await bcrypt.compare(password,u.password_hash)) return res.sendStatus(401);
 const token=jwt.sign({id:u.id,role:u.role},process.env.JWT_SECRET);
 res.json({token});
});

module.exports=r;
