var con;
var ctx;

var w;
var h;

var girlPic=new Image();
var starPic=new Image();

var num=60;
var stars=[];

var lastTime;
var deltaTime;

var switchy;
var life=0;
function init(){
	con=document.getElementById('canvas');
	ctx=con.getContext("2d");
	w=con.width;
	h=con.height;
	girlPic.src="src/girl.jpg";
	starPic.src="src/star.png";
	for(var i=0;i<num;i++){
		var Obj=new starObj();
		stars.push(Obj);
		stars[i].init();
	}
	document.addEventListener("mousemove",mousemove,false);
	lastTime=Date.now();
	loop();
}
document.body.onload=init();
function loop(){
	window.requestAnimFrame(loop);
	var now=Date.now();
	deltaTime=now-lastTime;
	lastTime=now;
	drawBackground();
	drawGirl();
	drawStars();
	starLife();
}
function drawBackground(){
	ctx.fillStyle="#020050";
	ctx.fillRect(0,0,w,h);
}
function drawGirl() {
	ctx.drawImage(girlPic,100,150,600,300);
}
function mousemove(event) {
	var x=event.offsetX==undefined ? event.layerX :event.offsetX;
	var y=event.offsetY==undefined ? event.layerY :event.offsetY;
	if(x>100 && x<700 && y>150 && y<450){
		switchy=true;
	}else{
		switchy=false;
	}
}