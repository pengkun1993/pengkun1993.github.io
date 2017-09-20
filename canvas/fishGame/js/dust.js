var dustObj=function(){
	this.x=[];
	this.y=[];
	this.bx=[];
	this.num;
}
dustObj.prototype.init = function() {
	this.num=60;
	for (var i = 0; i <this.num; i++) {
			this.x[i]=Math.random()*canW;
			this.y[i]=Math.random()*canH;			
			this.bx[i]=this.x[i];
		}	
}
dustObj.prototype.draw=function(){
	for(var i=0;i<this.num;i++){
		this.bx[i]=this.x[i]+Math.sin(ane.alpha)*ane.amp[i]*0.2;
		var n=i%7;
		ctx1.drawImage(dustPic[n],this.bx[i],this.y[i]);
	}
}