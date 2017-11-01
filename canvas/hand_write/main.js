var can,
ctx,
scr_w=document.body.clientWidth,
scr_h=document.body.clientHeight,
write_state=0,
lastpoint,
lasttime,
the_color='black';
window.onload=init;
function init() {
	can=document.getElementById('canvas');
	ctx=can.getContext('2d');console.log(ctx);
	can.height=can.width=scr_h*0.75;
	var colorbtn=document.getElementById('color_btn');
	var clearbtn=document.getElementById('clear');
	var cbtns=colorbtn.getElementsByTagName('button');
	if(scr_w<=1024){
		can.height=can.width=scr_w*0.9;
		colorbtn.style.width=can.height+'px';
		colorbtn.style.height=can.width/8+'px';
		colorbtn.style.top=scr_h*0.05+can.height+(scr_h*0.95-can.height)*0.2+'px';
		for(var i=0;i<cbtns.length;i++){
			cbtns[i].style.width=colorbtn.offsetHeight+'px';
		}
		clearbtn.style.height=colorbtn.offsetHeight+'px';
		clearbtn.style.width=colorbtn.offsetHeight*2+'px';
		clearbtn.style.top=(scr_h*0.95-can.height)*0.2+colorbtn.offsetTop+colorbtn.offsetHeight+'px';
	}else{
		colorbtn.style.width=can.width+'px';
		colorbtn.style.height=can.width/7+'px';
		for(var i=0;i<cbtns.length;i++){
			cbtns[i].style.width=colorbtn.offsetHeight+'px';
		}
		clearbtn.style.height=colorbtn.offsetHeight+'px';
		clearbtn.style.width=colorbtn.offsetHeight*2+'px';
		clearbtn.style.left=can.offsetLeft+can.width+'px';
	}

	drawmatt();

	can.onmousedown=function (e) {
		e.preventDefault();
		write_state=1;
		var ex=e.clientX-can.offsetLeft;
		var ey=e.clientY-can.offsetTop;
		lastpoint={x:ex,y:ey,w:10}
		lasttime=new Date();
	}
	can.onmousemove=function (e) {
		e.preventDefault();
		if(write_state==1){
			var ex=e.clientX-can.offsetLeft;
			var ey=e.clientY-can.offsetTop;
			if(ex<can.height*0.05 || ex >can.height*0.95 || ey<can.height*0.05 || ey >can.height*0.95){
				write_state=0;
			}else{
				var curpoint={x:ex,y:ey,w:10};
				painting(lastpoint,curpoint);
			}
		}
	}
	can.onmouseup=function (e) {
		e.preventDefault();
		write_state=0;
	}
	can.onmouseout=function (e) {
		e.preventDefault();
		write_state=0;
	}

	can.addEventListener('touchstart',function(e){
		e.preventDefault();
		write_state=1;
		var ex=e.touches[0].clientX-can.offsetLeft;
		var ey=e.touches[0].clientY-can.offsetTop;
		lastpoint={x:ex,y:ey,w:10}
		lasttime=new Date();
	});
	can.addEventListener('touchmove',function(e){
		e.preventDefault();
		if(write_state==1){
			var ex=e.touches[0].clientX-can.offsetLeft;
			var ey=e.touches[0].clientY-can.offsetTop;
			if(ex<can.height*0.05 || ex >can.height*0.95 || ey<can.height*0.05 || ey >can.height*0.95){
				write_state=0;
			}else{
				var curpoint={x:ex,y:ey,w:10};
				painting(lastpoint,curpoint);
			}
		}
	});
	can.addEventListener('touchend',function(e){
		e.preventDefault();
		write_state=0;
	});
}
/**
 * 绘制田字格
 */
function drawmatt() {
	ctx.save();
	ctx.lineWidth=5;
	ctx.strokeStyle='red';
	ctx.strokeRect(can.height*0.05,can.height*0.05,can.height*0.9,can.height*0.9);

	ctx.lineWidth=2;
	ctx.strokeStyle='red';
	ctx.setLineDash([15,5]);
	ctx.beginPath();
	ctx.moveTo(can.height*0.05,can.height*0.05);
	ctx.lineTo(can.height*0.95,can.height*0.95);
	ctx.moveTo(can.height*0.05,can.height*0.95);
	ctx.lineTo(can.height*0.95,can.height*0.05);
	ctx.moveTo(can.height*0.05,can.height*0.5);
	ctx.lineTo(can.height*0.95,can.height*0.5);
	ctx.moveTo(can.height*0.5,can.height*0.05);
	ctx.lineTo(can.height*0.5,can.height*0.95);
	ctx.stroke();
	ctx.restore();
}
/**
 * 书写
 * @param  {obj} $lastpoint 上一笔位置
 * @param  {obj} $curpoint  当前笔位置
 */
function painting($lastpoint,$curpoint) {
	//计算线条的宽度
	var len=Math.pow((Math.pow($curpoint.x-$lastpoint.x,2)+Math.pow($curpoint.y-$lastpoint.y,2)),1/2);
	var nowtime=new Date();
	var deltime=nowtime-lasttime;
	var v=(len/deltime)*10;
	//线条宽度最大20；最小5；速度最大20,最小1
	var the_w=20-(20-5)/(20-1)*v;
	if(the_w>20){
		the_w=20;
	}else if(the_w<5){
		the_w=5;
	}
	$curpoint.w=the_w*0.3+$lastpoint.w*0.7;
	ctx.beginPath();
	ctx.moveTo($curpoint.x,$curpoint.y);
	ctx.lineTo($lastpoint.x,$lastpoint.y);
	ctx.lineWidth=$curpoint.w;
	ctx.lineCap='round';
	ctx.lineJoin='round';
	ctx.strokeStyle=the_color;
	ctx.stroke();
	ctx.restore();

	lastpoint=$curpoint;
	lasttime=nowtime;
}
function changecolor($this) {
	the_color=$this.value;
}
function clearall() {
	ctx.clearRect(0,0,can.width,can.height);
	drawmatt();
}