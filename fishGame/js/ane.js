var aneObj =function (){
	this.x=[];
	this.len=[];
	this.num=50;
}
aneObj.prototype.init = function() {
	for(var i=0;i<this.num;i++){
		this.x[i]=i*16+Math.random()*20;
		this.len[i]=200+Math.random()*50;
	}
}
aneObj.prototype.draw=function(){
	ctx2.save();
	ctx2.globalAlpha = 0.6;
	ctx2.strokeStyle="#341246";
	ctx2.lineWidth=20;
	ctx2.lineCap="round";
	for(var i=0;i<this.num;i++){
		ctx2.beginPath();
		ctx2.moveTo(this.x[i],canH);
		ctx2.lineTo(this.x[i],canH-this.len[i]);
		ctx2.stroke();
	}
	ctx2.restore();
}