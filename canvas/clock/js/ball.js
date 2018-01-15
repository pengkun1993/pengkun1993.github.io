/**
 * 小球对象
 * @param  {float} $x     圆心横坐标
 * @param  {float} $y     圆心纵坐标
 * @param  {float} $r     半径
 * @param  {float} $vx    水平速度
 * @param  {float} $vy    垂直速度
 * @param  {String} $color 颜色
 * @return {[type]}        绘制一个实心圆
 */
var ballObj=function($x=0,$y=0,$r=0,$vx=0,$vy=0,$color='#000'){
	this.x=$x;
	this.y=$y;
	this.r=$r;
	this.vx=$vx;
	this.vy=$vy;
	this.color=$color;
}
/**
 * 绘制小球
 * @param  {[type]} $ctx 画布画笔
 * @return {[type]}     绘制一个实心圆
 */
ballObj.prototype.draw = function($ctx) {
	$ctx.beginPath();
	$ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
	$ctx.fillStyle=this.color;
	$ctx.fill();
	$ctx.closePath();
};
/**
 * 更新小球的坐标
 * @param  {[type]} $can 画布的最大高度
 * @return {[type]}           使小球看来是动的
 */
ballObj.prototype.update = function($can) {
	var rub_force=0.8;//碰撞系数
	this.vy=this.vy+0.1;		
	this.x+=this.vx;
	this.y+=this.vy;
	if(this.y<this.r){
		this.y=this.r;
		this.vy=-this.vy
	}else if(this.y > $can.height-this.r){
		this.y=$can.height-this.r;
		this.vy=-(this.vy*rub_force);
	}
};