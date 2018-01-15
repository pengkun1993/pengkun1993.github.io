var can,
ctx,
scr_w=document.body.clientWidth,
scr_h=document.body.clientHeight;
window.onload=init;
function init() {
	can=document.getElementById('canvas');
	ctx=can.getContext('2d');
	can.width=scr_w*0.8;
	can.height=scr_h*0.8;

	//手机适应
	if(scr_w<=1024){
		can.width=scr_h*0.8;
		can.height=scr_w*0.8;
		can.style.top=(scr_h-scr_w*0.8)/2+'px';
		can.style.left=(scr_w-scr_h*0.8)/2+'px';
	}

	drawsky();
	drawland();
	drawtext();

	var Radius=Math.min(can.height,can.width)*0.01;//五角星外接圆半径
	var radius=Math.min(can.height,can.width)*0.005;//五角星内接圆半径
	//月亮相关参数
	var moon_x=can.width*0.8;
	var moon_y=can.height*0.15;
	var moon_R=can.height*0.1;
	var moon_r=can.height*0.12;
	for (var i = 0; i < 300; i++) {
		var rx=Math.random()*can.width;
		var ry=Math.random()*can.height*0.5;
		if(rx>=moon_x-moon_R*2 && rx<=moon_x+moon_R*2 && ry >= moon_y-moon_R*2 && ry<=moon_y+moon_R*2){

		}else{
			var ostar=new starObj(rx,ry,Radius,radius);
			ostar.draw(ctx);
		}
	}

	var omoon=new moonObj(moon_x,moon_y,moon_R,moon_r,30);
	omoon.draw(ctx);
}
//描绘夜空
function drawsky() {
	ctx.save();
	ctx.beginPath();
	var grd=ctx.createRadialGradient(can.width/2,can.height,0,can.width/2,can.height,can.width/2);
	grd.addColorStop(0,'#3f3f3f');
	grd.addColorStop(1,'#000');
	ctx.fillStyle=grd;
	ctx.fillRect(0,0,can.width,can.height);
	ctx.restore();
}
//描绘绿地
function drawland() {
	ctx.save();
	ctx.beginPath();
	ctx.moveTo(0,can.height*0.7);
	ctx.bezierCurveTo(can.width*0.2,can.height*0.5,can.width*0.6,can.height*0.9,can.width,can.height*0.7);
	ctx.lineTo(can.width,can.height);
	ctx.lineTo(0,can.height);
	ctx.closePath();
	ctx.fillStyle='#146114';
	ctx.fill();
	ctx.restore();
}
//添加文本
function drawtext() {
	ctx.save();
	var grd=ctx.createLinearGradient(can.width*0.1,can.height*0.8,can.width*0.3,can.height*0.8);
	grd.addColorStop(0,'red');
	grd.addColorStop(0.5,'#fff');
	grd.addColorStop(1,'yellow');
	ctx.fillStyle=grd;
	ctx.font= can.width*0.2/5+'px Arial';
	ctx.fillText('家乡的夜空',can.width*0.1,can.height*0.8);
	ctx.restore();
}