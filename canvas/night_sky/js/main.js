var can;
var ctx;
var starsNum;
var starR;
var starL;
var circleX;
var circleY;
var moonr;
var moonR;
//赋值全局变量
function init(){
	can = document.getElementById('canvas');
	ctx=can.getContext("2d");
	can.width=document.body.clientWidth;
	can.height=document.body.clientHeight;
	//星星参数
	starsNum=300;//星星数量
	starR=5;//五角星內圆半径
	starL=5;//五角星外圆半径减去內圆半径所得

	//月亮参数
	moonX=can.width*0.7;
	moonY=can.height*0.3;//两个决定月亮位置的变量
	moonr=100;//月亮外圆小半径
	moonR=120;//月亮内圆大半径，小于moonr则呈现一个半圆，moonr+1月牙
	moonA=30;//月亮倾斜角度
}

window.onload=function(){
	init();
	drawSky();
	//生成一片星星
	for(var i=0;i<starsNum;i++){
		var x=Math.random()*can.width;
		var y=Math.random()*can.height*0.6;
		var angle=Math.random()*72;
		drawStar(x,y,angle);
	}
	//生成一个月亮
	drawMoon(moonX,moonY,moonA);
	//绿地
	drawLand();
	//文字
	writeText();
}

//绘制夜空
function drawSky(){
	ctx.beginPath();
	ctx.save();
	var grd = ctx.createRadialGradient(can.width/2,can.height,0,can.width/2,can.height,can.width/2);
	grd.addColorStop(0,"#464040");
	grd.addColorStop(1,"black");
	ctx.fillStyle=grd;
	ctx.fillRect(0,0,can.width,can.height);
	ctx.restore();
}

//生成星星位置大小旋转
function drawStar(x,y,angle){
	ctx.save();
	ctx.translate(x,y);
	ctx.rotate(angle/180*Math.PI);
	starPath(starR,starR+starL);
	ctx.fillStyle="#FABC00";
	ctx.strokeStyle="#ffff00";
	ctx.fill();
	ctx.stroke();
	ctx.restore();
}

//绘制单个星星路线
function starPath(r,R){
	ctx.beginPath();
	for(var i=0;i<5;i++){
		ctx.lineTo(	 R*Math.cos((18+72*i)/180*Math.PI),
					-R*Math.sin((18+72*i)/180*Math.PI)
				);//大圆上的5个点
		ctx.lineTo(	r*Math.cos((54+72*i)/180*Math.PI),
					-r*Math.sin((54+72*i)/180*Math.PI)
				);//小圆上的5个点
	}
}

//生成月亮路径
function moonPath(r,R) {
	ctx.beginPath();
	//控制点距离外圆圆心长度
	var moonL=Math.pow(r,2)/Math.pow(
		Math.pow(R,2)-Math.pow(r,2),
		1/2);//L=(r^2)/(R^2-r^2)^(1/2)
	ctx.arc(0,0,r,0.5*Math.PI,1.5*Math.PI,true);
	ctx.moveTo(0,0-r);
	ctx.arcTo(0+moonL,0,0,0+r,R);	
}

//绘制月亮
function drawMoon(x,y,angle) {
	ctx.save();
	ctx.translate(x,y);
	ctx.rotate(angle/180*Math.PI);
	moonPath(moonr,moonR);
	ctx.strokeStyle="yellow";
	ctx.fillStyle="yellow";
	ctx.fill();
	ctx.stroke();
	ctx.restore();
}

//绘制绿地
function drawLand() {
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(0,can.height*0.7);
	ctx.bezierCurveTo(0.3*can.width,0.5*can.height,0.7*can.width,0.85*can.height,can.width,can.height*0.7);
	ctx.lineTo(can.width,can.height);
	ctx.lineTo(0,can.height);
	ctx.closePath();

	var landStyle=ctx.createLinearGradient(0,can.height,0,0);
	landStyle.addColorStop(0,"#035803");
	landStyle.addColorStop(1,"#033E03");
	ctx.fillStyle=landStyle;

	ctx.fill();
	ctx.stroke();
	ctx.restore();
}

//添加文字
function writeText(){
	ctx.save();
	ctx.font="bold 40px verdana";
	var text="家乡的夜空";

	var textWidth=ctx.measureText(text).width;
	var textStyle=ctx.createLinearGradient(0.1*can.width,0.8*can.height,0.1*can.width+textWidth,0.8*can.height)
	textStyle.addColorStop(0,"red");
	textStyle.addColorStop(0.5,"white");
	textStyle.addColorStop(1,"yellow");
	ctx.fillStyle=textStyle;

	ctx.shadowColor="green";
	ctx.shadowBlur=0;
	ctx.shadowOffsetX=5;
	ctx.shadowOffsetY=5;

	ctx.fillText(text,0.1*can.width,0.8*can.height);
	ctx.restore();
}