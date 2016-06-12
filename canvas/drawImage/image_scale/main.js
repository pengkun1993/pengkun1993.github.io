var can;
var waterMarkCan;//水印画布
var ctx;
var waterMarkCtx;
var range;
var canW=800;
var canH=600;
var wmcanW=300;
var wmcanH=50;
var image=new Image();
window.onload=function(){
	//全局变量赋值
	can=document.getElementById('canvas');
	ctx=can.getContext('2d');
	waterMarkCan=document.getElementById('waterMark');
	waterMarkCtx=waterMarkCan.getContext('2d');
	range=document.getElementById('range');

	can.width=canW;
	can.height=canH;
	waterMarkCan.width=wmcanW;
	waterMarkCan.height=wmcanH;
	range.style.width=can.width+"px";

	image.src="background.jpg";

	//绘制水印
	drawWaterMark();
	//绘制图像
	image.onload=function(){
		drawImageByScale(range.value);
		range.onmousemove=function(){
			scale=range.value;
			//按倍数放大缩小图画
			drawImageByScale(scale);
		}
	}
}
/**
 * 按比例缩放图像
 * @param  {float} scale 缩放比例
 */
function drawImageByScale(scale) {
	imageW=can.width*scale;
	imageH=can.height*scale;

	dx=(can.width-imageW)/2;
	dy=(can.height-imageH)/2;
	ctx.clearRect(0,0,can.width,can.height);
	ctx.drawImage(image,dx,dy,imageW,imageH);
	ctx.drawImage(waterMarkCan,can.width-waterMarkCan.width,can.height-waterMarkCan.height);
}
/**
 * 绘制水印文字
 */
function drawWaterMark() {

	waterMarkCtx.save();
	waterMarkCtx.font="40px Arial";
	waterMarkCtx.fillStyle = "rgba(255 , 255 , 255,0.5)";
	waterMarkCtx.textBaseLine="middle";
	waterMarkCtx.fillText("==@pengkun==",0,35);
	waterMarkCtx.restore();
}