var can;
var ctx;
window.onload=function(){
	//初始化
	init();

	//箭头
	//drawArrow();

	//多个折线
	//drawPolyline();

	//绘制矩形笨
	//drawRectangle(100,100,400,200,"yellow","green");x,y,w,h,b-color,f-color.....使用rgba()颜色设置透明
	//绘制矩形简洁
	//drawRectangle2(200,200,400,200,"yellow","rgba(0,256,0,0.5");

	//五角星
	//drawStar(400,300,250,150,30);//x,y,R,r,angle旋转角度

	//图形变换
	//transformTest();

	//线性颜色渐变
	//linearGradient();

	//径向颜色渐变
	//radialGradient()

	//填充重复图片
	//drawPattern()

	//看填充效果的填充方向
	fillTest()
}


function init(){
	can=document.getElementById('canvas');
	ctx = can.getContext("2d");
	can.width=800;
	can.height=600;
}
//箭头
function drawArrow(){
	ctx.beginPath();
	ctx.moveTo(200,250);
	ctx.lineTo(500,250);
	ctx.lineTo(500,200);
	ctx.lineTo(600,300);
	ctx.lineTo(500,400);
	ctx.lineTo(500,350);
	ctx.lineTo(200,350);
	//ctx.lineTo(200,250);//如此形成闭合，会有空角
	ctx.closePath();//如此形成闭合没有空角，比较好

	ctx.lineWidth=10;
	ctx.strokeStyle="red";
	ctx.fillStyle="#000";

	ctx.fill();
	ctx.stroke();//画线
	/*ctx.fillStyle="#000";
	ctx.fill();//填充*/
	//画线和填充顺序不同，选段的内侧颜色不同个，存在重叠覆盖
}

//多个折线
function drawPolyline(){
	ctx.lineWidth=20;//在那段代码前执行就对那段响应，不收beginPath()影响

	ctx.beginPath();
	ctx.moveTo(100,100);
	ctx.lineTo(250,300);
	ctx.lineTo(100,500);
	ctx.strokeStyle="green";
	ctx.lineCap="butt";//线帽，默认
	ctx.stroke();

	ctx.beginPath();/*!没有这句也不影响折线生成，但影响颜色!*/
	ctx.moveTo(350,100);
	ctx.lineTo(500,300);
	ctx.lineTo(350,500);
	ctx.lineCap="round";//圆帽,线帽属于路径应放在closePath()之前
	//ctx.lineWidth=20,
	//如此出加入该句，第二第三条折线会是20px，第一条折线是10px；
	ctx.strokeStyle="red";
	ctx.stroke();

	ctx.beginPath();/*!!*/
	ctx.moveTo(600,100);
	ctx.lineTo(750,300);
	ctx.lineTo(600,500);
	ctx.lineCap="square"//方帽
	ctx.strokeStyle="blue";
	ctx.stroke();

	//参考线,可看出线帽会多出一段
	ctx.beginPath();
	ctx.moveTo(0,100);
	ctx.lineTo(800,100);

	ctx.moveTo(0,500);
	ctx.lineTo(800,500);
	ctx.lineWidth=1;
	ctx.strokeStyle="yellow";
	ctx.stroke();
}

//绘制矩形笨
function drawRectangle(x,y,w,h,b_color,f_color) {
	
	ctx.beginPath();
	ctx.moveTo(x,y);
	ctx.lineTo(x+w,y);
	ctx.lineTo(x+w,y+h);
	ctx.lineTo(x,y+h);
	ctx.closePath();

	ctx.strokeStyle=b_color;
	ctx.lineWidth=10;
	ctx.fillStyle=f_color;

	ctx.fill();
	ctx.stroke();
}

//绘制矩形简洁
function drawRectangle2(x,y,w,h,b_color,f_color) {

	ctx.strokeStyle=b_color;
	ctx.lineWidth=10;
	ctx.fillStyle=f_color;
	//直接绘制矩形
	ctx.fillRect(x,y,w,h);
	ctx.strokeRect(x,y,w,h);
}

//绘制五角星
function drawStar(x,y,R,r,angle){
	ctx.beginPath();
	for(var i=0;i<5;i++){
		ctx.lineTo(	 R*Math.cos((18+72*i - angle)/180*Math.PI)+x,
					-R*Math.sin((18+72*i - angle)/180*Math.PI)+y
				);//大圆上的5个点
		ctx.lineTo(	r*Math.cos((54+72*i - angle)/180*Math.PI)+x,
					-r*Math.sin((54+72*i - angle)/180*Math.PI)+y
				);//小圆上的5个点
	}
	ctx.closePath();
	ctx.strokeStyle="blue";
	ctx.lineWidth=5;
	ctx.stroke();
}

//图形变换
function transformTest() {
	//transform(a,b,c,d,e,f);有6个参数，作用如下
	////////////////////////////////////////////
	//a c e
	//b d f
	//0 0 1
	////////////////////////////////////////////
	//a,d水平，垂直缩放
	//b,c水平，垂直倾斜
	//e,f水平，垂直平移
	///////////////////////////////////////////
	ctx.fillStyle="green";
	ctx.strokeStyle="black";
	ctx.lineWidth=10;
	ctx.save();
	ctx.transform(1,0,0,1,0,200);
	ctx.fillRect(100,100,300,300);
	ctx.strokeRect(100,100,300,300);
	ctx.restore();
}

//线性颜色渐变
function linearGradient() {
	ctx.beginPath();
	var grd = ctx.createLinearGradient(0,0,can.width,can.height);//变化的角度方向
	grd.addColorStop(0,"red");
	grd.addColorStop(1,"black");
	ctx.fillStyle=grd;//引入线性渐变
	ctx.fillRect(0,0,300,300);//线性渐变的位置大小
}

//径向颜色渐变
function radialGradient() {
	ctx.beginPath();
	var grd = ctx.createRadialGradient(400,300,0,400,300,300);
	grd.addColorStop(0,"red");
	grd.addColorStop(0.25,"green");
	grd.addColorStop(0.5,"blue");
	grd.addColorStop(0.75,"yellow");
	grd.addColorStop(1,"black");

	ctx.fillStyle=grd;
	ctx.fillRect(0,0,can.width,can.height);
}

//填充重复图片
function drawPattern() {
	var img=new Image();
	img.src="img/lamp.gif";
	var pat=ctx.createPattern(img,"repeat");
	ctx.rect(0,0,can.width,can.height);
	ctx.fillStyle=pat;
	ctx.fill();
}

//看填充效果的填充方向
function fillTest(){
	ctx.save();

	ctx.beginPath();
	ctx.arc(can.width*0.5,can.height*0.5,300,0,Math.PI*2);
	ctx.arc(can.width*0.5,can.height*0.5,200,0,Math.PI*2,true);//若不添加true，则两个方向一致，不符合非零环绕原则，则整个是一个蓝色的圆，加上true后，可呈现一个圆环

	ctx.fillStyle="blue";
	ctx.shadowColor="gray";
	ctx.shadowBlur=20;
	ctx.shadowOffsetX=10;
	ctx.shadowOffsetY=10;
	
	ctx.fill();

	ctx.restore();
}