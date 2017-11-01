var can,//背景
ctx,
scr_w=document.body.clientWidth,
scr_h=document.body.clientHeight,
seaweeds=[],//水草
dusts=[],//悬浮物
foods=[],//食物
orange_food,//橘色食物图片
blue_food,//蓝色食物图片
mombody,//大鱼身体图片
momeye,//大鱼眼睛图片
momtail,//大鱼尾巴图片
mom,//大鱼
babybody,//小鱼身体图片
babyeye,//小鱼眼睛图片
babytail,//小鱼尾巴图片
baby,//小鱼
wave=[],//波浪
baby_max_time=500,//小鱼不吃东西最大存活时间
animation,//循环帧id
score=0,//得分
star_state=1,//开始事件状态
begintime;
$(function(){
	can=document.getElementById('canvas');
	ctx=can.getContext('2d');

	can.width=scr_w;
	can.height=scr_h;
	if(scr_w<1024){
		can.width=scr_h;
		can.height=scr_w;
		can.style.top=(scr_h-scr_w)/2+'px';
		can.style.left=(scr_w-scr_h)/2+'px';
	}
	//引入图片
	//开始图片
	var begin_bg=new Image();
	begin_bg.src='images/cover.jpg';
	begin_bg.onload=function(){}
	
	// 开始按钮
	var begin_btn=new Image();
	begin_btn.src='images/play.png';
	begin_btn.onload=function(){}
	//悬浮物图片
	var dust_pic=[];
	for(var i=0;i<7;i++){
		dust_pic[i]=new Image();
		dust_pic[i].src='images/dust'+i+'.png';
		dust_pic[i].onload=function(){};
	}
	// 食物图片
	orange_food=new Image();
	orange_food.src='images/orange_food.png';
	orange_food.onload=function(){};
	blue_food=new Image();
	blue_food.src='images/blue_food.png';
	blue_food.onload=function(){};
	//大鱼图片
	//身体
	mombody={orange:[],blue:[]};
	for(var i=0;i<8;i++){
		mombody['orange'][i]=new Image();
		mombody['orange'][i].src='images/bigSwim'+i+'.png';
		mombody['orange'][i].onload=function(){};
		mombody['blue'][i]=new Image();
		mombody['blue'][i].src='images/bigSwimBlue'+i+'.png';
		mombody['blue'][i].onload=function(){};
	}
	// 眼睛
	momeye=[];
	for(var i=0;i<2;i++){
		momeye[i]=new Image();
		momeye[i].src='images/bigEye'+i+'.png';
		momeye[i].onload=function(){};
	}
	// 尾巴
	momtail=[];
	for(var i=0;i<8;i++){
		momtail[i]=new Image();
		momtail[i].src='images/bigTail'+i+'.png';
		momtail[i].onload=function(){};
	}
	//小鱼图片
	//身体
	babybody=[];
	for(var i=0;i<20;i++){
		babybody[i]=new Image();
		babybody[i].src='images/babyFade'+i+'.png';
		babybody[i].onload=function(){};
	}
	//眼睛
	babyeye=[];
	for(var i=0;i<2;i++){
		babyeye[i]=new Image();
		babyeye[i].src='images/babyEye'+i+'.png';
		babyeye[i].onload=function(){};
	}
	//尾巴
	babytail=[];
	for(var i=0;i<8;i++){
		babytail[i]=new Image();
		babytail[i].src='images/babyTail'+i+'.png';
		babytail[i].onload=function(){
		};
	}
	// 生成海藻
	var weed_num=50;//海藻数量
	var space_x=can.width/weed_num;
	var space_y=can.height*0.4;
	for(var i=0;i<weed_num;i++){
		var x0=space_x*i+Math.random()*space_x;
		var y0=can.height;
		var x1=x0;
		var y1=can.height-space_y+Math.random()*can.height*0.1;
		var cx=x0+space_x*0.3;
		var cy=y1+space_y*0.4;
		var v=space_x*0.03+Math.random();
		var w=space_x*0.9;
		seaweeds[i]=new seaweedObj(x0,y0,x1,y1,cx,cy,v,w);
	}
	//生成悬浮物
	var dust_num=50;//悬浮物的数量
	for(var i=0;i<dust_num;i++){
		var dust_l=can.width*0.02;
		var dust_x=Math.random()*can.width;
		var dust_y=Math.random()*can.height;
		var dust_v=space_x*0.01;
		var pic_i=Math.round(Math.random()*6);
		dusts[i]=new dustObj(dust_pic[pic_i],dust_x,dust_y,dust_v,dust_l);
	}
	//生成食物
	var food_num=20;//食物数量
	for(var i=0;i<food_num;i++){
		var food_pic;
		if(Math.random()<0.2){
			food_pic=blue_food;
		}else{	
			food_pic=orange_food;
		}
		foods[i]=new foodObj();
		foods[i].init(seaweeds,food_pic,0);
	}
	//生成大鱼
	var mom_body_w=can.width*0.05
	mom=new momObj(mom_body_w,mom_body_w/50*55);
	mom.init(can.width/2,can.height/2,'blue',0,0,0,90);
	//生成小鱼
	var baby_body_w=mom_body_w*0.6;
	baby=new babyObj(baby_body_w,baby_body_w/50*55);
	baby.init(can.width/2,can.height/2,0,0,0,90);
	
	var btn_l=Math.min(can.height,can.width)*0.2;
	babytail[babytail.length-1].onload=function(){
		ctx.drawImage(begin_bg,0,0,can.width,can.height);
		ctx.drawImage(begin_btn,(can.width-btn_l)/2,(can.height-btn_l)/2,btn_l,btn_l);
	}
	// 开始事件
	can.onclick=function(e){
		e.preventDefault();
		ex=e.clientX;
		ey=e.clientY;
		if(star_state==1 && ex>(can.width-btn_l)/2 && ex < (can.width+btn_l)/2 && ey >(can.height-btn_l)/2 && ey < (can.height+btn_l)/2){
			begintime=new Date();
			star_state=0;
			mainloop();
		}
	}
	can.addEventListener('touchstart',function(e){
		e.preventDefault();
		ex=e.touches[0].clientY;
		ey=can.height-e.touches[0].clientX;
		if(star_state==1 && ex>(can.width-btn_l)/2 && ex < (can.width+btn_l)/2 && ey >(can.height-btn_l)/2 && ey < (can.height+btn_l)/2){
			begintime=new Date();
			star_state=0;
			mainloop();
		}
	})
	//侦听鼠标
	can.onmousemove=function(e){
		e.preventDefault();
		ex=e.clientX;
		ey=e.clientY;
		mom.ex=ex;
		mom.ey=ey;
	}
	//触控事件
	can.addEventListener('touchmove',function(e){
		e.preventDefault();
		ex=e.touches[0].clientY;
		ey=can.height-e.touches[0].clientX;
		mom.ex=ex;
		mom.ey=ey;
	});
});
//主循环
function mainloop() {
	animation=requestAnimFrame(mainloop);
	ctx.clearRect(0,0,can.width,can.height);
	var now_time=new Date();
	var deltime=now_time-begintime;

	//水草
	for(var i=0;i<seaweeds.length;i++){
		seaweeds[i].draw(ctx);
		seaweeds[i].update(deltime);
	}
	//悬浮物
	for (var i = 0; i < dusts.length; i++) {
		dusts[i].draw(ctx);
		dusts[i].update(deltime);
	}
	// 大鱼
	mom.draw(ctx);
	mom.update(deltime);
	//小鱼
	baby.ex=mom.x;
	baby.ey=mom.y;
	baby.draw(ctx);
	baby.update(deltime);
	if(baby.bodytimer>baby_max_time){
		gameover();
	}
	//食物
	var food_pic;
	if(Math.random()<0.2){
		food_pic=blue_food;
	}else{	
		food_pic=orange_food;
	}
	for(var i=0;i<foods.length;i++){
		if(foods[i]['y']<0){
			foods[i].init(seaweeds,food_pic,0);
		}
		// 大鱼吃食
		var mfd=Math.pow(foods[i]['x']-mom.x,2)+Math.pow(foods[i]['y']-mom.y,2);
		if(mfd<Math.pow(Math.min(mom.body_w,mom.body_h)*0.4,2)){//
			
			wave[wave.length]=new waveObj();
			var max_r=(Math.random()+0.5)*Math.min(can.height,can.width)*0.1;
			var line_w=can.height*0.002;
			wave[wave.length-1].init(foods[i].x,foods[i].y,0,max_r,line_w,'#fff');
			if(foods[i].pic.src==blue_food.src){
				mom.bodycolor='blue';
				mom.bodynum+=2;
			}else{
				mom.bodycolor='orange';
				mom.bodynum+=1;
			}
			//重置食物
			foods[i].init(seaweeds,food_pic,0);
		}
		foods[i].draw(ctx);
		foods[i].update();
	}
	//大鱼喂小鱼
	var mbd=Math.pow(baby.x-mom.x,2)+Math.pow(baby.y-mom.y,2);
	if(mbd<Math.pow(Math.min(mom.body_w,mom.body_h)*0.5,2)){
		if(mom.bodynum>0){
			wave[wave.length]=new waveObj();
			var max_r=(Math.random()+0.5)*Math.min(can.height,can.width)*0.1;
			var line_w=can.height*0.005;
			wave[wave.length-1].init(baby.x,baby.y,0,max_r,line_w,'orange');
			baby.bodynum=0;
			score+=mom.bodynum;
			mom.bodynum=0;
		}
	}
	//波浪
	for(var i=0;i<wave.length;i++){
		wave[i].draw(ctx);
		wave[i].update(deltime);
		if(wave[i]['status']==0){
			wave.splice(i,1);
		}
	}
	//得分
	ctx.textAlign='center';
	ctx.textBaseline='center';
	var fsize=Math.min(can.height,can.width)*0.05
	ctx.font=fsize+'px Verdana';
	ctx.fillStyle='#fff';
	ctx.fillText('score:'+score,can.width/2,can.height*0.9);

	begintime=now_time;
}
function gameover(){
	window.cancelAnimationFrame(animation);
	var maxsize=can.height*0.2;
	
	ctx.font=maxsize+'px Verdana';
	ctx.fillStyle='#fff';
	ctx.textAlign='center';
	ctx.textBaseline='middle';
	ctx.fillText('Gameover',can.width/2,can.height/2);	
}
//循环
window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
			return window.setTimeout(callback, 1000 / 60);
		};
})();
