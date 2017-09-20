var can;
var magnifireCan;
var magnifireCtx;
var ctx;
var canW=800;
var canH=600;
var ismousedown=false;
var scale;
var image=new Image();
window.onload=function(){
	//全局变量赋值
	can=document.getElementById('canvas');
	ctx=can.getContext('2d');
	magnifireCan=document.getElementById('magnifire');
	magnifireCtx=magnifireCan.getContext('2d');

	can.width=canW;
	can.height=canH;

	image.src="background.jpg";
	//绘制图像
	image.onload=function(){
		magnifireCan.width=image.width;
		magnifireCan.height=image.height;
		scale=magnifireCan.width/can.width;
		ctx.drawImage(image,0,0,can.width,can.height);
		magnifireCtx.drawImage(image,0,0);
	}
	//鼠标事件
	can.onmousedown=function(e){
		e.preventDefault();
		ismousedown=true;
		var point=windowTocanvas(e.clientX,e.clientY);
		drawImageByMagnifire(true,point);
	}
	can.onmouseup=function(e){
		e.preventDefault();
		ismousedown=false;
		drawImageByMagnifire(false);		
	}

	can.onmouseout=function(e){
		e.preventDefault();
		ismousedown=false;
		drawImageByMagnifire(false);		
	}

	can.onmousemove=function(e){
		e.preventDefault();
		if(ismousedown){
			var point=windowTocanvas(e.clientX,e.clientY);
			drawImageByMagnifire(true,point);					
		}
	}
}
function drawImageByMagnifire(isshowmagnifire,point){
	ctx.clearRect(0,0,can.width,can.width);
	ctx.drawImage(image,0,0,can.width,can.height);
	if(isshowmagnifire){
		drawMagnifire(point);
	}
	
}
function drawMagnifire(point){
	//获取大图上相对应的圆心坐标
	var cx=point.x*scale;
	var cy=point.y*scale;
	var cr=150;
	var sx=cx-cr;
	var sy=cy-cr;
	var dx=point.x-cr;
	var dy=point.y-cr;
	//添加圆形剪辑区域
	ctx.save();

	ctx.strokeStyle="green";
	ctx.lineWidth="10";

	ctx.beginPath();
	ctx.arc(point.x,point.y,cr,0,2*Math.PI);
	ctx.stroke();

	ctx.clip();

	ctx.drawImage(magnifireCan,sx,sy,2*cr,2*cr,dx,dy,2*cr,2*cr);

	ctx.restore();
}
/**
 * 坐标转化为以canvas为基准的坐标
 * @param  {[type]} x 文档横坐标
 * @param  {[type]} y 文档中坐标
 * @return {[type]}   返回一个相对于canvas的坐标点
 */
function windowTocanvas(x,y) {
	var bbox=can.getBoundingClientRect();
	return {x:x-bbox.left,y:y-bbox.top};
}