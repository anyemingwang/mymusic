$(function(){
    function loadPage(lid=1){
        $.ajax({
            url:"http://localhost:5000/rank/hot",
            type:"get",
            data:{lid},            
            dataType:"json",
            success:function(data){
               var html="";
               var html1="";
               var {ylistname}=data[1];
               html1=`<div class="pc_temptitle">
               <h3>${ylistname}</h3>
                    <span class="rank_update">2018-09-08 更新</span>
                    <a href="#"><span></span>播放全部</a>
               </div>`;
               $("#pc_title").html(html1);
               for(var i=1;i<=data.length;i++){
                    var {l_singer,lname,ltime,ltime} = data[i-1]; 
                     html+=`<li>
                     <span class="pc_btn" data-check=checkbox></span>
                     <span class="pc_num">${i}</span>
                    <span class="pc_songTips"></span>
                     <a href="#" class="pc_songname">${l_singer} - ${lname}</a>
                     <span class="pc_songTime">${ltime}</span>
                    <span class="pc_share"></span>
                    <span class="pc_download"></span>
                     <span class="icon-play"></span>
                    </li>`;   
               }
                $("#hot").html(html);
              }
        })
    }
    loadPage();
    $("#top500").click(function(e){
        e.preventDefault();
        loadPage(2);
    })
    $("#riselist").click(function(e){
        e.preventDefault();
        loadPage(1);
    })
}) 