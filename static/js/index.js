
$(function(){
    function loadPage(pno=0){
         $.ajax({
            url:"http://localhost:5000/index/new",
            type:"get",
            data:{pno},
            dataType:"json",
            success:function(data){
                var {pno,pageCount,song}=data;
                var html="";
                var page=pno;
                for(var {lname,l_singer,ltime} of song){
                        html+=`<li><a href="#">
						<span class="songName">${l_singer} - ${lname}</span>
						<span class="songTips"></span>
						<span class="songTime">${ltime}</span>
						<span class="icon-download"></span>
						<span class="icon-play"></span>
					    </a></li>`
                    }
                    $("#Chain").html(html);
                    var html=`<a class="prev"></a>`;
                        html+=`<div class="page">
                        <span class="currentPage">${++page}</span><span class="allPage">/${pageCount}</span>
					</div>`;
                       html+=`<a class="next"></a>`;
                    var $page=$(".pages")
                    $page.html(html);
                    if(pno==0)
                        $page.children(":first").css("background-position","1px 2px")
            
                    if(pno==pageCount-1)
                        $page.children(":last").css("background-position","-12px 2px")
                       
                }
            })
    }   
     loadPage();
    $(".pages").on("click","a",function(e){
        e.preventDefault();
        var $a=$(this);
            if($a.attr("class")=='prev'){
                var pno=$a.html();
            }else{
                var pno=$a.html()+1;
            }
            loadPage(pno);
    })
})
$(function(){
     $.ajax({
        url:"http://localhost:5000/index/listen",
        type:"get",
        dataType:"json",
        success:function(result){
            var html="";
            for(var {ftitle,f_img,fhear} of result){
                html+=`<li>
                <div class="play_btn"></div>
                <a href="#">
                <img src="${f_img}"/>
                <p>${ftitle}</p>
                <p>${fhear/10000}万</p></a>
            </li>`
            }
            $("#itemContent").html(html);
        }
    })
})
                    