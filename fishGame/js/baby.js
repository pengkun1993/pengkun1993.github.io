var babyObj = function() {
	this.x;
	this.y;
	this.angle;
	this.ran=Math.random();
	this.tailTimer;
	this.eyeTimer;
	this.bodyTimer;
	this.eyeTimeInterval;
	this.tailNum;
	this.eyeNum;
	this.bodyNum;
}
babyObj.prototype.init = function() {
	this.x = canW * 0.5;
	this.y = canH * 0.5;
	this.angle = 0;
	this.tailTimer=0;
	this.eyeTimer=0;
	this.eyeTimeInterval=1000;
	this.tailNum=0;
	this.eyeNum=0;
	this.bodyTimer=0;
	this.bodyNum=0;
}
babyObj.prototype.draw = function() {
	//小鱼跟随大鱼移动坐标
	this.x = lerpDistance(mom.x, this.x, 0.99);
	this.y = lerpDistance(mom.y, this.y, 0.99);
	//小鱼脑袋跟随大鱼旋转角度
	var beta, x, y;
	x = mom.x - this.x;
	y = mom.y - this.y;
	beta = Math.atan2(y, x) + Math.PI;
	this.angle = lerpAngle(beta, this.angle, 0.95);
	//开始绘制
	ctx2.save();
	ctx2.translate(this.x, this.y);
	ctx2.rotate(this.angle);
	//绘制摆尾
	this.change();
	var taili=this.tailNum%8;
	ctx2.drawImage(babyTail[taili],-babyTail[taili].width*0.5+25,-babyTail[taili].height*0.5);
	//绘制鱼身
	var bodyi=this.bodyNum;
	ctx2.drawImage(babyFade[bodyi],-babyFade[bodyi].width*0.5,-babyFade[bodyi].height*0.5);
	//绘制眨眼
	var eyei=this.eyeNum%2;
	if(eyei==0){
		this.eyeTimeInterval=1500*Math.random()+1000;
	}else{
		this.eyeTimeInterval=200;
	}
	ctx2.drawImage(babyEye[eyei],-babyEye[eyei].width*0.5,-babyEye[eyei].height*0.5)
	ctx2.restore();
}
babyObj.prototype.change=function(){
	//尾巴摆动
	this.tailTimer+=deltaTime;
	if(this.tailTimer>50){
		this.tailNum++;
		this.tailTimer=0;
	}
	//不定时眨眼睛
	this.eyeTimer+=deltaTime;
	if(this.eyeTimer>this.eyeTimeInterval){
		this.eyeNum++;
		this.eyeTimer%=this.eyeTimeInterval;
	}
	//身体颜色变化
	this.bodyTimer+=deltaTime;
	if(this.bodyTimer>300){
		this.bodyNum++;
		if(this.bodyNum>19){
			this.bodyNum=19;
		}
		this.bodyTimer=0;
	}
}