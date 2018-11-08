		$(function(){
			var timer = null;
			var pageHeight= document.documentElement.innerHeight;    //获取可视区域的高度
			window.onscroll=function(){        //onscroll 事件在元素滚动时执行
				var backtop=document.body.scrollTop;      //获取滚动条滚动的垂直距离
				if(backtop>=1000) {
					$(".scroll").show();    //若滚动条滚动的垂直距离大于180px,则显示“回到顶部”链接,否则隐藏
				} else {
					$(".scroll").hide();
				}
			};
			$(".scroll").click(function(){
				timer= setInterval(function(){
					var backtop= document.body.scrollTop;
					var speedTop = backtop / 5;
					document.body.scrollTop = backtop - speedTop;
					if(backtop == 0) {
						clearInterval(timer);
					}},30);//设置计时器，每隔30毫秒调用函数,如果滚动条垂直距离等于零，就调用clearInterval()函数清除计时器
			});
		});