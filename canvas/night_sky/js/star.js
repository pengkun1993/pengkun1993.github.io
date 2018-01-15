/**
 * 五角星
 * @param  {Number} $x     中心横坐标
 * @param  {Number} $y     中心纵坐标
 * @param  {Number} $r     内接圆半径
 * @param  {Number} $R     外接圆半径
 * @param  {Number} $deg   旋转角度
 * @param  {String} $color 星星颜色
 */
var starObj=function($x=0,$y=0,$r=0,$R=0,$deg=0,$color='yellow'){
	this.x=$x;
	this.y=$y;
	this.R=$R;
	this.r=$r;
	this.deg=$deg;
	this.color=$color;
}
/**
 * 绘制
 * @param  {obj} $ctx 画布
 */
starObj.prototype.draw = function($ctx) {
	$ctx.save();
	$ctx.beginPath();
	$ctx.translate(this.x,this.y);
	$ctx.rotate((this.deg+18)*Math.PI/180);//加18使星星变为朝上，本身朝左
	for(var i=0;i<5;i++){
		$ctx.lineTo(-this.R*Math.cos(72*i*Math.PI/180),this.R*Math.sin(72*i*Math.PI/180));
		$ctx.lineTo(-this.r*Math.cos((36+72*i)*Math.PI/180),this.r*Math.sin((36+72*i)*Math.PI/180))
	}
	$ctx.closePath();
	$ctx.shadowColor='#fff';
	$ctx.shadowBlur=20;
	$ctx.fillStyle=this.color;
	$ctx.fill();
	$ctx.restore();
};