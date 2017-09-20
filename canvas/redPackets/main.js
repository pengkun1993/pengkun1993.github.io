var canw=window.innerWidth>800 ? 600 : window.innerWidth;
var canh=window.innerWidth>800 ? 800 : window.innerHeight;
var can;
var ctx;
var image=new Image();
var radius;
if(window.innerWidth>600){
	radius=40;
}else{
	radius=30;
}
var clipg={x:Math.random()*(canw-2*radius)+radius,y:Math.random()*(canh-2*radius)+radius,r:radius};
var timer;
window.onload=function(){
	can=document.getElementById('canvas');
	ctx=can.getContext("2d");

	can.width=canw;
	can.height=canh;

	image.src="img.jpg";
	image.onload=function(){
		
	drawCan();
	}
}
function drawCan(){
	ctx.clearRect(0,0,canw,canh);
	ctx.save();
	ctx.beginPath();
	ctx.arc(clipg.x,clipg.y,clipg.r,0,Math.PI*2);
	ctx.closePath();
	ctx.clip();
	ctx.drawImage(image,0,0,canw,canh);
	ctx.restore();
}
function reset() {
	if(timer){
		clearInterval(timer);
	}
	clipg={x:200,y:200,r:radius};
	clipg.x=Math.random()*(canw-2*radius)+radius;
	clipg.y=Math.random()*(canh-2*radius)+radius;
	drawCan();
}
function show(){
	timer=setInterval(function(){
		clipg.r+=20;
		if(clipg.r>Math.min(canw,canh)*2){
			clearInterval(timer);
		}
		drawCan();
	},20);	

}