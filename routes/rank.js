const express=require('express');
const router=express.Router();
const pool=require("../pool.js");

router.get("/hot",(req,res)=>{
    var lid=req.query.lid;
    var sql=`SELECT lname,l_singer,ltime,ylistname FROM kg_songlist,kg_classify WHERE classify_id=? and yid=?`;
    pool.query(sql,[lid,lid],(err,result)=>{
    if(err) console.log(err);
    res.send(result);
    }) 
})
module.exports=router;