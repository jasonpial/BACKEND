
const r=require('express').Router();
const db=require('../config/db');
const auth=require('../middleware/auth');

r.get('/',async(_,res)=>{
 res.json((await db.query('SELECT * FROM ministries')).rows);
});

r.post('/',auth,async(req,res)=>{
 const {name,description,country,denomination,founded_year}=req.body;
 const m=await db.query(
 'INSERT INTO ministries(name,description,country,denomination,founded_year,created_by) VALUES($1,$2,$3,$4,$5,$6) RETURNING *',
 [name,description,country,denomination,founded_year,req.user.id]);
 res.json(m.rows[0]);
});

module.exports=r;
