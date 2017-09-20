var can;
var ctx;

var can_width=window.screen.width;
var can_height=window.screen.height;

var square_w=0.3316*can_width;//点阵宽
var square_h=0.7226*can_height;//点阵高
var square_margin=0.1844*can_width;//两个点阵的间距
var left_square_marleft=(can_width-square_w*2-square_margin)/2;//左侧点阵的左边距
var left_square_martop=(can_height-square_h)/2;//点阵的上边距


var boll_r=2;//点的大小
var move_s=35.7;//有规律点的移动速度
var left_point=[];//左侧点阵的所有点
var right_point=[];//右侧点阵的所有点

var correct_an=0;//有规律的点阵在哪个方向，0左1右
var timer;//定时器
var status=0;//是否是选择阶段，1是0否
var max_loop=10;//测试的最大环数

var allindex=0;
var alldata=[];

var isFullScreen;
$(function(){
	can=document.getElementById('canvas');
	ctx=can.getContext('2d');

	can.width=can_width;
	can.height=can_height;
	// 生成点坐标
	//左侧
	var left_all_x=[];//左侧所有x坐标
	var left_all_y=[];//左侧所有y坐标
	var arg_x=square_w/15;
	var arg_y=square_h/20;
	for(var i=0;i<15;i++){
		left_all_x[i]=arg_x*(i+0.5)+left_square_marleft;
	}
	for(var i=0;i<20;i++){
		left_all_y[i]=arg_y*(i+0.5)+left_square_martop;
	}
	// 右侧
	var right_all_x=[];//右侧所有x坐标
	var right_all_y=[];//右侧所有y坐标
	for(var i=0;i<15;i++){
		right_all_x[i]=arg_x*(i+0.5)+left_square_marleft+square_w+square_margin;
	}
	for(var i=0;i<20;i++){
		right_all_y[i]=arg_y*(i+0.5)+left_square_martop;
	}
	var k=0;
	for(var i=0;i<left_all_x.length;i++){
		for(var j=0;j<left_all_y.length;j++){
			right_point[k]={x:right_all_x[i],y:right_all_y[j],r:boll_r,is_nomal:false,color:'#fff'};
			left_point[k]={x:left_all_x[i],y:left_all_y[j],r:boll_r,is_nomal:false,color:'#fff'};
			k++;
		}
	}
	//限制键盘f5、f11事件
	$(document).bind("keydown",function(e){ 
		e=window.event||e; 
		if(e.keyCode==116 || e.keyCode==122){ 
			e.keyCode = 0; 
			return false; 
		}
	});
	//屏蔽鼠标右键事件
	document.oncontextmenu = function(){
   	 return false;
	}
	//点击开始按钮全屏运行游戏
	$('#begin_game button').bind('click',function(){
		fullScreen();
		isFullScreen=$(window).height();
		
		$('#begin_game').css({'z-index':'0','display':'none'});
		$('canvas').css({'z-index':'1','display':'block'});
		setTimeout(function(){
			mainLoop();
		},500);
		
	});
	// 退出全屏游戏刷新
	$(window).resize(function(){
		outFullScreen(isFullScreen);
	});

	ctx.beginPath();
	ctx.moveTo(can_width/2-can_width*0.1,can_height/2);
	ctx.lineTo(can_width/2+can_width*0.1,can_height/2);
	ctx.moveTo(can_width/2,can_height/2-can_width*0.1);
	ctx.lineTo(can_width/2,can_height/2+can_width*0.1);
	ctx.lineWidth=5;
	ctx.strokeStyle='#fff';
	ctx.stroke();

	

	$(document).bind("keydown",function(e){ 
		if(status==0){
			console.log('fas');
		}else{
			switch(e.keyCode){
				case 37://左
				break;
				case 38://上
				break;
				case 39://右
				break;
			}
			if(e.keyCode==37 || e.keyCode==38 || e.keyCode==39){
				allindex++;
				if(allindex<max_loop){
					mainLoop();
					status=0;
				}else{
					swal({
						title:'测试结束',
						type:'success',
					},function(){
						location.reload();
					});
				}
			}
			
		}
	});
});
// 主循环
function mainLoop() {
	//打乱数组
	left_point=shuffleArray(left_point);
	right_point=shuffleArray(right_point);
	// 还原所有点都为随机点
	for(var i=0;i<left_point.length;i++){
		left_point[i]['is_nomal']=false;
		right_point[i]['is_nomal']=false;
	}
	// 标记出有规律的点
	if(correct_an==0){
		for(var i=0;i<100;i++){
			left_point[i]['is_nomal']=true;
		}
	}else{
		for(var i=0;i<100;i++){
			right_point[i]['is_nomal']=true;
		}
	}
	timer=setInterval(function(){
		ctx.clearRect(0,0,can.width,can.height);
		drawLeft();
		drawRight();
		updateLeft();
		updateRight();
	},100);
	setTimeout(function(){
		clearInterval(timer);
		ctx.clearRect(0,0,can.width,can.height);
		drawText('←左侧有规律，→右侧有规律，↑不确定',can_width/2,can_height/2,'#fff',30);
		status=1;
	},2500);
}
/*绘制小球*/
function drawLeft(){
	for(var i=0;i<left_point.length;i++){
		ctx.beginPath();
		ctx.arc(left_point[i].x,left_point[i].y,left_point[i].r,0,2*Math.PI);
		ctx.fillStyle=left_point[i].color;
		ctx.fill();
		//ctx.stroke();
	}
}
function drawRight(){
	for(var i=0;i<right_point.length;i++){
		ctx.beginPath();
		ctx.arc(right_point[i].x,right_point[i].y,right_point[i].r,0,2*Math.PI);
		ctx.fillStyle=right_point[i].color;
		ctx.fill();
		//ctx.stroke();
	}
}
/*更新左侧小球*/
function updateLeft() {
	for(var i=0;i<left_point.length;i++){
		//根据是否是规律点，确定速度
		if(left_point[i].is_nomal){
			left_point[i].x+=move_s;
		}else{
			left_point[i].x+=(Math.random()-0.5)*move_s;
			left_point[i].y+=(Math.random()-0.5)*move_s;
		}

		if(left_point[i].x<=(left_square_marleft+left_point[i].r)){
			left_point[i].x=left_square_marleft+square_w;
		}else if(left_point[i].x>(left_square_marleft+square_w-left_point[i].r)){
			left_point[i].x=left_square_marleft+left_point[i].r;
		}
		if(left_point[i].y <left_square_martop+left_point[i].r){
			left_point[i].y=left_square_martop+square_h;
		}else if(left_point[i].y > left_square_martop+square_h+left_point[i].r){
			left_point[i].y=left_square_martop+left_point[i].r;
		}
	}
}
/*更新右侧小球*/
function updateRight() {
	for(var i=0;i<right_point.length;i++){
		//根据是否是规律点，确定速度
		if(right_point[i].is_nomal){
			right_point[i].x+=move_s;
		}else{
			right_point[i].x+=(Math.random()-0.5)*move_s;
			right_point[i].y+=(Math.random()-0.5)*move_s;
		}

		if(right_point[i].x<=(left_square_marleft+square_w+square_margin+boll_r)){
			right_point[i].x=can_width-left_square_marleft-boll_r;
		}else if(right_point[i].x>(can_width-left_square_marleft-boll_r)){
			right_point[i].x=left_square_marleft+square_w+square_margin+boll_r;
		}
		if(right_point[i].y <left_square_martop+boll_r){
			right_point[i].y=left_square_martop+square_h;
		}else if(right_point[i].y > left_square_martop+square_h+boll_r){
			right_point[i].y=left_square_martop+boll_r;
		}
	}
}
/*
 *浏览器全屏
 */
