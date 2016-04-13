function momFruitsCollision(){
	for(var i = 0;i<fruit.num;i++){
		if(fruit.alive[i]){
			var l=calLength2(mom.x,mom.y,fruit.x[i],fruit.y[i]);
			if(l<400){
				//获取改变大鱼身体颜色的图片序列号
				mom.bodyNum++;
				if(mom.bodyNum>7){
					mom.bodyNum=7;
				}
				fruit.dead(i);
				if(fruit.fruitType[i]=="blue"){
					data.double=data.double+1;
				}else{
					data.fruit=data.fruit+1;
				}
				//生成圈圈
				wave.born(fruit.x[i],fruit.y[i],true);
			}
		}
	}
}
function momBabyCollision() {
	var l=calLength2(mom.x,mom.y,baby.x,baby.y);
	if(data.fruit>0 && l<400){
		mom.bodyNum=0;
		baby.bodyNum=0;
		data.addScore();
		wave.born(baby.x,baby.y,false)
	}
}
