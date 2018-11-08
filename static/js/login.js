$("#UserName").blur(function () {
    if (!this.value) {
      $("#showResult").text("用户名不能为空！");
      return false;
    }
  });
$("#UserPwd").blur(function () {
    if (!this.value) {
      $("#showResult").text("密码不能为空！");
      return false;
     }
  });
$("#btn_login").click(function () {
    $.ajax({
      type: 'get',
      url: 'http://localhost:5000/login/login',
      data: {
        uname:$("#UserName").val(), 
        upwd:$("#UserPwd").val()
      },
      dataType:'json',
      success: function (result) {
        if (result.code === 200) {              //登录成功
          alert("登录成功!");
          location.href = 'http://localhost:5000/index.html';
        }else{       //登录失败
            $("#showResult").text('用户名或密码错误');
        } 
      }
    });
  })


