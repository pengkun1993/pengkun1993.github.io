var state;
var start_x;
var start_y;
//转换像素到角度
var range_x;
var range_y;

var x_angel;
var y_angle;
$(function(){
	state=0;
	x_angel=0;
	y_angle=0;
	$(document).mousedown(function(e){
		e.preventDefault();
		if(state==0){
			state=1;
			start_x=e.pageX;
			start_y=e.pageY;
		}
	});
	$(document).mouseup(function(e){
		e.preventDefault();
		state=0;
	});
	$(document).mousemove(function(e){
		e.preventDefault();
		if(state==1){
			rotate_square(e.pageX,e.pageY);	
		}
	});
	$(document).mouseout(function(e){
		e.preventDefault();
		state=0;
	});
	document.addEventListener('touchstart',function(e){
		e.preventDefault();
		if(state==0){
			state=1;
			start_x=e.touches[0].pageX;
			start_y=e.touches[0].pageY;
		}
	});
	document.addEventListener('touchmove',function(e){
		e.preventDefault();
		if(state==1){
			rotate_square(e.touches[0].pageX,e.touches[0].pageY);	
		}
	});
	document.addEventListener('touchend',function(e){
		e.preventDefault();
		state=0;
	});
});
function rotate_square(x,y){
	var del_x=(x-start_x);
	var del_y=(y-start_y);
	
	x_angel+=del_x;
	y_angle+=del_y;
	$('#square').css({'transform':'rotateY('+ x_angel +'deg) rotateX('+ y_angle +'deg) '});
	start_x=x;
	start_y=y;
}