var aballObj=function($x=0,$y=0,$r=0,$vx=0,$vy=0,$color='#fff'){
	this.x=$x;
	this.y=$y;
	this.vx=$vx;
	this.vy=$vy;
	this.r=$r;
	this.color=$color; 
}
aballObj.prototype.update = function($can) {
	this.x+=this.vx;
	this.y+=this.vy;
	if(this.x<this.r){
		this.x=this.r;
		this.vx=-this.vx;
	}else if(this.x > $can.width-this.r){
		this.x =$can.width-this.r;
		this.vx=-this.vx;
	}
	if(this.y<this.r){
		this.y=this.r;
		this.vy=-this.vy;
	}else if(this.y > $can.height-this.r){
		this.y =$can.height-this.r;
		this.vy=-this.vy;
	}
};
aballObj.prototype.draw = function($ctx,$type='source-over') {
	$ctx.beginPath();
	$ctx.arc(this.x,this.y,this.r,0,2*Math.PI);
	$ctx.closePath();
	$ctx.globalCompositeOperation=$type;
	$ctx.fillStyle=this.color;
	$ctx.fill();
};