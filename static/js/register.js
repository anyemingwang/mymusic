$("form :input.required").each(function(){
  var $required = $("<span class='high'>&nbsp;&nbsp;*</span>");
  $(this).parent().append($required);
});
$("form :input").focus(function(){
  var $parentf=$(this).parent(); 
  $parentf.find(".msg").remove();
  if($(this).is("#uname")){
    $parentf.find(".high").remove();
    var prompt="用户名不能为空，长度为3-12位";
    $parentf.append("<span class='msg onprompt'>" + "&nbsp;&nbsp;"+prompt + "</span>");
    } 
  if($(this).is("#upwd")){
    $parentf.find(".high").remove();
    var prompt1="密码不能为空，长度为6-12位";
    $parentf.append("<span class='msg onprompt'>" + "&nbsp;&nbsp;"+prompt1 + "</span>");
    } 
  if($(this).is("#cpwd")){
    $parentf.find(".high").remove();
    var prompt2="确认密码要与密码保持一致";
    $parentf.append("<span class='msg onprompt'>" + "&nbsp;&nbsp;"+prompt2 + "</span>");
    } 
  
});
$("form :input").blur(function(){
  var $parent = $(this).parent();
  $parent.find(".msg").remove(); 
  if($(this).is("#uname")){
    $parent.find(".high").remove(); 
    var unameVal=$.trim(this.value);
    $.ajax({
      type:"get",
      url: 'http://localhost:5000/register/checkUname',
      data: {uname:this.value},
      dataType: "json", 
      success: function (result) {
        if (result.code === 201) {
          var error = '用户名已被占用';
          $parent.append("<span class='msg onError'>" + "&nbsp;&nbsp;"+error + "</span>");
        }else if (result.code === 200) {
          if(unameVal==""){
            var errorMsg =" 用户名不能为空";
            $parent.append("<span class='msg onError'>" + "&nbsp;&nbsp;"+errorMsg + "</span>");
         }else if(unameVal.length < 3 ){
            var errorlength =" 请检查用户名的长度";
            $parent.append("<span class='msg onError'>" + "&nbsp;&nbsp;"+errorlength + "</span>"); 
         }else{
            var okMsg=" 通过";
            $parent.append("<span class='msg onSuccess'>" +"&nbsp;&nbsp;"+okMsg + "</span>");
          }
        }
      }
    })
  }
  if($(this).is("#upwd")){
  $parent.find(".high").remove(); 
  var upwdVal=$.trim(this.value);
      if(upwdVal==""){
        var errorMsg1 =" 密码不能为空";
        $parent.append("<span class='msg onError'>" + "&nbsp;&nbsp;"+errorMsg1 + "</span>");
       }else if(upwdVal.length < 6 ){
          var errorlength1 =" 请检查密码长度";
          $parent.append("<span class='msg onError'>" + "&nbsp;&nbsp;"+errorlength1 + "</span>"); 
       }else{
          var okMsg1=" 通过";
          $parent.append("<span class='msg onSuccess'>" +"&nbsp;&nbsp;"+okMsg1 + "</span>");
        }
    }
    if($(this).is("#cpwd")){
      $parent.find(".high").remove(); 
      var cpwdVal=$.trim(this.value);
      var checkVal=$("#upwd").val();
        if(cpwdVal==""){
          var errorMsg2 =" 确认密码不能为空";
          $parent.append("<span class='msg onError'>" + "&nbsp;&nbsp;"+errorMsg2 + "</span>");
         }
         else if(cpwdVal!=checkVal){
            var errorlength2 =" 确认密码与密码不一致";
            $parent.append("<span class='msg onError'>" + "&nbsp;&nbsp;"+errorlength2 + "</span>"); 
         }
         else{
            var okMsg2=" 通过";
            $parent.append("<span class='msg onSuccess'>" +"&nbsp;&nbsp;"+okMsg2 + "</span>");
          }
      }
});
function disable(){
  $("#register").attr("disabled",'disabled');
  $("#register").css("background", "#ccc");	   
  }
function enable(){	    	
  $("#register").removeAttr("disabled");
  $("#register").css("background", "#3DB9EC");	   
  }	
  //按钮
  $("#register").click(function() {
    var count = 0;
    $("form :input.required").each(function () {
      if ($(this).parent().find('span').hasClass('onSuccess')) {
        count++;
      }
    });
    if (count == 3) {
      $.ajax({
          type: 'post',
          url: 'http://localhost:5000/register/regadd',
          data: {
            uname:$("#uname").val(), 
            upwd:$("#upwd").val(),
            sex:$("input[name=sex]").val()
          },
          dataType:'json',
          success: function(result){
            if(result.code===200){
              alert('注册成功!');
              location.href = 'http://localhost:5000/index.html';
            }else {
              alert('注册失败');
            }
          }
        }
      )
    }
  });
