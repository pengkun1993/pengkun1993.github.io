/**
 * 水草类
 * @param  {Number} $x0 根部横坐标
 * @param  {Number} $y0 根部纵坐标
 * @param  {Number} $x1 头部横坐标
 * @param  {Number} $y1 头部纵坐标
 * @param  {Number} $cx 控制点横坐标
 * @param  {Number} $cy 控制点纵坐标
 * @param  {Number} $v  摆动速度
 * @param  {Number} $w  水草粗度
 */
var seaweedObj=function($x0=0,$y0=0,$x1=0,$y1=0,$cx=0,$cy=0,$v=0,$w=0,$angle=0){
	//起点
	this.x0=$x0;
	this.y0=$y0;
	//终点
	this.x1=$x1;
	this.y1=$y1;
	// 控制点
	this.cx=$cx;
	this.cy=$cy;
	//速度
	this.v=$v;
	//粗细
	this.w=$w;
	//color
	this.color='rgba(48,19,71,0.6)';
	//决定波浪的sin度数
	this.angle=$angle;
	//决定弯曲程度的随机值
	this.ran_l=Math.random()*100+50;
}
seaweedObj.prototype.draw = function($ctx) {
	$ctx.save();
	$ctx.beginPath();
	$ctx.moveTo(this.x0,this.y0);
	$ctx.quadraticCurveTo(this.cx,this.cy,this.x1,this.y1);
	$ctx.lineCap='round';
	$ctx.lineWidth=this.w;
	$ctx.strokeStyle=this.color;
	$ctx.stroke();
	$ctx.restore();
};
seaweedObj.prototype.update = function($deltime) {
	this.angle+=$deltime*0.001;
	this.x1=this.x0+Math.sin(this.angle)*this.ran_l;
	//this.x1+=this.v*$direction;
};