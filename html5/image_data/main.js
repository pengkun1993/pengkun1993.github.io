var can1,
ctx1,
can2,
ctx2,
scr_w=document.body.clientWidth,
scr_h=document.body.clientHeight,
mainpic;
window.onload=init;
function init() {
	can1=document.getElementById('canvas1');
	ctx1=can1.getContext('2d');
	can2=document.getElementById('canvas2');
	ctx2=can2.getContext('2d');console.log(ctx2);
	can1.width=can2.width=scr_w*0.4;
	can1.height=can2.height=scr_h*0.6;

	if(scr_w<=1024){
		can1.width=can2.width=scr_w*0.9;
		can1.height=can2.height=scr_h*0.3;
	}

	mainpic=new Image();
	mainpic.src='main.jpg';
	mainpic.onload=function(){
		ctx1.drawImage(mainpic,0,0,can1.width,can2.width);
	}
}
/**
 * 去除的颜色
 * @param  {obj} $imgdata 像素对象
 * @param  {string} $rc      要去除的颜色
 */
function removeColor($rc) {
	var imgdata=ctx1.getImageData(0,0,can1.width,can1.height);
	var i=0;
	switch($rc){
		case 'r':
			i=0;
			break;
		case 'g':
			i=1;
			break;
		case 'b':
			i=2;
			break;
	}
	for(;i<imgdata.data.length;i+=4){
		imgdata.data[i]=0;
	}
	ctx2.putImageData(imgdata,0,0,0,0,can2.width,can2.height);
}
//反色
function inverseColor() {
	var imgdata=ctx1.getImageData(0,0,can1.width,can1.height);	
	for(var i=0;i<imgdata.data.length;i+=4){
		imgdata.data[i]=255-imgdata.data[i];
		imgdata.data[i+1]=255-imgdata.data[i+1];
		imgdata.data[i+2]=255-imgdata.data[i+2];
		imgdata.data[i+3]=255;
	}
	ctx2.putImageData(imgdata,0,0,0,0,can2.width,can2.height);
}
//变灰
function toGrey() {
	var imgdata=ctx1.getImageData(0,0,can1.width,can1.height);	
	for(var i=0;i<imgdata.data.length;i+=4){
		var r=imgdata.data[i];
		var g=imgdata.data[i+1];
		var b=imgdata.data[i+2];

		var grey=0.4*r+0.4*g+0.2*b;

		imgdata.data[i]=grey;
		imgdata.data[i+1]=grey;
		imgdata.data[i+2]=grey;
	}
	ctx2.putImageData(imgdata,0,0,0,0,can2.width,can2.height);
}
// 黑白
function blackWhite() {
	var imgdata=ctx1.getImageData(0,0,can1.width,can1.height);	
	for(var i=0;i<imgdata.data.length;i+=4){
		var r=imgdata.data[i];
		var g=imgdata.data[i+1];
		var b=imgdata.data[i+2];

		var grey=0.4*r+0.4*g+0.2*b;

		var v;
		if(grey<255/2){
			v=0;
		}else{
			v=255
		}
		imgdata.data[i]=v;
		imgdata.data[i+1]=v;
		imgdata.data[i+2]=v;
	}
	ctx2.putImageData(imgdata,0,0,0,0,can2.width,can2.height);
}
// 模糊
function toBlur() {
	var imgdata=ctx1.getImageData(0,0,can1.width,can1.height);	
	for(var i=1;i<can1.height;i++){
		for(var j=1;j<can1.width;j++){
			var r=0;
			var g=0;
			var b=0;
			for(dx=-1;dx<=1;dx++){
				for(dy=-1;dy<=1;dy++){
					var x=i+dx;
					var y=i+dy;
					var n=x*can1.width+y;
					r+=imgdata.data[4*n];
					g+=imgdata.data[4*n+1];
					b+=imgdata.data[4*n+2];
				}
			}
			var t=i*can1.width+y;
			imgdata.data[4*t]=r/9;
			imgdata.data[4*t+1]=g/9;
			imgdata.data[4*t+2]=b/9;
		}
	}
	ctx2.putImageData(imgdata,0,0,0,0,can2.width,can2.height);
}
//马赛克
function toMosaic() {
	var imgdata=ctx1.getImageData(0,0,can1.width,can1.height);	
	var mw=Math.round(can1.width*0.02);
	var mh=Math.round(can1.height*0.02);
	for(var i=0;i<=can1.height-mh;i+=mh){
		for(var j=0;j<=can1.width-mw;j+=mw){
			var r=0;
			var g=0;
			var b=0;
			for(var dx=0;dx<=mw;dx++){
				for(var dy=0;dy<=mh;dy++){
					var x=i+dy;
					var y=j+dx;
					var n=x*can1.width+y;
					r+=imgdata.data[4*n];
					g+=imgdata.data[4*n+1];
					b+=imgdata.data[4*n+2];
				}
			}
			var allr=r/(mw*mh);
			var allg=g/(mw*mh);
			var allb=b/(mw*mh);
			for(var tx=0;tx<=mw;tx++){
				for(var ty=0;ty<=mh;ty++){
					var nx=i+ty;
					var ny=j+tx;
					var t=nx*can1.width+ny;
					imgdata.data[4*t]=allr;
					imgdata.data[4*t+1]=allg;
					imgdata.data[4*t+2]=allb;
				}
			}
			
		}
	}
	ctx2.putImageData(imgdata,0,0,0,0,can2.width,can2.height);
}
//底片
function toNevigate(){
	var imgdata=ctx1.getImageData(0,0,can1.width,can1.height);	
	for(var i=0;i<imgdata.data.length;i+=4){
		var r=imgdata.data[i];
		var g=imgdata.data[i+1];
		var b=imgdata.data[i+2];
		

		imgdata.data[i]=255-r;
		imgdata.data[i+1]=255-g;
		imgdata.data[i+2]=255-b;
		imgdata.data[i+3]=155;
	}
	ctx2.putImageData(imgdata,0,0,0,0,can2.width,can2.height);
}