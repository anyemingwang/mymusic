const express=require('express');
const router=express.Router();
const pool=require("../pool");

//检查用户名
router.get('/checkUname',(req,res)=>{
	var uname=req.query.uname;
	var sql=`select * from kg_user where uname=?`;
	pool.query(sql,[uname],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send({code:201,msg:'用户名已存在'});
		}else{
			res.send({code:200,msg:'用户名可用'});
		}
	});
});
//注册用户
router.post('/regadd',(req,res)=>{
	// var obj=req.body;
	var uname=req.body.uname,upwd=req.body.upwd,sex=req.body.sex;
	var sql=`insert into kg_user values(null,?,?,?)`;
	pool.query(sql,[uname,upwd,sex],(err,result)=>{
		if(err) throw err;
		res.send({code:200,msg:'注册成功'});
	 });
});
module.exports=router;
