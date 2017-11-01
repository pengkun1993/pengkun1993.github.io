var waveObj=function(){};
waveObj.prototype.init = function($x,$y,$r,$max_r,$line_w,$color) {
	this.x=$x;
	this.y=$y;
	this.r=$r;
	this.line_w=$line_w;
	this.max_r=$max_r;
	this.color=$color;
	this.status=1;
};
waveObj.prototype.draw = function($ctx) {
	$ctx.save();
	$ctx.beginPath();
	$ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
	$ctx.strokeStyle=this.color;
	$ctx.lineWidth=this.line_w;
	$ctx.stroke();
	$ctx.restore();
};
waveObj.prototype.update = function($deltime) {
	this.r+=$deltime*0.1;
	if(this.r>this.max_r){
		this.status=0;
	}
};