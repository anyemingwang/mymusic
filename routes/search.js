const express=require("express")
const router=express.Router()
const pool=require("../pool")

router.get("/list",(req,res)=>{
  var kw=req.query.kw;
  var sql=`SELECT lname,l_singer,ltime,album FROM kg_songlist where l_singer like '%${kw}%'`;
  pool.query(sql,(err,result)=>{
  if(err) console.log(err);
  res.send(result);
  }) 
})
module.exports=router;