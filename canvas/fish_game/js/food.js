var foodObj=function(){}
foodObj.prototype.init = function($weeds,$pic,$l) {
	this.weeds=$weeds;
	this.weed_i=Math.floor(Math.random()*$weeds.length);
	this.x=$weeds[this.weed_i]['x1']-$weeds[this.weed_i]['w']/2;
	this.y=$weeds[this.weed_i]['y1']+$weeds[this.weed_i]['w']/2;
	this.l=$l;
	this.max_l=$weeds[this.weed_i]['w'];
	this.v=$weeds[this.weed_i]['v']*Math.random();
	this.pic=$pic;
};
foodObj.prototype.draw = function($ctx) {
	$ctx.save();
	$ctx.drawImage(this.pic,this.x,this.y,this.l,this.l);
	$ctx.restore();
};
foodObj.prototype.update = function() {
	if(this.l<this.max_l){
		this.x=this.weeds[this.weed_i]['x1']-this.weeds[this.weed_i]['w']/2;
		this.y=this.weeds[this.weed_i]['y1']-this.weeds[this.weed_i]['w']/2;
		this.l+=this.v;
	}else{
		this.y-=this.v*1.1;
	}
};