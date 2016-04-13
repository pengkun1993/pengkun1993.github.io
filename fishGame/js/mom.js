var momObj = function(){
	this.x;
	this.y;
	this.angle;
	this.tailTimer;
	this.eyeTimer;
	this.eyeTimeInterval;
	this.tailNum;
	this.eyeNum;
	this.bodyNum;
}
momObj.prototype.init = function() {
	this.x=canW*0.5;
	this.y=canH*0.5;
	this.angle=0;
	this.tailTimer=0;
	this.eyeTimer=0;
	this.eyeTimeInterval=1000;
	this.tailNum=0;
	this.eyeNum=0;
	this.bodyNum=0;
}
momObj.prototype.draw = function() {
	//沿着鼠标方向移动
	this.x=lerpDistance(mx,this.x,0.95);
	this.y=lerpDistance(my,this.y,0.95);
	//头转向鼠标
	var x=mx-this.x;
	var y=my-this.y;
	var bate=Math.atan2(y,x)+Math.PI;
	this.angle=lerpAngle(bate,this.angle,0.5);
	ctx2.save();
	ctx2.translate(this.x,this.y);
	ctx2.rotate(this.angle);
	//绘制鱼身
	this.change();
	if(data.double==1){
		ctx2.drawImage(momBodyOrg[this.bodyNum],-momBodyOrg[this.bodyNum].width*0.5,-momBodyOrg[this.bodyNum].height*0.5);
	}else{
		ctx2.drawImage(momBodyBlue[this.bodyNum],-momBodyBlue[this.bodyNum].width*0.5,-momBodyBlue[this.bodyNum].height*0.5);
	}
	
	//绘制摆尾
	var taili=this.tailNum%8;
	ctx2.drawImage(momTail[taili],-momTail[taili].width*0.5+30,-momTail[taili].height*0.5);
	//绘制眨眼
	var eyei=this.eyeNum%2;
	if(eyei==0){
		this.eyeTimeInterval=1500*Math.random()+1000;
	}else{
		this.eyeTimeInterval=200;
	}
	ctx2.drawImage(momEye[eyei],-momEye[eyei].width*0.5,-momEye[eyei].height*0.5)
	ctx2.restore();
}
//鱼的变化动作
momObj.prototype.change=function(){
	//尾巴摆动
	this.tailTimer+=deltaTime;
	if(this.tailTimer>50){
		this.tailNum++;
		this.tailTimer=0;
	}
	//不定时眨眼睛
	this.eyeTimer+=(deltaTime+Math.random()*5);
	if(this.eyeTimer>this.eyeTimeInterval){
		this.eyeNum++;
		this.eyeTimer%=this.eyeTimeInterval;
	}
}