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
	ctx1.save();
	ctx1.globalAlpha = 0.6;
	for(var i=0;i<this.num;i++){
		ctx1.beginPath();
		ctx1.moveTo(this.x[i],canH);
		ctx1.lineTo(this.x[i],canH-this.len[i]);

		ctx1.strokeStyle="#341246";
		ctx1.lineWidth=20;
		ctx1.lineCap="round";
		ctx1.stroke();
	}
	ctx1.restore();
}