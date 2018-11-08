const express=require('express');
const router=express.Router();
const pool=require("../pool.js");

router.get("/new",(req,res)=>{
    var $pno=req.query.pno;
    var sql=`SELECT lname,l_singer,ltime FROM kg_songlist WHERE country_id=1`;
    pool.query(sql,[],(err,result)=>{
    if(err) console.log(err);
    var data={};
    data.pno=$pno;
    data.pageCount=Math.ceil(result.length/8);
    data.song=result.slice(data.pno*8,data.pno*8+8);
    res.send(data);
    }) 
})
router.get("/listen",(req,res)=>{
    var sql="SELECT * FROM `kg_form`";
    pool.query(sql,(err,result)=>{
    if(err) console.log(err);
    res.send(result);
    }) 
})








/*
router.post("/listen",(req,res)=>{
    var listen=req.body.listen;
    var fid=req.body.fid;
    var sql="UPDATE `kg_form` SET `fhear` = ? WHERE `kg_form`.`fid` = ?";
    pool.query(sql,[listen,fid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows==1)res.send({code:1,msg:"收听加1!"});
        else res.send({code:-1,msg:"收听失败!"});
    })
})*/

module.exports=router;
