var aneObj =function (){
	this.x=[];
	this.y=[];
	this.headx=[];//控制点x坐标
	this.num=50;
	this.alpha;
	this.amp=[];
}
aneObj.prototype.init = function() {
	this.alpha=0;
	for(var i=0;i<this.num;i++){
		this.x[i]=i*16+Math.random()*20;
		this.headx[i]=this.x[i];
		this.y[i]=canH-250+Math.random()*50;
		this.amp[i]=Math.random()*50+50;
	}
}
aneObj.prototype.draw=function(){
	this.alpha+=deltaTime*Math.random()*0.003;
	for(var i=0;i<this.num;i++){
		this.headx[i]=this.x[i]+Math.sin(this.alpha)*this.amp[i];
	}
	ctx1.save();
	ctx1.strokeStyle="#341246";
	ctx1.lineWidth=20;
	ctx1.lineCap="round";
	ctx1.globalAlpha = 0.6;
	for(var i=0;i<this.num;i++){
		ctx1.beginPath();
		ctx1.moveTo(this.x[i],canH);
		ctx1.quadraticCurveTo(this.x[i],canH-100,this.headx[i],this.y[i]);
		ctx1.stroke();
	}
	ctx1.restore();
}