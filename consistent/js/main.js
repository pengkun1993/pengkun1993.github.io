var can;
var ctx;

var can_width=window.screen.width;
var can_height=window.screen.height;

var square_w=0.2576*can_width;//点阵宽
var square_h=0.3316*can_width;//点阵高
var square_margin=0.1105*can_width;//0.1844*can_width;//两个点阵的间距
var left_square_marleft=(can_width-square_w*2-square_margin)/2;//左侧点阵的左边距
var left_square_martop=(can_height-square_h)/2;//点阵的上边距


var boll_r=1/1366*can_width;//点的大小
var move_s=(10.1/1366)*can_width;//有规律点的移动速度
var left_point=[];//左侧点阵的所有点
var right_point=[];//右侧点阵的所有点

var all_correct_an=[];//有规律的点阵在哪个方向，-1左1右
var timer;//定时器
var status=0;//是否是选择阶段，1是0否
var p_status=0;//是否侦听p键,1是0否
var train_state=0;//是否是练习阶段,1是0否
var correct_num=0;//记录选择正确的次数，连续3次正确，减少10%的规律点数，一次判断错误立即升高10%的规律点数
var gameover_state=0;//记录测试是否结束
var point_move_state;//点的运动方向，-1左1右

var max_point_num=300*0.4;//最大规律点数
var max_loop;//测试的最大trail数

var allindex=0;//记录进行的trail数
var train_data=[];//记录练习阶段的结果
var result_index=0;
var result=[];//记录转折点的点数，一个水平连续正确3次，下一次错误算一次转折

