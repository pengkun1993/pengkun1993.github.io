var starObj = function() {
	this.x;
	this.y;
	this.picNum;
	this.timer;
	this.xSpd;
	this.ySpd;
}
starObj.prototype.init=function(){
	this.x=Math.random()*600+100;
	this.y=Math.random()*300+150;
	this.picNum=Math.floor(Math.random()*6);//闪烁起点不同，不要整齐闪烁
	this.timer=0;
	this.xSpd=Math.random()*3-1.5;
	this.ySpd=Math.random()*3-1.5;
}
starObj.prototype.draw=function () {
	ctx.save();
	ctx.globalAlpha=life;
	ctx.drawImage(starPic,this.picNum*7,0,7,7,this.x,this.y,7,7);
	ctx.restore();
}
starObj.prototype.update=function(){
	this.x+=deltaTime*0.01*this.xSpd;
	this.y+=deltaTime*0.01*this.ySpd;
	if(this.x<93||this.x>693){
		this.init();
		return;
	}
	if(this.y<143||this.y>443){
		this.init();
		return;
	}
	this.timer+=deltaTime;
	if(this.timer>50){
		this.picNum +=1;	
		this.picNum %=7;//由小到大闪烁
		//this.picNum=Math.floor(Math.random()*6);//随机闪烁
		this.timer=0;	
	}
}
function drawStars(){
	for(var i=0;i<num;i++){
		stars[i].draw();
		stars[i].update();
	}
}
function starLife(){
	if(switchy){
		life+=deltaTime*0.001;
		if(life>=1){
			life=1;
		}
	}else{
		life-=deltaTime*0.001;
		if(life<=0){
			life=0;
		}
	}
}