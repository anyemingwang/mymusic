$(()=>{
	//--鼠标划入划出=>隐藏显示
	let $tri_up = $('.trigger_up'),
			$pb_box = $('.playbar_box'),
			$pbar=$('.playbar_bg'),
			time=null,
		  lock_state=false;
	function pbShow(){
		$tri_up.hide();
		$pbar.css({bottom : 0});
		$pb_box.css({bottom : 0});
	}
	function pbHide(){
		time = setTimeout(()=>{
							$pbar.css({bottom : '-100px'})
							$tri_up.show();
							$pb_box.css({bottom : '-100px'});
						}, 1000);
	}
	function mouseEnter(){
		pbShow();
	}
	function mouseLeave(e){
		// console.log(e.target)
		if (lock_state) {
			pbHide();
		}
	}
	$tri_up.mouseenter(mouseEnter);
	$pb_box.mouseenter(function(){
		clearTimeout(time);
		time = null;
	});
	$pb_box[0].addEventListener('mouseleave', mouseLeave, false);
	//锁定playbar
	$('.pb_lock>a>i').click(function(e){
		e.preventDefault();
		let $tar=$(this);
		$tar.toggleClass('lock_icon').toggleClass('unlock_icon');;
		if($tar.is('.lock_icon')){
			lock_state=true;
			// $tri_up.mouseenter(mouseEnter);
			// $pb_box.mouseleave(mouseLeave);
			// $pb_box[0].addEventListener('mouseleave', mouseLeave, false);
		}else{
			lock_state=false;
			// $tri_up.off('mouseenter',mouseEnter);
			// $pb_box.off('mouseleave', mouseLeave);
			// $pb_box[0].removeEventListener('mouseleave', mouseLeave, false);
			
		}
		pbShow();
	});
	//--拖动进度条
	//dot的left值:-5=>520
	//cbar的width:0%=>100%
	let $dot=$('.playbar .pb_dot'),
			$cbar=$('.playbar .pb_cbar'),
			$tbar=$('.playbar .pb_tbar'),
			$box=$dot.parent(),
			canMove=false;
	// console.log($box);
	//改变dot和进度条的left
	function changeLeft(dotLeft){
		$dot.css({
			left: dotLeft
		});
		let cb_width = (dotLeft + 5) * 100 / 525 + "%";
		$cbar.css('width', cb_width);
	}
	function dragBar(){
			$box.mousemove(function (e) {
				if (canMove) {
					let dotLeft = e.pageX - $box.offset().left - $dot.width() / 2;
					// console.log(e.pageX, $box.offset().left, dotLeft);
					if(dotLeft<-5){
						dotLeft=-5;
					}else if(dotLeft>520){
						dotLeft=520;
					}
					changeLeft(dotLeft);
					//防止拖动过快, 鼠标在外部弹起
					window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
				}
			})
	}
	$dot.mousedown(function() {
		canMove=true;
		dragBar();
	});
	$dot.mouseup(function() {
		canMove=false;
		$box.off('mousemove');
	});
	//--点击进度条
	$tbar.click(function(e){
		let dotLeft = e.pageX - $box.offset().left - $dot.width() / 2,
				progress = (dotLeft+5)/525;
		changeLeft(dotLeft);
		audio.currentTime=progress*audio.duration;
	})
	//--播放控制
	let audio=document.getElementById('aud'),
			$pause=$('[data-action=pause]'),
			$ctime=$('.duration>.ctime'),
			$ttime=$('.duration>.ttime'),
			timer=null;
	$pause.click(function(){
		let $pau_ico=$(this).children('i');
		$pau_ico.toggleClass('pau_icon').toggleClass('play_icon');
		console.log($pau_ico.is('.play_icon'));
		if($pau_ico.is('.play_icon')){
			audio.play();
		}else{
			audio.pause();
		}
		changeTime();
	});
	function getSeconds(time){
		return time%60;
	}
	function getMinutes(time){
		return ((time-time%60)/60)%60;
	}
	function getHours(time){
		return Math.floor(time/3600);
	}
	function keepTwo(num){
		return (100+num+"").slice(1);
	}
	function getStrTime(time){
		let curTime =  time | 0,
			  ct_s = getSeconds(curTime),
			  ct_m = getMinutes(curTime),
			  ct_h = getHours(curTime),
			  str = ct_h ? keepTwo(ct_h) + ":" + keepTwo(ct_m) + ":" + keepTwo(ct_s) : keepTwo(ct_m) + ":" + keepTwo(ct_s);
		return str;
	}
	//设置当前时间
	function changeTime(){
		if(timer){ return; } 
		timer=setInterval(()=>{
			// console.log(curTime, str);
			//1.更改当前时间
			$ctime.html(getStrTime(audio.currentTime));
			//2.更改进度条位置
			let dotLeft = (audio.currentTime/audio.duration)*525-5;
			changeLeft(dotLeft);
			//正常播放完毕, 清除定时器并切换按钮class
			//手动暂停, 清除定时器
			if(audio.ended){
				$pause.children('i').toggleClass('pau_icon').toggleClass('play_icon');
				clearInterval(timer);
				timer=null;
			} else if (audio.paused){
				clearInterval(timer);
				timer = null;
			}
		},1000)
	}
	//设置总时间
	// console.log(getStrTime(audio.duration));
	//音频元数据已加载完毕
	audio.onloadedmetadata=function(){
		$ttime.html(getStrTime(audio.duration));
	}
});


