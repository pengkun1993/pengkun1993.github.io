var momObj=function($body_w,$body_h,$ex=0,$ey=0){
	this.body_w=$body_w;
	this.body_h=$body_h;
	this.ex=$ex;
	this.ey=$ey;
};
momObj.prototype.init = function($x,$y,$bodycolor,$eyenum,$bodynum,$tailnum,$angle) {
	this.x=$x;
	this.y=$y;
	this.bodycolor=$bodycolor;
	this.eyenum=$eyenum;
	this.bodynum=$bodynum;
	this.tailnum=$tailnum;
	this.angle=$angle;
	this.eyetimer=0;
	this.tailtimer=0;
};
momObj.prototype.draw = function($ctx) {
	$ctx.save();
	//鱼身
	$ctx.translate(this.x,this.y);
	$ctx.rotate(this.angle*Math.PI/180);
	if(this.bodynum>7){
		this.bodynum=7;
	}
	$ctx.drawImage(mombody[this.bodycolor][this.bodynum],-this.body_w/2,-this.body_w/2,this.body_w,this.body_h);
	// 鱼眼
	var eye_l=this.body_w/50*12;
	$ctx.drawImage(momeye[this.eyenum],-eye_l/2,-eye_l/2,eye_l,eye_l);
	//尾巴
	var tail_w=this.body_w/50*43;
	var tail_h=this.body_h/50*31;
	$ctx.drawImage(momtail[this.tailnum],this.body_w*0.2,-tail_h/2,tail_w,tail_h);
	$ctx.restore();
};
momObj.prototype.update = function($deltime) {
	//眨眼
	this.eyetimer+=$deltime;
	if(this.eyetimer>300){
		if(this.eyenum==0){
			this.eyenum=1;
		}else{
			this.eyenum=0;
		}
		this.eyetimer=0;
	}
	// 摆尾
	this.tailtimer+=$deltime;
	if(this.tailtimer>200){
		this.tailnum++;
		if(this.tailnum>7){
			this.tailnum=0;
		}
		this.tailtimer=0;
	}
	//跟随鼠标
	var del_x=this.ex-this.x;
	var del_y=this.ey-this.y;
	this.x+=del_x*0.05;
	this.y+=del_y*0.05;

	var del_angle=Math.atan2(del_y,del_x)+Math.PI;

	this.angle=(del_angle)*180/Math.PI;
};