var begintime;//正式测试开始时间
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
		drawText('欢迎参加本次测试！',can_width/2,can_height/2-50,'#fff',30);
		drawText('你将看到两个点阵，其中一个点阵当中有一部分点会有规律的水平运动（向左或者向右），',can_width/2,can_height/2,'#fff',30);
		drawText('而另一个点阵中的点全部随机运动。请你判断哪边点阵中的点在有规律的运动。',can_width/2,can_height/2+50,'#fff',30);
		drawText('请按P键进入练习。',can_width/2,can_height/2+100,'#fff',30);
		p_status=1;
	});
	// 退出全屏游戏刷新
	$(window).resize(function(){
		outFullScreen(isFullScreen);
	});

	$(document).bind("keydown",function(e){
		if(p_status==1){//侦听p键时
			if(e.keyCode==80){//p，开始一次新的练习
				max_loop=10;
				train_state=1;
				p_status=0;

				allindex=0;
				train_data.splice(0,train_data.length);//清空练习数据
				beginGame();
			}else if(e.keyCode==81){//开始正式测试
				begintime=new Date();
				max_loop=150;
				train_state=0;
				p_status=0;

				allindex=0;
				beginGame();
			}
		}else if(status==1){//进行选择时
			if(e.keyCode==37){//左
				if(train_state==1){//练习阶段
					train_data[allindex]=-1;
				}else{//正式测试阶段
					if(all_correct_an[allindex]==-1){//选择正确
						correct_num++;
						if(correct_num%3==0){//console.log('del');
							if(result_index<1){
								max_point_num=Math.round(max_point_num*0.5);//减少规律点数
							}else{
								max_point_num=Math.round(max_point_num*0.9);//减少规律点数
							}
						}else if(correct_num==4){//这个是为了只有3的倍数才变化
							//correct_num=1;//该水平下第一次正确
						}
					}else{//选择错误
						if(correct_num>=3){//已经选择正确3次
							result[result_index++]=max_point_num;
						}
						correct_num=0;//正确点数还原
						if(result_index<1){
							max_point_num=max_point_num*1.5;//增加规律点数
						}else{
							max_point_num=max_point_num*1.1;//增加规律点数
						}
						
					}
				}
			}else if(e.keyCode==39){//右
				if(train_state==1){//练习阶段
					train_data[allindex]=1;
				}else{//正式测试阶段
					if(all_correct_an[allindex]==1){//选择正确
						correct_num++;
						if(correct_num%3==0){//console.log('del');
							max_point_num=Math.floor(max_point_num*0.9);//减少规律点数
						}else if(correct_num==4){//此处是为了只正确3的倍数次的时候才算，注释掉后只要大于3就算一次记录
							//correct_num=1;//该水平下第一次正确
						}
					}else{//选择错误
						if(correct_num>=3){//已经选择正确3次
							result[result_index++]=max_point_num;
						}
						correct_num=0;//正确点数还原
						if(result_index<1){
							max_point_num=max_point_num*1.5;//增加规律点数
						}else{
							max_point_num=max_point_num*1.1;//增加规律点数
						}
					}
				}
			}
			if(e.keyCode==37 || e.keyCode==39){//console.log(correct_num);
				allindex++;
				status=0;
				//总循环帧小于最大循环帧、转折点小于6个、最大规律点大于一个
				if(allindex<max_loop && result_index<6 && max_point_num>1){
					mainLoop();
				}else{
					if(train_state==1){//练习阶段结束
						var train_correct=0;
						for(var i=0;i<train_data.length;i++){
							if(train_data[i]==all_correct_an[i]){
								train_correct++
							}
						}
						var train_correct_percent=train_correct/train_data.length*100;

						ctx.clearRect(0,0,can_width,can_height);
						drawText('选择正确率为'+train_correct_percent+'%',can_width/2,can_height/2-50,'#fff',30);
						drawText('练习结束，按p继续练习或按q开始正式测试',can_width/2,can_height/2,'#fff',30);
						p_status=1;
					}else{//正式测试阶段结束
						gameover();
					}
				}
			}
		}else if(gameover_state==1){
			if(e.keyCode==13){
				location.reload();
			}
		}
	});
});
// 开始测试
function beginGame() {
	//生成确定是左规律还是右规律的数组
	all_correct_an.splice(0,all_correct_an.length);
	for(var i=0;i<max_loop;i++){
		all_correct_an[i]=randomsort();
	}
	console.log(all_correct_an);

	ctx.clearRect(0,0,can_width,can_height);
	ctx.beginPath();
	ctx.moveTo(can_width/2-can_width*0.04,can_height/2);
	ctx.lineTo(can_width/2+can_width*0.04,can_height/2);
	ctx.moveTo(can_width/2,can_height/2-can_width*0.04);
	ctx.lineTo(can_width/2,can_height/2+can_width*0.04);
	ctx.lineWidth=5;
	ctx.strokeStyle='#fff';
	ctx.stroke();
	setTimeout(function(){
		mainLoop();
	},500);
}
function gameover() {

	var nowtime=new Date();
	var deltime=nowtime-begintime;
	deltime=Math.round(deltime/1000);
	console.log(result);
	result.reverse();//倒序数组
	console.log(result);
	swal({
		title:'测试结束',
		type:'success',
	},function(){
		ctx.clearRect(0,0,can_width,can_height);
		var total_num=0;
		var lastprecent=0;
		if(result.length>=6){
			for(var i=0;i<6;i++){
				total_num+=result[i];
			}
			lastprecent=total_num/6;
		}else if(result.length<=0){
			total_num=0;
			lastprecent=-1;
		}else{
			for(var i=0;i<result.length;i++){
				total_num+=result[i];
			}
			lastprecent=total_num/result.length;
		}
		if(lastprecent==-1){
			drawText('未测到您的阈值',can_width/2,can_height/2-50,'#fff',30);
		}else{
			lastprecent=Math.floor(lastprecent);
			drawText('您的阈值为:'+lastprecent,can_width/2,can_height/2-50,'#fff',30);
		}
		//drawText('测试总用时'+deltime+'秒,共进行了'+allindex+'个trial。',can_width/2,can_height/2,'#fff',30)
		drawText('按回车键测试结束',can_width/2,can_height/2,'#fff',30);
		gameover_state=1;
	});
}
// 主循环
function mainLoop() {
	//随机点的运动方向
	point_move_state=randomsort();
	//打乱数组
	left_point=shuffleArray(left_point);
	right_point=shuffleArray(right_point);
	// 还原所有点都为随机点
	for(var i=0;i<left_point.length;i++){
		left_point[i]['is_nomal']=false;
		left_point[i]['x']+=(Math.random()*20*randomsort());
		left_point[i]['y']+=(Math.random()*20*randomsort());
		right_point[i]['is_nomal']=false;
		right_point[i]['x']+=(Math.random()*20*randomsort());
		right_point[i]['y']+=(Math.random()*20*randomsort());
	}
	// 标记出有规律的点
	if(all_correct_an[allindex]==-1){//左侧有规律
		for(var i=0;i<max_point_num;i++){
			left_point[i]['is_nomal']=true;
		}
	}else if(all_correct_an[allindex]==1){//右侧有规律
		for(var i=0;i<max_point_num;i++){
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
		drawText('←左侧有规律，→右侧有规律',can_width/2,can_height/2,'#fff',30);
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
			left_point[i].x+=(move_s*point_move_state);
		}else{
			left_point[i].x+=randomsort()*move_s;
			left_point[i].y+=randomsort()*move_s;
		}

		if(left_point[i].x<=(left_square_marleft+left_point[i].r)){
			left_point[i].x=left_square_marleft+square_w+(Math.random()*20*randomsort());
		}else if(left_point[i].x>(left_square_marleft+square_w-left_point[i].r)){
			left_point[i].x=left_square_marleft+left_point[i].r-(Math.random()*20*randomsort());
		}
		if(left_point[i].y <left_square_martop+left_point[i].r){
			left_point[i].y=left_square_martop+square_h+(Math.random()*20*randomsort());
		}else if(left_point[i].y > left_square_martop+square_h+left_point[i].r){
			left_point[i].y=left_square_martop+left_point[i].r-(Math.random()*20*randomsort());
		}
	}
}
/*更新右侧小球*/
function updateRight() {
	for(var i=0;i<right_point.length;i++){
		//根据是否是规律点，确定速度
		if(right_point[i].is_nomal){
			right_point[i].x+=(move_s*point_move_state);
		}else{
			right_point[i].x+=randomsort()*move_s;
			right_point[i].y+=randomsort()*move_s;
		}

		if(right_point[i].x<=(left_square_marleft+square_w+square_margin+boll_r)){
			right_point[i].x=can_width-left_square_marleft-boll_r+(Math.random()*20*randomsort());
		}else if(right_point[i].x>(can_width-left_square_marleft-boll_r)){
			right_point[i].x=left_square_marleft+square_w+square_margin+boll_r-(Math.random()*20*randomsort());
		}
		if(right_point[i].y <left_square_martop+boll_r){
			right_point[i].y=left_square_martop+square_h+(Math.random()*20*randomsort());
		}else if(right_point[i].y > left_square_martop+square_h+boll_r){
			right_point[i].y=left_square_martop+boll_r-(Math.random()*20*randomsort());
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