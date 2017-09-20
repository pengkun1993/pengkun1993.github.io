var can;
var ctx;
var r;
var curLeftTime;
var balls=[];
var marginTop;
var marginLeft;
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];
window.onload=function(){	
	can=document.getElementById('canvas');
	ctx=can.getContext("2d");
	can.width=document.body.clientWidth;
	can.height=document.body.clientHeight;
	marginTop=can.height/5;//小球顶部距离
	marginLeft=can.width/10;//小球左边距
	r=(can.width/5)*4/110-1;//小球的半径
	curLeftTime=getLeftTime();
	setInterval(
		function(){
			leftTime();
			update();
			},
		100
		);
}
//剩余时间展示
function leftTime(){
	var curHour=parseInt(curLeftTime/3600);
	var curMinites=parseInt((curLeftTime-curHour*3600)/60);
	var curSecond=parseInt(curLeftTime%60);
	ctx.clearRect(0,0,can.width,can.height);
	drawCircle(curHour/10,marginLeft,marginTop);
	drawCircle(curHour%10,marginLeft+15*(r+1),marginTop);
	drawCircle(10,marginLeft+30*(r+1),marginTop);
	drawCircle(curMinites/10,marginLeft+40*(r+1),marginTop);
	drawCircle(curMinites%10,marginLeft+55*(r+1),marginTop);
	drawCircle(10,marginLeft+70*(r+1),marginTop);
	drawCircle(curSecond/10,marginLeft+80*(r+1),marginTop);
	drawCircle(curSecond%10,marginLeft+95*(r+1),marginTop);

	for(var i=0;i<balls.length;i++){
		ctx.beginPath();
		ctx.arc(balls[i].x,balls[i].y,r,0,2*Math.PI);
		ctx.fillStyle=balls[i].color;
		ctx.fill();
	}
}
//获取倒计时秒数
function getLeftTime(){
	var nowTime=new Date();
	var ret=nowTime.getHours()*3600+nowTime.getMinutes()*60+nowTime.getSeconds();//获取当前时间的秒数
	return ret;
}
//画小球
function drawCircle(num,x,y){
	num=parseInt(num);
	for(var i=0;i<10;i++){
		for (var j=0;j<digit[num][i].length;j++) {
			if(digit[num][i][j]==1){
				ctx.fillStyle="#085276";
				ctx.beginPath();
				ctx.arc(x+2*(r+1)*j+(r+1),y+2*(r+1)*i+(r+1),r,0,2*Math.PI);
				ctx.fill();
			}
		}
	}
}
//刷新
function update(){
	var nextLeftTime=getLeftTime();

	var nextHour=parseInt(nextLeftTime/3600);
	var nextMinites=parseInt((nextLeftTime-nextHour*3600)/60);
	var nextSecond=parseInt(nextLeftTime%60);

	var curHour=parseInt(curLeftTime/3600);
	var curMinites=parseInt((curLeftTime-curHour*3600)/60);
	var curSecond=parseInt(curLeftTime%60);

	if(nextLeftTime!=curLeftTime){
    	curLeftTime=nextLeftTime;
    	if(parseInt(curHour/10) != parseInt(nextHour/10)){
    		addBall(marginLeft,marginTop,parseInt(curHour/10));
    	}
    	if(parseInt(curHour%10) != parseInt(nextHour%10)){
    		addBall(marginLeft+15*(r+1),marginTop,parseInt(curHour%10));
    	}
    	if(parseInt(curMinites/10) != parseInt(nextMinites/10)){
    		addBall(marginLeft+40*(r+1),marginTop,parseInt(curMinites/10));
    	}
    	if(parseInt(curMinites%10) != parseInt(nextMinites%10)){
    		addBall(marginLeft+55*(r+1),marginTop,parseInt(curMinites%10));
    	}
    	if(parseInt(curSecond/10) != parseInt(nextSecond/10)){
    		addBall(marginLeft+70*(r+1),marginTop,parseInt(curSecond%10));	
    	}
    	if(parseInt(curSecond%10) != parseInt(nextSecond%10)){
			addBall(marginLeft+95*(r+1),marginTop,parseInt(curSecond%10));
    	}
	}
    updateBalls();
}
//添加多彩小球
function addBall(x,y,num){
	for(var i=0;i<digit[num].length;i++){
		for(var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j]==1){
				var aball={
					x:x+2*(r+1)*j+(r+1),
					y:y+2*(r+1)*i+(r+1),
					g:1.5+Math.random(),
					vx:Math.pow(-1,Math.ceil(Math.random()*1000)) * 4,
					vy:-5,
					color:colors[Math.floor(Math.random()*colors.length)],
				}
				balls.push(aball);
			}
		}
	}
}
//小球运动
function updateBalls() {
	for(var i=0;i<balls.length;i++){
		balls[i].x+=balls[i].vx;
		balls[i].y+=balls[i].vy;
		balls[i].vy+=balls[i].g;

		if(balls[i].y > can.height-r){
			balls[i].y = can.height-r
			balls[i].vy=-balls[i].vy*0.6;
		}
	}
	var con=0;
	for(var i=0;i<balls.length;i++){
		if(balls[i].x+r > 0 && balls[i].x-r < can.width){
			balls[con++] = balls[i];
		}
	}
	while(balls.length > con){
		balls.pop();
	}
	console.log(balls.length);
}