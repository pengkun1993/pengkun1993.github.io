function momFruitsCollision(){console.log("a")
	for(var i = 0;i<fruit.num;i++){
		if(fruit.alive[i]){
			var l=calLength2(mom.x,mom.y,fruit.x[i],fruit.y[i]);
			if(l<400){
				fruit.dead(i);
			}
		}
	}
}