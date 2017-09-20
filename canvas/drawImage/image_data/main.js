var can1;
var ctx1;
var can2;
var ctx2;
var canw=window.innerWidth/2*0.95;
var canh=window.innerHeight*0.75;
var image=new Image();
window.onload=function(){
	can1=document.getElementById('can1');
	ctx1=can1.getContext('2d');

	can2=document.getElementById('can2');
	ctx2=can2.getContext('2d');

	can1.width=can2.width=canw;
	can1.height=can2.height=canh;

	image.src="Tulips.jpg";
	image.onload=function(){
		ctx1.drawImage(image,0,0,canw,canh);
	}
}
/*
去红
 */
function redeffect() {
	var imagedata=ctx1.getImageData(0,0,canw,canh);
	var pixelData=imagedata.data;
	for(var i=0;i<canw*canh;i++){
		pixelData[4*i+0]=0;
	}
	ctx2.putImageData(imagedata,0,0,0,0,canw,canh);
}
/*
变灰
 */
function grayeffect() {
	var imagedata=ctx1.getImageData(0,0,canw,canh);
	var pixelData=imagedata.data;
	for(var i=0;i<canw*canh;i++){
		var r=pixelData[4*i+0];
		var g=pixelData[4*i+1];
		var b=pixelData[4*i+2];

		var gray=0.3*r+0.59*g+0.11*b;//计算灰度值，根据不同颜色，按比例调制每个点的灰度

		pixelData[4*i+0]=gray;
		pixelData[4*i+1]=gray;
		pixelData[4*i+2]=gray;		
	}
	ctx2.putImageData(imagedata,0,0,0,0,canw,canh);
}
/*
黑白
 */
function blackeffect() {
	var imagedata=ctx1.getImageData(0,0,canw,canh);
	var pixelData=imagedata.data;
	for(var i=0;i<canw*canh;i++){
		var r=pixelData[4*i+0];
		var g=pixelData[4*i+1];
		var b=pixelData[4*i+2];
		var v;
		var gray=0.3*r+0.59*g+0.11*b;
		if(gray > 255/2){//根据灰度划分黑或白
			v=255;
		}else{
			v=0;
		}
		
		pixelData[4*i+0]=v;
		pixelData[4*i+1]=v;
		pixelData[4*i+2]=v;		
	}
	ctx2.putImageData(imagedata,0,0,0,0,canw,canh);
}
/*
反色
 */
function contraryeffect() {
	var imagedata=ctx1.getImageData(0,0,canw,canh);
	var pixelData=imagedata.data;
	for(var i=0;i<canw*canh;i++){
		var r=pixelData[4*i+0];
		var g=pixelData[4*i+1];
		var b=pixelData[4*i+2];
		
		pixelData[4*i+0]=255-r;
		pixelData[4*i+1]=255-g;
		pixelData[4*i+2]=255-b;		
	}
	ctx2.putImageData(imagedata,0,0,0,0,canw,canh);
}
/*
模糊
 */
function blureffect() {
	var imagedata=ctx1.getImageData(0,0,canw,canh);
	var pixelData=imagedata.data;
	for(var i=1;i<canh;i++){
		for (var j = 1; j < canw; j++) {
			var r=0;
			var g=0;
			var b=0;
			for(var dx=-1;dx<=1;dx++){
				for(var dy=-1;dy<=1;dy++){
					var x=i+dx;
					var y=j+dy;
					var n=x*canw+y;
					r+=pixelData[4*n+0];
					g+=pixelData[4*n+1];
					b+=pixelData[4*n+2];
				}
			}
		var t=i*canw+j;	
		pixelData[4*t+0]=r/9;
		pixelData[4*t+1]=g/9;
		pixelData[4*t+2]=b/9;
		}
	}
	ctx2.putImageData(imagedata,0,0,0,0,canw,canh);
}
/*
马赛克
 */
function mosaiceffect() {
	var imagedata=ctx1.getImageData(0,0,can1.width,can1.height);
	var pixelData=imagedata.data;
	/*马赛克方框的大小*/
	var size=16;
	var totalsize=size*size;
	for(var i=1;i<(canh+size);i+=size){
		for(var j=1;j<canw;j+=size){
			var r=0;
			var g=0;
			var b=0;
			for(var dx=0;dx<size;dx++){
				for(var dy=0;dy<size;dy++){
					var x=i+dx;
					var y=j+dy;
					var n=x*canw+y;
					r+=pixelData[4*n+0];
					g+=pixelData[4*n+1];
					b+=pixelData[4*n+2]
				}
			}
			var allr=r/totalsize;
			var allg=g/totalsize;
			var allb=b/totalsize;
			for(var tx=0;tx<size;tx++){
				for(var ty=0;ty<size;ty++){
					var nx=i+tx;
					var ny=j+ty;
					var t=nx*canw+ny;
					pixelData[4*t+0]=allr;
					pixelData[4*t+1]=allg;
					pixelData[4*t+2]=allb;
				}
			}
		}
	}
	ctx2.putImageData(imagedata,0,0,0,0,can2.width,canh);
}