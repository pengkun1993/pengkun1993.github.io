var momObj = function(){
	this.x;
	this.y;
	this.angle;
	this.mombody=new Image();
	this.momeye=new Image();
	this.momtail=new Image();
}
momObj.prototype.init = function() {
	this.x=canW*0.5;
	this.y=canH*0.5;
	this.angle=0;
	this.mombody.src="src/big.png";
	this.momeye.src="src/bigEye0.png";
	this.momtail.src="src/bigTail0.png";
}
momObj.prototype.draw = function() {
	//沿着鼠标方向移动
	this.x=lerpDistance(mx,this.x,0.99);
	this.y=lerpDistance(my,this.y,0.99);
	//头转向鼠标
	var x=mx-this.x;
	var y=my-this.y;
	var bate=Math.atan2(y,x)+Math.PI;
	this.angle=lerpAngle(bate,this.angle,0.5);
	//绘制大鱼
	ctx2.save();
	ctx2.translate(this.x,this.y);
	ctx2.rotate(this.angle);
	ctx2.drawImage(this.mombody,-this.mombody.width*0.5,-this.mombody.height*0.5);
	ctx2.drawImage(this.momeye,-this.momeye.width*0.5,-this.momeye.height*0.5)
	ctx2.drawImage(this.momtail,-this.momtail.width*0.5+30,-this.momtail.height*0.5)
	ctx2.restore();
}