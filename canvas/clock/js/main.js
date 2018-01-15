var can,
ctx,
scr_w=document.body.clientWidth,
scr_h=document.body.clientHeight,
allnum=[],//存储6个数字
moveballs=[];
window.onload=init;
function init() {
	can=document.getElementById('canvas');
	ctx=can.getContext('2d');
	can.width=scr_w*0.6;
	can.height=scr_h*0.6;
	
	if(scr_w<=1024){
		can.width=scr_h*0.8;
		can.height=scr_w*0.8;
		can.style.top=(scr_h-can.height)/2+'px';
		can.style.left=(scr_w-can.width)/2+'px';
	}

	var num_w=can.width*0.12;//一个数字的宽度
	var num_h=num_w/7*10;//一个数字的高度
	var space=0.01*can.width;//数字之间间隔
	for(var i=0;i<6;i++){
		if(i<2){
			allnum[i]=new numObj(0,0.065*can.width+(space+num_w)*i,0.05*can.height,num_w,num_h);//0.065左边距
		}else if(i<4){
			allnum[i]=new numObj(0,(0.065+0.05)*can.width+(space+num_w)*i,0.05*can.height,num_w,num_h);//0.05中间点的宽度
		}else if(i<6){
			allnum[i]=new numObj(0,(0.065+0.05*2)*can.width+(space+num_w)*i,0.05*can.height,num_w,num_h);	
		}
	}

	mainLoop();
}
/**
 * 主循环
 */
function mainLoop() {
	ctx.clearRect(0,0,can.width,can.height);
	gettime();
	for(var i=0;i<moveballs.length;i++){
		for(var j=0;j<moveballs[i].length;j++){
			if(moveballs[i][j].x<0 || moveballs[i][j].x>can.width){
				moveballs[i].splice(j,1);
			}else{
				moveballs[i][j].draw(ctx);
				moveballs[i][j].update(can);
			}
		}
	}
	drawpoint();
	for(var i=0;i<allnum.length;i++){
		allnum[i].draw(ctx);
	}
	window.requestAnimFrame(mainLoop);
}
/**
 * 绘制表盘上时分以及分秒之间的间隔点
 */
function drawpoint() {
	var num_w=can.width*0.12;//一个数字的宽度
	var num_h=num_w/7*10;//一个数字的高度
	var the_radius=Math.min(num_w/7,num_h/10);
	//第一个点
	var x1=(0.065+0.25+0.05/2)*can.width;
	var y1=0.05*can.height+0.3*num_h;
	var x2=(0.065+0.25*2+0.05+0.05/2+0.01)*can.width;
	var y2=0.05*can.height+0.7*num_h;

	var ball1=new ballObj(x1,y1,the_radius,0,0,'red');
	ball1.draw(ctx);
	var ball2=new ballObj(x2,y1,the_radius,0,0,'red');
	ball2.draw(ctx);
	var ball3=new ballObj(x2,y2,the_radius,0,0,'red');
	ball3.draw(ctx);
	var ball4=new ballObj(x1,y2,the_radius,0,0,'red');
	ball4.draw(ctx);
}
/**
 * 获取当前时间并保存到数组中
 * @return {[type]} [description]
 */
function gettime() {
	var nowtime=new Date();
	var hours=nowtime.getHours();
	if(allnum[0].num!=parseInt(hours/10)){
		changeNum(allnum[0]);
		allnum[0].num=parseInt(hours/10);
	}
	if(allnum[1].num!=hours%10){
		changeNum(allnum[1]);
		allnum[1].num=hours%10;
	}
	var minites=nowtime.getMinutes();
	if(allnum[2].num!=parseInt(minites/10)){
		changeNum(allnum[2]);
		allnum[2].num=parseInt(minites/10);
	};
	if(allnum[3].num!=minites%10){
		changeNum(allnum[3]);
		allnum[3].num=minites%10;
	}
	var seconds=nowtime.getSeconds();
	if(allnum[4].num!=parseInt(seconds/10)){
		changeNum(allnum[4]);
		allnum[4].num=parseInt(seconds/10);
	}
	if(allnum[5].num!=seconds%10){
		changeNum(allnum[5]);
		allnum[5].num=seconds%10;
	}
}
/**
 * 更新时间获取动态小球
 * @param  {[type]} $cnobj 变化的数字
 */
function changeNum($cnobj) {
	var movenum=$cnobj.update();
	moveballs.push(movenum);
}
//循环帧
window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
			return window.setTimeout(callback, 1000 / 60);
		};
})();