var can,
ctx,
scr_w=document.body.clientWidth,
scr_h=document.body.clientHeight,
balls=[],
style=['source-over','destination-over','lighter','xor'],
style_i=0,
MAX_NUM=150;

window.onload=init;
/**
 * 初始化
 */
function init(){
	can=document.getElementById('canvas');
	ctx=can.getContext('2d');
	if(scr_w<=1024){
		can.width=scr_w*0.8;
		can.height=scr_h*0.6;
	}else{
		can.width=scr_w*0.6;
		can.height=scr_h*0.8;	
	}
	for(var i=0;i<MAX_NUM;i++){
		balls[i]=creatBall();
	}
	mainLoop();
}
/**
 * 主循环
 */
function mainLoop(){
	window.requestAnimFrame(mainLoop);
	ctx.clearRect(0,0,can.width,can.height);
	for(var i=0;i<balls.length;i++){
		balls[i].update(can);
		balls[i].draw(ctx,style[style_i]);
	}
}
/**
 * 产生一个小球
 * @return {obj}
 */
function creatBall(){
	var x=Math.random()*can.width;
	var y=Math.random()*can.height;
	var r=(Math.random()*0.5+0.5)*Math.min(can.height,can.width)*0.1;
	var vx=(Math.random()-0.5)*Math.min(can.height,can.width)*0.02;
	var vy=(Math.random()-0.5)*Math.min(can.height,can.width)*0.02;
	var cR=parseInt(Math.random()*255);
	var cG=parseInt(Math.random()*255);
	var cB=parseInt(Math.random()*255);
	var color='rgb('+cR+','+cG+','+cB+')';
	var aball=new aballObj(x,y,r,vx,vy,color);
	return aball;
}
function changeStyle($this) {
	style_i=parseInt($this.value);
	var btns=document.getElementsByTagName('button');
	for(var i=0;i<btns.length;i++){
		btns[i].setAttribute('class','style_btn');
	}
	$this.setAttribute('class','style_btn active');
}
//循环帧
window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
			return window.setTimeout(callback, 1000 / 60);
		};
})();