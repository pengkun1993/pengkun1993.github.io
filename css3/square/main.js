var mouse_state=0;
var lastpoint;
var rotate={x:0,y:0};
$(function(){
	$("#range").change(function(){
		$('#num').text($(this).val());
		$('.wraper').css('transform','rotateZ('+$(this).val()+'deg)')
	});
	//禁止选中文字
	$('.square').each(function(i,e){
		e.onselectstart=function(){
			return false;
		};
	});
	//鼠标事件
	$(document).mousedown(function(e){
		e.preventDefault();
		mouse_state=1;
		lastpoint={x:e.clientX,y:e.clientY};
	});
	$(document).mousemove(function(e){
		e.preventDefault();
		if (mouse_state==1) {
			var curpoint={x:e.clientX,y:e.clientY};
			rotateSquare(curpoint);
		}
	});
	$(document).mouseup(function(e){
		e.preventDefault();
		mouse_state=0;
	});
	//触控事件
	$(document).on('touchstart',function(e) {
		mouse_state=1;
		lastpoint={x:e.touches[0].clientX,y:e.touches[0].clientY};
	});
	$(document).on('touchmove',function(e) {
		if (mouse_state==1) {
			var curpoint={x:e.touches[0].clientX,y:e.touches[0].clientY};
			rotateSquare(curpoint);
		}
	});
	$(document).on('touchend',function(e) {
		mouse_state=0;
	});
	//随机旋转
	$('#rotatebtn').click(function(){
		var timer=setInterval(function() {
			rotate.x+=1000*Math.random();
			rotate.y+=1000*Math.random();
			$('.wraper').css('transform','rotateX('+-1*rotate.y*0.1+'deg) rotateY('+rotate.x*0.1+'deg)');
		},10);
		setTimeout(function() {
			clearInterval(timer);
		},1000);
	});
});
function rotateSquare($curpoint) {
	rotate.x+=$curpoint.x-lastpoint.x;
	rotate.y+=$curpoint.y-lastpoint.y;
	$('.wraper').css('transform','rotateX('+-1*rotate.y*0.1+'deg) rotateY('+rotate.x*0.1+'deg');
	lastpoint=$curpoint;
}