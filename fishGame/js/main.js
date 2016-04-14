//全局变量定义
var can1;
var can2;
var ctx1;
var ctx2;
var canW;
var canH;
var gameOver;
var bgPic = new Image();
//帧与帧时间间隔
var lastTime;
var deltaTime;
//实物对象
var ane; //海葵
var fruit;
var mom;
var baby;
var data;
var wave;
var dust;
//鼠标指针
var mx;
var my;
//变幻的鱼
var momBodyOrg = [];
var momBodyBlue = [];
var momTail = [];
var momEye = [];
var babyFade = []
var babyTail = [];
var babyEye = [];
var dustPic=[];
//函数运行入口
window.onload = init;

function init() {
	can1 = document.getElementById('canvas1');
	can2 = document.getElementById('canvas2');
	ctx1 = can1.getContext("2d"); //背景、海葵、食物、
	ctx2 = can2.getContext("2d"); //鱼、圈圈
	can2.addEventListener('mousemove', onMouseMove, false);
	canW = can1.width;
	canH = can1.height;
	bgPic.src = "src/background.jpg";
	gameOver = false;
	//对象实例化
	ane = new aneObj();
	ane.init();
	fruit = new fruitObj();
	fruit.init();
	mom = new momObj();
	mom.init();
	baby = new babyObj();
	baby.init();
	data = new dataObj();
	wave = new waveObj();
	wave.init();
	dust =new dustObj();
	dust.init()
	//文字样式
	ctx2.font = "25px verdana";
	ctx2.textAlign = "center";
	ctx2.shadowBlur=20;
	ctx2.shadowColor="white";

	//侦听、获取鼠标位置初始化在画布中央
	mx = canW * 0.5;
	my = canH * 0.5;
	//变幻鱼的变量
	for (var i = 0; i < 8; i++) {
		momBodyOrg[i] = new Image();
		momBodyOrg[i].src = "src/bigSwim" + i + ".png";
		momTail[i] = new Image();
		momTail[i].src = "src/bigTail" + i + ".png";
		momBodyOrg[i] = new Image();
		momBodyOrg[i].src = "src/bigSwim" + i + ".png";
		momBodyBlue[i] = new Image();
		momBodyBlue[i].src = "src/bigSwimBlue" + i + ".png";
		babyTail[i] = new Image();
		babyTail[i].src = "src/babyTail" + i + ".png";

	}
	for (var i = 0; i < 2; i++) {
		momEye[i] = new Image();
		momEye[i].src = "src/bigEye" + i + ".png";
		babyEye[i] = new Image();
		babyEye[i].src = "src/babyEye" + i + ".png";
	}
	for (var i = 0; i < 20; i++) {
		babyFade[i] = new Image();
		babyFade[i].src = "src/babyFade" + i + ".png";
	}
	for(var i=0;i<7;i++){
		dustPic[i]=new Image();
		dustPic[i].src="src/dust"+i+".png";
	}
	//循环帧
	lastTime = Date.now();
	gameloop();
}
//无限循环刷新函数
function gameloop() {
	window.requestAnimFrame(gameloop);
	//计算帧之间时间间隔
	var Now = Date.now();
	deltaTime = Now - lastTime;
	lastTime = Now;
	//需不断绘制的内容
	drawBackground();
	ane.draw();
	fruitNum();
	fruit.draw();
	ctx2.clearRect(0, 0, canW, canH);
	mom.draw();
	baby.draw();
	if (!gameOver) {
		momFruitsCollision();
		momBabyCollision();
	}
	data.draw();
	wave.drawCircle();
	dust.draw();
}
//侦听鼠标位置方法
function onMouseMove(event) {
	if (gameOver) {
		return;
	}
	if (event.offSetX || event.layerX) {
		mx = event.offSetX == undefined ? event.layerX : event.offSetX;
		my = event.offSetY == undefined ? event.layerY : event.offSetY;
	}
}