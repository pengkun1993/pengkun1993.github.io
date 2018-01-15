var moonObj=function($x=0,$y=0,$r=0,$R=0,$deg=0,$color='yellow'){
	this.x=$x;
	this.y=$y;
	this.r=$r;
	this.R=$R;
	this.deg=$deg;
	this.color=$color;
}
moonObj.prototype.draw = function($ctx) {
	var moonl=Math.pow(this.r,2)/Math.pow(Math.pow(this.R,2)-Math.pow(this.r,2),1/2);
	$ctx.save();
	$ctx.translate(this.x,this.y);
	$ctx.rotate(this.deg*Math.PI/180);
	$ctx.beginPath();
	$ctx.arc(0,0,this.r,0.5*Math.PI,1.5*Math.PI,true);
	$ctx.moveTo(0,0-this.r);
	$ctx.arcTo(moonl,0,0,0+this.r,this.R);
	$ctx.shadowColor='#fff';
	$ctx.shadowBlur=10;
	$ctx.fillStyle='yellow';
	$ctx.fill();
	$ctx.restore();
};