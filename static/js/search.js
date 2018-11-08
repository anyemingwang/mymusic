$(function(){
    if(location.search.indexOf("kw=")!=-1){
      var kw=decodeURI(
        location.search.split("=")[1]
      );
      $.ajax({
        url:"http://localhost:5000/search/list",
        type:"get",
        data:{kw},
        dataType:"json",
        success:function(result){
          var html="";
          var html1="";
          html1=`<p class="search_key">搜索<span class="col">"${kw}"</span>相关的歌曲</p>`;
          $("#action_area").html(html1);
          for(var {lname,ltime,l_singer,album} of result){
            html+=`<ul class="list_content">
            <li class="width_l">
                <span class="search_icon"></span>
                <a href="#" class="pc_songname lname">${l_singer} - ${lname}</a></li>
            <li class="width_c">${album}</li>
            <li class="width_r ltime">
                    <span class="pc_songTime">${ltime}</span>
                    <span class="icon-play"></span>
                    <span class="pc_download"></span>
                    <span class="pc_share"></span>
            </li>
        </ul>`;
          }                  
          $("#song_list").html(html);
        }
      })
    }
})