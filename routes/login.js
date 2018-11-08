const express=require('express');
const router=express.Router();
const pool=require("../pool");
router.get('/login',(req,res)=>{
	var uname=req.query.uname;
	var upwd=req.query.upwd;
	var sql=`select * from kg_user where uname=? and upwd=?`;
	pool.query(sql,[uname,upwd],(err,result)=>{
		if (err) throw err;
		if(result.length>0){
			res.send({code:200,msg:'登录成功!'});
		}else{
			res.send({code:201,msg:'用户名或密码错误'});
		}
	});
});
module.exports=router;