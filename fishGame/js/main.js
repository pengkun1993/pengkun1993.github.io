//全局变量定义
var can1;
var can2;
var ctx1;
var ctx2;
var canW;
var canH;
var bgPic=new Image();

var lastTime;
var deltaTime;

var ane;
//函数运行入口
window.onload=init;
function init(){
	can1=document.getElementById('canvas1');
	can2=document.getElementById('canvas2');
	ctx1=can1.getContext("2d");//背景、海葵、
	ctx2=can2.getContext("2d");//小鱼、食物、圈圈
	canW=can1.width;
	canH=can1.height;
	ane=new aneObj();ane.init();
	bgPic.src="src/background.jpg";
	lastTime=Date.now();
	gameloop();
	ane.draw();
}
//无限循环刷新函数
function gameloop() {
	window.requestAnimFrame(gameloop);
	var Now=Date.now();
	deltaTime=Now-lastTime;
	lastTime=Now;
	drawBackground();

}
