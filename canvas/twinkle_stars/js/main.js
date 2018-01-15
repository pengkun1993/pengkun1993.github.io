var can,
ctx,
scr_w=document.body.clientWidth,
scr_h=document.body.clientHeight,
ostars=[],
lasttime;
window.onload=init;
function init() {
	can=document.getElementById('canvas');
	ctx=can.getContext('2d');
	can.width=scr_w*0.8;
	can.height=scr_h*0.8;

	if(scr_w<=1024){
		can.width=scr_h*0.8;
		can.height=scr_w*0.8;
		can.style.top=(scr_h-can.height)/2+'px';
		can.style.left=(scr_w-can.width)/2+'px';
	}

	var star_img=new Image();
	star_img.src='images/star.png';
	star_img.onload=function(){
		for(var i=0;i<100;i++){
			var sx=Math.random()*can.width;
			var sy=Math.random()*can.height;
			var svx=(Math.random()-0.5)*can.width*0.001;
			var svy=(Math.random()-0.5)*can.height*0.001;
			var snum=Math.floor(Math.random()*7);
			var slife=1;
			ostars[i]=new starObj(star_img,sx,sy,1,svx,svy,snum,slife);
		}
		lasttime=new Date();
		mainloop();
	}

}
/**
 * 主循环
 */
function mainloop() {
	var nowtime=new Date();
	var deltime=nowtime-lasttime;
	ctx.clearRect(0,0,can.width,can.height);
	for(var i=0;i<ostars.length;i++){
		if(deltime>100){
			ostars[i].now_num++;
			if(ostars[i].now_num>6){
				ostars[i].now_num=0;
			}
			lasttime=nowtime;
		}
		ostars[i].draw(ctx);
		ostars[i].update(can);
	}
	main_timer=window.requestAnimFrame(mainloop);
}
window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
			return window.setTimeout(callback, 1000 / 60);
		};
})();