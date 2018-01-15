var can,
ctx,
scr_w=document.body.clientWidth,
scr_h=document.body.clientHeight,
img,
timer,
showpic_timer,//显示全图的计时器
circle,//探照灯位置大小参数
RADIUS,//初始半径
SPEED,//初始速度
click_state=0,//记录点击状态
erasure_state=0,//记录是否是擦除状态，1是0否
showpic_state=0;//是否显示全图状态，1是0否
window.onload=init;
/**
 * 初始化
 */
function init() {
	can=document.getElementById('canvas');
	ctx=can.getContext('2d');
	can.width=scr_w*0.6;
	can.height=scr_h*0.8;
	//手机屏幕
	if(scr_w<=1024){
		can.width=scr_w*0.8;
		can.height=scr_h*0.6;
	}

	RADIUS=Math.min(can.height,can.width)*0.1;
	SPEED=Math.min(can.height,can.width)*0.005;
	circle={x:can.width/2,y:can.height/2,r:RADIUS,vx:SPEED,vy:SPEED}

	img=new Image();
	img.src='main.jpg';
	img.onload=function () {
		mainLoop();
	}

	can.onmousedown=function(e){
		if(e.button==0 && showpic_state==0){
			e.preventDefault();
			click_state=1;
			circle.x=e.clientX-(scr_w-can.width)/2;
			circle.y=e.clientY-scr_h*0.1;
			draw();
			window.cancelAnimationFrame(timer);
		};
	}
	can.onmousemove=function(e){
		if(e.button==0 && click_state==1 && showpic_state==0){
			e.preventDefault();
			circle.x=e.clientX-(scr_w-can.width)/2;
			circle.y=e.clientY-scr_h*0.1;
			draw();
		};
	}
	can.onmouseup=function(e){
		if(e.button==0 && click_state==1 && showpic_state==0){
			e.preventDefault();
			click_state=0;
			if(erasure_state==0){
				mainLoop();
			}
		};
	}
	can.onmouseout=function(e){
		if(e.button==0 && click_state==1 && showpic_state==0){
			e.preventDefault();
			if(erasure_state==0){
				click_state=0;
				mainLoop();
			}
		};
	}
	// 触控事件
	can.addEventListener('touchstart',function(e){
		if(click_state==0 && showpic_state==0){
			e.preventDefault();
			click_state=1;
			circle.x=e.touches[0].clientX-(scr_w-can.width)/2;
			circle.y=e.touches[0].clientY-scr_h*0.05;
			draw();
			window.cancelAnimationFrame(timer);
		}
	});
	can.addEventListener('touchmove',function(e){
		if(click_state==1 && showpic_state==0){
			e.preventDefault();
			circle.x=e.touches[0].clientX-(scr_w-can.width)/2;
			circle.y=e.touches[0].clientY-scr_h*0.05;
			draw();
		}
	});
	can.addEventListener('touchend',function(e){
		if(click_state==1 && showpic_state==0){
			e.preventDefault();
			click_state=0;
			if(erasure_state==0){
				click_state=0;
				mainLoop();
			}
		};
	});
}

/**
 * 主循环
 */
function mainLoop() {
	draw();
	update();
	timer=window.requestAnimFrame(mainLoop);
}
/**
 * 绘制图形
 */
function draw() {
	ctx.beginPath();
	if(erasure_state==0){
		ctx.fillStyle='#000';
		ctx.fillRect(0,0,can.width,can.height);
	}

	ctx.save();
	
	ctx.arc(circle.x,circle.y,circle.r,0,2*Math.PI);
	ctx.clip();

	ctx.drawImage(img,0,0,can.width,can.height);
	ctx.restore();
}
/**
 * 动态跟新探照灯的位置
 */
function update() {
	circle.x+=circle.vx;
	circle.y+=circle.vy;
	if(circle.x<circle.r){
		circle.x=circle.r;
		circle.vx=-circle.vx;
	}else if(circle.x > can.width-circle.r){
		circle.x=can.width-circle.r;
		circle.vx=-circle.vx;
	}
	if(circle.y<circle.r){
		circle.y=circle.r;
		circle.vy=-circle.vy;
	}else if(circle.y > can.height-circle.r){
		circle.y=can.height-circle.r;
		circle.vy=-circle.vy;
	}
}
/**
 * 擦除效果和探照效果交换
 * @param  {obj} $this 按钮本身
 */
function erasure($this) {
	//显示全图后点击该按钮激活
	showpic_state=0;
	cancelAnimationFrame(timer);
	cancelAnimationFrame(showpic_timer);
	mainLoop();
	circle.r=RADIUS;
	//更换状态		
	var show_state=document.getElementById('show_state');
	if($this.value==0){//不擦除状态
		$this.value=1;
		erasure_state=0;
		$this.innerText='擦除效果';
		show_state.innerText='探照灯';
	}else{//擦除状态
		ctx.fillStyle='#000';
		ctx.fillRect(0,0,can.width,can.height);
		$this.value=0;
		erasure_state=1;
		$this.innerText='探照效果';
		show_state.innerText='橡皮擦';
	}
}
/**
 * 显示全图
 */
function showpic() {
	showpic_state=1;
	cancelAnimationFrame(timer);
	showpic_timer=setInterval(function(){
		if(showpic_state==1){
			circle.r+=5;
			if(circle.r*circle.r >Math.pow(can.height,2)+Math.pow(can.width,2)){
				clearInterval(showpic_timer);
			}
			draw();
		}
	},10);
}
//循环帧
window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
			return window.setTimeout(callback, 1000 / 60);
		};
})();