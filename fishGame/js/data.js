var dataObj=function(){
	this.fruit=0;
	this.double=1;
	this.score=0;
	this.alpha=0;
}
dataObj.prototype.draw = function() {
	var w=can2.width;
	var h=can2.height;

	ctx2.save();
	ctx2.fillStyle="#fff";
	ctx2.fillText("score  "+this.score,w*0.5,h-30,200);
	if(gameOver){
		this.alpha+=deltaTime*0.0005;
		if(this.alpha>1) this.alpha=1;
		ctx2.fillStyle="rgba(255,255,255,"+this.alpha+")";
		var size=this.alpha*70+10;
		ctx2.font=size+"px verdana";
		ctx2.fillText("GameOver",w*0.5,h*0.5,w);
	}
	ctx2.restore();

}
dataObj.prototype.addScore = function() {
	this.score+=this.fruit*100*this.double;
	this.fruit=0;
	this.double=1;
}