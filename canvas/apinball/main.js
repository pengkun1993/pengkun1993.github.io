var can,
ctx,
scr_width=document.body.clientWidth,
scr_height=document.body.clientHeight,
ball,
time=10,
timer,
is_trail=0,//是否显示轨迹，1显示0不显示
stop_state=0,//记录相同位置次数，大于5则停止
lasttime_y,//记录上次y方向位置
rub_force=0.001;//摩擦系数，为1摩擦无限大

window.onload=init();
function init($vx=20,$vy=0,$g=10,$radius=20) {
	can=document.getElementById('canvas');
	ctx=can.getContext('2d');
	//适应手机屏幕
	if(scr_width<=1024){
		can.width=scr_width*0.8;
	}else{
		can.width=scr_width*0.5;
	}
	can.height=scr_height*0.6;
	
	ball={x:20,y:20,r:$radius,vx:$vx,vy:$vy,g:$g,color:'#000'}
	timer=setInterval(function(){
		drawBall();
		updateBall();
	},time);
	
}
function drawBall() {
	if(is_trail==0){
		ctx.clearRect(0,0,can.width,can.height);
	}
	ctx.beginPath();
	ctx.arc(ball.x,ball.y,ball.r,0,2*Math.PI);
	ctx.fillStyle=ball.color;
	ctx.fill();
	lasttime_y=ball.y;
	lasttime_vy=ball.vy;
}
function updateBall() {
	ball.vy=ball.vy+ball.g*time/100;
	//摩擦系数
	ball.vy=ball.vy*(1-rub_force);
	ball.vx=ball.vx*(1-rub_force);

	ball.x=ball.x+time/100*ball.vx;
	ball.y=ball.y+time/100*ball.vy;

	if(ball.y>can.height-ball.r){
		ball.y=can.height-ball.r;
		ball.vy=-ball.vy;
	}else if(ball.y < ball.r){
		ball.y=ball.r;
		ball.vy=-ball.vy;
	}
	if(ball.x>=can.width-ball.r){
		ball.x=can.width-ball.r;
		ball.vx=-ball.vx;
	}else if(ball.x<=ball.r){
		ball.x=ball.r;
		ball.vx=-ball.vx
	}console.log(ball.vx);
	//判断是否已经停止运动
	if(lasttime_y==ball.y && Math.abs(ball.vy)<1 && Math.abs(ball.vx)<1){
		stop_state++;
	}else{
		stop_state=0;
	}
	if(stop_state>5){
		clearInterval(timer);
	}
}
function restart() {
	var level_v=document.getElementById('level_v').value;
	var vertical_v=document.getElementById('vertical_v').value;
	var gravity=document.getElementById('gravity').value;
	var radius=document.getElementById('radius').value;
	var irub_force=document.getElementById('rub_force').value;
	var trail=document.getElementById('trail');
	is_trail=trail.value;
	rub_force=irub_force;			
	clearInterval(timer);
	init(parseInt(level_v),parseInt(vertical_v),parseInt(gravity),parseInt(radius));
}
function trailState($this) {
	if($this.value==0){
		$this.value=1;
		$this.style.backgroundColor='green';
	}else{
		$this.value=0;
		$this.style.backgroundColor='grey';
	};
}
//循环帧
window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
			return window.setTimeout(callback, 1000 / 60);
		};
})();