window.onload=function(){
	init();
	loopPage();//循环函数
}
//定义全局变量
var can;
var ctx;
var ballNum;
var balls=[];
var RADIUS;
var SPEED;
var ANGLE;
var styleI;
var style;
var istyle;
//全局变量赋值
function init() {
	can=document.getElementById('canvas');
	istyle=document.getElementById('style');
	ctx=can.getContext("2d");
	can.width = 800;
	can.height = 600;
	ballNum=150;//小球个数
	RADIUS=40;//改变小球的大小
	SPEED=10;//改变小球的运动速度
	ANGLE=1;//修改小球透明度，0~1
	//修改小球样式
	styleI=0;
	style=["xor","source-over","destination-over","lighter"];
	//定义小球位置
	addBalls();
}
//循环刷新函数
function loopPage(){
	window.requestAnimFrame(loopPage);
	drawBalls();
	updateBalls();
	outPut();//输出样式
}
//绘制一个单位圆路径
function aballPath() {
	ctx.beginPath();
	ctx.arc(0,0,1,0,2*Math.PI);
	ctx.closePath();
}
//生成单个球
function drawBall(x,y,r,fill_color) {
	ctx.save();

	ctx.translate(x,y);
	ctx.scale(r,r);

	ctx.globalCompositeOperation=style[styleI];

	aballPath();

	ctx.fillStyle=fill_color;
	ctx.fill();
	ctx.restore();
}
	
//定义n个各异小球
function addBalls(){
	var r
	var x
	var y
	var vx
	var vy
	var R
	var G
	var B
	var color
	for(var i=0;i<ballNum;i++){
		r=Math.random()*RADIUS+20;
		x=Math.random()*can.width+r;
		x = x > can.width-r ? x-2*r : x;
		y=Math.random()*can.height+r;
		y = y > can.height-r ? y-2*r : y;
		vx=(Math.random()-0.5)*SPEED;
		vy=(Math.random()-0.5)*SPEED;
		R=parseInt(Math.random()*256);
		G=parseInt(Math.random()*256);
		B=parseInt(Math.random()*256);
		color="rgba("+R+","+G+","+B+","+ANGLE+")";
		balls[i]={x:x,y:y,r:r,vx:vx,vy:vy,color};
	}
}
//生成n个小球
function drawBalls(){
	ctx.clearRect(0,0,can.width,can.height);
	for(var i=0;i<ballNum;i++){
		drawBall(balls[i].x,balls[i].y,balls[i].r,balls[i].color);
	}
}
//更新小球位置
function updateBalls() {
	for(var i=0;i<ballNum;i++){
		balls[i].x+=balls[i].vx;
		balls[i].y+=balls[i].vy;
		if(balls[i].x < balls[i].r || balls[i].x > can.width-balls[i].r){
			balls[i].vx=-balls[i].vx;
		}
		if(balls[i].y < balls[i].r || balls[i].y > can.height-balls[i].r){
			balls[i].vy=-balls[i].vy;
		}
	}
}
//循环帧
window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
			return window.setTimeout(callback, 1000 / 60);
		};
})();
//改变样式
function changeStyle() {
	styleI++;
	if(styleI>=style.length){
		styleI=0;
	}
}
//输出style
function outPut(){
	istyle.innerHTML="当前样式："+style[styleI];
}