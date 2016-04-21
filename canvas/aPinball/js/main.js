var can;
var ctx;
var boll;
window.onload=function(){
	can=document.getElementById('canvas');alert(can);
	ctx=can.getContext('2d');
	boll={x:400,y:100,r:10,g:2,vx:-3,vy:0,color:"blue"};
	drawBoll();
}
function drawBoll(){
	window.requestAnimFrame(
		function(){
			drawBoll();
			update();
		});
	ctx.clearRect(0,0,can.width,can.height);
	ctx.beginPath();
	ctx.arc(boll.x,boll.y,boll.r,0,2*Math.PI);
	ctx.fillStyle=boll.color;
	ctx.fill();
	ctx.stroke();
}
function update() {
	boll.x+=boll.vx;
	boll.y+=boll.vy;
	if(boll.x < (0+boll.r) || boll.x > (can.width-boll.r)){
		boll.vx=-boll.vx;
	}
	if(boll.y > (can.height-boll.r) || boll.y < (0+boll.r)){
		boll.vy=-boll.vy;
	}
	boll.vy+=boll.g;
	if((boll.y+boll.vy)>can.height-boll.r && boll.y>can.height-boll.r){
		boll.g=0;
		boll.vy=0;
		boll.y=can.height-boll.r;
	}
}
window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
			return window.setTimeout(callback, 1000 / 60);
		};
})();