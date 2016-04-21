window.onload=function(){
	init();
	lastTime=Date.now();
	loop();
}
var can;
var ctx;
var Radius;
var clipX;
var clipY;
var speedX;
var speedY;

var lastTime;
var deltaTime;
function init() {
	can=document.getElementById('canvas');
	ctx=can.getContext("2d");
	can.width=800;
	can.height=600;
	clipX=can.width*0.5;
	clipY=can.height*0.5;//探照灯位置
	speedX=2*Math.random()+2;
	speedY=3;
	Radius=100;//探照灯大小
}
function loop() {
	window.requestAnimFrame(loop);
	var nowTime=Date.now();
	deltaTime=nowTime-lastTime;
	lastTime=nowTime;
	draw();
	move();
}
function draw(){
	
	ctx.beginPath();
	ctx.fillStyle="#000";
	ctx.fillRect(0,0,can.width,can.height);

	ctx.save();

	ctx.beginPath();
	ctx.arc(clipX,clipY,Radius,0,Math.PI*2);
	ctx.fillStyle="#fff";
	ctx.fill();
	ctx.clip();

	ctx.font="bold 40px verdana";
	ctx.textAlign="center";
	ctx.textBaseLine="middle";
	ctx.fillStyle="blue";
	ctx.fillText("探照灯探照灯c",can.width*0.5,0.2*can.height);
	ctx.fillText("探照灯探照灯a",0.5*can.width,0.5*can.height);
	ctx.fillText("探照灯探照灯b",0.5*can.width,0.8*can.height);

	ctx.restore();
}
//移动探照灯口
function move(){
	clipX+=speedX;
	clipY+=speedY;
	if(clipX < Radius || clipX > can.width-Radius ){
		speedX=-speedX;
	}
	if(clipY < Radius || clipY > can.height-Radius){
		speedY=-speedY;
	}
}

//循环调用函数
window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
			return window.setTimeout(callback, 1000 / 60);
		};
})();