var medisArray = new Array();   // 定义一个新的数组
function createLrc () {
  var medis = document.getElementById('lrc_content').innerText;
  var medises = medis.split("\n");    // 用换行符拆分获取到的歌词
  $.each(medises, function (i, item) {    // 遍历medises，并且将时间和文字拆分开，并push进自己定义的数组，形成一个对象数组
    var t = item.substring(item.indexOf("[") + 1, item.indexOf("]"));
    medisArray.push({
      t: (t.split(":")[0] * 60 + parseFloat(t.split(":")[1])).toFixed(3),
      c: item.substring(item.indexOf("]") + 1, item.length)
    });
  });
  var ul = $("#text");
  // 遍历medisArray，并且生成li标签，将数组内的文字放入li标签
  $.each(medisArray, function (i, item) {
    var li = $("<li>");
    li.html(item.c);
		ul.append(li);
  });
}
createLrc();
var fraction =0.45;
var topNum =0;
function lineHeight(lineno){
  var ul = $("#text");
  var $ul = document.getElementById('text');
 // 令正在唱的那一行高亮显示
  if (lineno > 0) {
    $(ul.find("li").get(topNum + lineno-1)).removeClass("lineheight");
  }
  var nowline = ul.find("li").get(topNum + lineno);
  $(nowline).addClass("lineheight");

    // 实现文字滚动
  var _scrollTop;
  $ul.scrollTop =32;
  if ($ul.clientHeight * fraction > nowline.offsetTop) {
    _scrollTop =32;
  } else if (nowline.offsetTop > ($ul.scrollHeight - $ul.clientHeight * (1 - fraction))) {
    _scrollTop = $ul.scrollHeight - $ul.clientHeight;
  } else {
    _scrollTop = nowline.offsetTop - $ul.clientHeight * fraction;
  }

  //以下声明歌词高亮行固定的基准线位置成为 “A”
  if ((nowline.offsetTop - $ul.scrollTop) >= $ul.clientHeight * fraction) {
    //如果高亮显示的歌词在A下面，那就将滚动条向下滚动，滚动距离为 当前高亮行距离顶部的距离-滚动条已经卷起的高度-A到可视窗口的距离
    $ul.scrollTop += Math.ceil(nowline.offsetTop - $ul.scrollTop - $ul.clientHeight * fraction);

  } else if ((nowline.offsetTop - $ul.scrollTop) < $ul.clientHeight * fraction && _scrollTop != 0) {
    //如果高亮显示的歌词在A上面，那就将滚动条向上滚动，滚动距离为 A到可视窗口的距离-当前高亮行距离顶部的距离-滚动条已经卷起的高度
    $ul.scrollTop -= Math.ceil($ul.clientHeight * fraction - (nowline.offsetTop - $ul.scrollTop));

  } else if (_scrollTop == 0) {
    $ul.scrollTop = 0;
  } else {
    $ul.scrollTop += $(ul.find('li').get(0)).height();
  }
}
var lineNo =1;
var audio=document.getElementById('aud');
audio.ontimeupdate = function () {
  if (lineNo == medisArray.length - 1 && audio.currentTime.toFixed(3) >= parseFloat(medisArray[lineNo].t)) {
    lineHeight(lineNo);
  }
  if (parseFloat(medisArray[lineNo].t) <= audio.currentTime.toFixed(3) &&
    audio.currentTime.toFixed(3) <= parseFloat(medisArray[lineNo + 1].t)) {
    lineHeight(lineNo);
    lineNo++;
  }
};