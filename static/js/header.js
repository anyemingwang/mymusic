$(function(){
    var $link=$(`<link rel="stylesheet" href="css/header.css">`).appendTo("head");
    $.ajax({
        url:"header.html",
        type:"get",
        success: function(res) {
            $(res).replaceAll("#header");
            vm=new Vue({
                el:"#head",
                data:{
                  keyword:""
                },
                methods:{
                  search_click(){
                    location.href=
                      `http://localhost:5000/search.html?kw=${this.keyword}`
                  }
                }
              })
              var $search=
                $("#head>a>div");
              var $input=$search.parent().prev().children();
              if(location.search.indexOf("kw=")!=-1){
                var kw=location.search.split("=")[1]
                $input.val(decodeURI(kw));
              }
        }
    })
});

