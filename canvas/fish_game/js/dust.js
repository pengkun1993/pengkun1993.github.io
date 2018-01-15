var dustObj=function($pic,$x,$y,$v,$l,$angle=0) {
	this.x0=$x;
	this.x=this.x0;
	this.y=$y;
	this.v=$v;
	this.l=$l;
	this.pic=$pic;
	this.angle=$angle;
	this.ran_l=Math.random()*20+20;
}
dustObj.prototype.draw = function($ctx) {
	$ctx.save();
	$ctx.drawImage(this.pic,this.x,this.y,this.l,this.l);
	$ctx.restore();
};
dustObj.prototype.update = function($deltime) {
	this.angle+=$deltime*0.001;
	this.x=this.x0+Math.sin(this.angle)*this.ran_l;
	//this.x+=this.v*$direction;
};