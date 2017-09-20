var can;
var ctx;
var canW=800;
var canH=600;
var image=new Image();
window.onload=function(){
	//全局变量赋值
	can=document.getElementById('canvas');
	ctx=can.getContext('2d');

	can.width=canW;
	can.height=canH;

	image.src="background.jpg";

	//绘制图像
	image.onload=function(){
		ctx.drawImage(image,0,0,can.width,can.height);
	}
}