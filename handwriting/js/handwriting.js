var canW=Math.min(800,$(window).width()-20);
var canH=canW;
var can;
var ctx;

var ismousedown=false;//记录鼠标是否被点下
var lastLoc={x:0,y:0};//上一次鼠标坐标
var lastTime=0;//上一次鼠标按下的时间
var lastLineWidth=30;//上一次笔尖宽度

//定义笔尖效果的一些值
var maxLineWidth=Math.round($(window).width()*0.02);//最粗
var minLineWidth=1;//最细
var maxV=10;//最大笔尖速度
var minV=1;//最小笔尖速度
var strokeColor="black";//笔尖颜色

$(function(){
	can=document.getElementById('canvas');
	ctx=can.getContext("2d");

	can.width=canW;
	can.height=canH;
	$(".controller").css('width',canW+'px');

	//绘制田字格
	 drawGrid();
	//清空面板
	$("#clear_btn").click(function(e){
		ctx.clearRect(0,0,canW,canH);
		drawGrid();
	});
	//更改画笔颜色
	$(".color_btn").click(function(){
		$(".color_btn").removeClass("btn_selected");
		$(this).addClass("btn_selected");
		strokeColor=$(this).css("background-color");
	})
	//鼠标事件
	can.onmousedown=function (e) {
		e.preventDefault();
		startStroke({x:e.clientX,y:e.clientY});
	}
	can.onmouseup=function(e){
		e.preventDefault();
		endStroke();
	}
	can.onmouseout=function(e){
		e.preventDefault();
		endStroke();
	}
	can.onmousemove=function (e) {
		e.preventDefault();
		moveStroke({x:e.clientX,y:e.clientY});
	}
	//触控事件
	can.addEventListener('touchstart',function(e){
		e.preventDefault();
		touch=e.touches[0];//选取第1个触控点
		startStroke({x:touch.pageX,y:touch.pageY});
	});
	can.addEventListener('touchmove',function (e) {
		e.preventDefault();
		touch=e.touches[0];//选取第1个触控点
		moveStroke({x:touch.pageX,y:touch.pageY});
	});
	can.addEventListener('touchend',function(e){
		e.preventDefault();
		endStroke();
	});
});
/**
 * 计算笔尖移动的距离
 * @param  {[type]} loc1 起始位置坐标
 * @param  {[type]} loc2 当前位置坐标
 * @return {[type]} res  返回一个距离值
 */
function calcDistance(loc1,loc2) {
	var res=Math.sqrt((loc2.x-loc1.x)*(loc2.x-loc1.x)+(loc2.y-loc1.y)*(loc2.y-loc1.y));
	return res;
}
/**
 * 计算笔尖的粗细
 * @param  {[type]} t 两次绘制时间间隔
 * @param  {[type]} s 两次绘制路径间隔
 * @return {[type]}   返回一个由上次笔尖粗度和当前笔尖粗度按一定比例调和后的结果
 */
function calcLineWidth(t,s) {
	var v=s/t;
	var curLineWidth;
	if(v<minV){
		curLineWidth=maxLineWidth;
	}else if(v>maxV){
		curLineWidth=minLineWidth;
	}else{
		curLineWidth=maxLineWidth-(maxLineWidth-minLineWidth)/(maxV-minV)*v;
	}
	var res=lastLineWidth*0.2+curLineWidth*0.8;
	lastLineWidth=curLineWidth;
	return res;
}
/**
 * 绘制笔画路径
 * @param  {[type]} linewidth 笔画宽度
 */
function draw(last,cur,linewidth){
	ctx.beginPath();
	ctx.moveTo(last.x,last.y);
	ctx.lineTo(cur.x,cur.y);
	ctx.lineWidth=linewidth;
	ctx.strokeStyle=strokeColor;
	ctx.lineCap="round";//非常重要，使线段圆滑
	ctx.lineJoin="round";
	ctx.stroke();
	ctx.restore();
}
/**
 * 开始绘制
 * @param  {[type]} point 获取点击的点坐标
 */
function startStroke(point){
	ismousedown=true;
	lastLoc=windowToCanvas(point.x,point.y);
	lastTime=new Date().getTime();
}
/**
 * 绘制中。。。
 * @param  {[type]} point 移动点的坐标
 */
function moveStroke(point) {
	if(ismousedown){
		var curLoc=windowToCanvas(point.x,point.y);
		var curTime=new Date().getTime();
		var t=curTime-lastTime;
		var s=calcDistance(lastLoc,curLoc);
		//计算当前笔尖粗细
		var w=calcLineWidth(t,s);
		//绘制笔画路径
		draw(lastLoc,curLoc,w);

		lastLoc=curLoc;
		lastTime=curTime;
	}
}
/**
 * 结束绘制
 */
function endStroke() {
	ismousedown=false;
}
//绘制田字格
function drawGrid(){
	ctx.save();

	ctx.strokeStyle="red";
	ctx.beginPath();
	ctx.moveTo(3,3);
	ctx.lineTo(can.width-3,3);
	ctx.lineTo(can.width-3,can.height-3);
	ctx.lineTo(3,can.height-3);
	ctx.closePath();

	ctx.lineWidth=6;
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(3,3);
	ctx.lineTo(can.width-3,can.height-3);

	ctx.moveTo(can.width-3,3);
	ctx.lineTo(3,can.height-3);

	ctx.moveTo(3,can.height/2);
	ctx.lineTo(can.width-3,can.height/2);

	ctx.moveTo(can.width/2,3);
	ctx.lineTo(can.width/2,can.height-3);

	ctx.lineWidth=1;
	ctx.stroke();

	ctx.restore();
}

//获取鼠标在canvas上的坐标，转换屏幕坐标到canvas
function windowToCanvas(x,y) {
	var bbox=can.getBoundingClientRect();
	return {x:x-bbox.left,y:y-bbox.top}
}