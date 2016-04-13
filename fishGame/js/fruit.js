var fruitObj=function (){
	this.num=10;
	this.alive=[];
	this.x=[];
	this.y=[];
	this.orange=new Image();
	this.blue=new Image();
	this.spd=[];//使每个海葵有不同的速度
	this.w=[];
	this.fruitType=[];
	this.count=0;
	this.anei=[];//记录食物生于那个海葵上
}
fruitObj.prototype.init = function() {
	this.orange.src="src/fruit.png";
	this.blue.src="src/blue.png";
	for(var i=0;i<this.num;i++){
		this.alive[i]=false;
		this.anei[i]=Math.floor(Math.random()*50);
	}
}
fruitObj.prototype.draw= function () {
	if(deltaTime>20) deltaTime=20;//解决浏览器非当前标签下，不刷新帧导致deltaTime异常大
	for(var i=0;i<this.num;i++){
		if(this.alive[i]){
			if(this.w[i]<this.orange.width){
					this.w[i]+=deltaTime*this.spd[i]*0.1;
					this.x[i]=ane.headx[this.anei[i]];//随机选取一个海葵
			}else{
				if(this.y[i]>0){
					this.y[i]-=deltaTime*this.spd[i];//使食物有不同速度的同时，平滑上浮
				}else{
					this.dead(i);
				}
			}
			var pic;
			if(this.fruitType[i]=="blue"){
				pic=this.blue;
			}else{
				pic=this.orange;
			}
			ctx1.drawImage(pic,this.x[i]-this.w[i]*0.5,this.y[i]-this.w[i]*0.5,this.w[i],this.w[i]);//原始的海葵坐标在中心点，画的时候从中心点开始画，所以减去图片的一般
		}	
	}
}
fruitObj.prototype.born=function(i){
		this.alive[i]=true;
		this.spd[i]=Math.random()*0.15;
		this.x[i]=ane.headx[this.anei[i]];//随机选取一个海葵
		this.y[i]=ane.y[i];
		this.w[i]=0;
		var ran=Math.random();
		if(ran < 0.2){
			this.fruitType[i]="blue";
		}else{
			this.fruitType[i]="orange";
		}
}
fruitObj.prototype.dead= function(i) {
		this.alive[i]=false;
		this.count--;
	
};
function fruitNum() {
	for(var i=0;i<fruit.num && fruit.count<fruit.num;i++){
		for(var j=0;fruit.alive[j];j++){
			continue;
		}
		if(!fruit.alive[i]){
				fruit.born(i);
				fruit.count++;
		}
	}
}