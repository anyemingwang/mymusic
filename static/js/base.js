$(function(){
    var titlename= $(document).attr("title").split("");
     function gdtitle(){
    titlename.push(titlename[0]);
    titlename.shift();
    document.title = titlename.join("");
    }
    setInterval(gdtitle,1000);
})