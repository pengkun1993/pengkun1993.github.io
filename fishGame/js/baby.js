var babyObj = function() {
	this.babybody = new Image();
	this.babyeye = new Image();
	this.babytail = new Image();
	this.x;
	this.y;
	this.angle;
	this.li;
	this.timer;
}
babyObj.prototype.init = function() {
	this.x = canW * 0.5;
	this.y = canH * 0.5;
	this.angle = 0;
	this.timer = 0;
	this.babybody.src = "src/baby.png";
	this.babyeye.src = "src/babyEye0.png";
	this.babytail.src = "src/babyTail0.png";
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
	ctx2.save();
	ctx2.translate(this.x, this.y);
	ctx2.rotate(this.angle);
	ctx2.drawImage(this.babytail, -this.babytail.width * 0.5 + 25, -this.babytail.height * 0.5);
	ctx2.drawImage(this.babybody, -this.babybody.width * 0.5, -this.babybody.height * 0.5);
	ctx2.drawImage(this.babyeye, -this.babyeye.width * 0.5, -this.babyeye.height * 0.5);
	ctx2.restore();
};