function fullScreen() {
	var el = document.documentElement;
	var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen;
	if(typeof rfs != "undefined" && rfs) {
		rfs.call(el);
	} else if(typeof window.ActiveXObject != "undefined") {
		//for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏
		var wscript = new ActiveXObject("WScript.Shell");
		if(wscript != null) {
		    wscript.SendKeys("{F11}");
		}
	}
}
/**
 * 退出全屏测试结束
 * @param  {int} sh 非全屏下屏幕高度
 * @return {[type]}    跳转到首页
 */
function outFullScreen(sh) {
	if($(window).height()<=sh){
		window.opener=null;
		window.open(" ","_self");
		window.close();
		if(window){
			location.reload();
		}
	}
}
/**
 * 绘制文本
 * @param  {string} $text  显示的文字
 * @param  {float} $x     文本中心点横坐标
 * @param  {float} $y     文本中心点纵坐标
 * @param  {String} $color 文本颜色
 * @param  {int} $size  字体大小
 */
function drawText($text,$x,$y,$color,$size) {
	var font_size=$size ? $size : 1;
	ctx.font=font_size+'px vender';
	ctx.fillStyle = $color ? $color : '#000';
	ctx.textBaseline='middle';
	ctx.textAlign='center';
	ctx.fillText($text,$x,$y);
}

/**
 * 随机打乱一个数组
 * @param  {[type]} array 需打乱的数组
 * @return {[type]}       打乱后的数组
 */
function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}
/**
 * 相等的概率返回1或-1
 * @return {[type]} 1、-1
 */
function randomsort() {
    return  Math.random()>.5 ? -1 : 1;
    //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
}