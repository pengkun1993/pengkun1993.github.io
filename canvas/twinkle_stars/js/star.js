/**
 * 闪烁的小星星
 * @param  {obj} $img     星星帧图片
 * @param  {int} $x       星星位置横坐标
 * @param  {int} $y       星星位置纵坐标
 * @param  {int} $r       星星的大小
 * @param  {int} $vx      星星的水平移动速度
 * @param  {int} $vy      星星的垂直移动速度
 * @param  {int} $now_num 星星当前显示的帧
 * @param  {int} $life    星星是否存活
 */
var starObj=function($img,$x,$y,$r,$vx,$vy,$now_num,$life){
	this.img=$img;
	this.x=$x;
	this.y=$y;
	this.r=$r;
	this.now_num=$now_num;
	this.vx=$vx;
	this.vy=$vy;
	this.life=1;
}
/**
 * 绘制星星
 * @param  {obj} $ctx 画笔
 */
starObj.prototype.draw = function($ctx) {
	$ctx.save();
	$ctx.clearRect(this.x,this.y,7*this.r,7*this.r);
	ctx.globalAlpha=this.life;
	$ctx.drawImage(this.img,this.now_num*7,0,7,7,this.x,this.y,7*this.r,7*this.r);
	$ctx.restore();
};
/**
 * 更新星星的位置
 * @param  {obj} $can 画布
 */
starObj.prototype.update = function($can) {
	this.x+=this.vx;
	this.y+=this.vy;
	if(this.x<this.r*7 || this.x >$can.width-this.r*7){
		this.x=Math.random()*(can.width-(this.r*7));
	}
	if(this.y<this.r*7 || this.y >$can.height-this.r*7){
		this.y=Math.random()*(can.height-(this.r*7));
	}
};