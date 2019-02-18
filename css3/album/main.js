var state=0;
var angle_x=0;
var angle_y=0;
var lastpoint;
var iwraper;
window.onload=function(){
	iwraper=document.getElementById('wraper');
	var pics=iwraper.getElementsByTagName('div');
    //取消鼠标拖拽文件进入窗口的默认行为
    window.ondragover = function (e) {
        e.preventDefault();
    }
    window.ondrop = function (e) {
        e.preventDefault();
    }
	for(var i=0;i<pics.length;i++){
		pics[i].style.transform='rotateX(90deg) rotateY('+(i*30)+'deg) translateZ(300px)';
		//拖拽
        pics[i].index = i;
		pics[i].ondrop=function(e){
			var w = new FileReader();
			w.index=this.index;
			w.readAsDataURL(e.dataTransfer.files[0]);
			w.onload = function () {console.log(this);
                pics[this.index].style.backgroundImage = 'url(' + w.result + ')';
                pics[this.index].innerHTML = '';
            }
		}
	}
	window.addEventListener('mousedown',function(e){
		e.preventDefault();
		lastpoint={x:e.clientX,y:e.clientY};
		state=1;
	});
	window.addEventListener('mousemove',function(e){
		e.preventDefault();
		if(state==1){
			nowpoint={x:e.clientX,y:e.clientY};
			rotatef(nowpoint);
		}
	});
	window.addEventListener('mouseup',function(e){
		e.preventDefault();
		if(state==1){
			state=0;
		}
	});
	window.addEventListener('touchstart',function(e){
		e.preventDefault();
		lastpoint={x:e.touches[0].clientX,y:e.touches[0].clientY};
		state=1;
	});
	window.addEventListener('touchmove',function(e){
		e.preventDefault();
		if(state==1){
			nowpoint={x:e.touches[0].clientX,y:e.touches[0].clientY};
			rotatef(nowpoint);
		}
	});
	window.addEventListener('touchend',function(e){
		e.preventDefault();
		if(state==1){
			state=0;
		}
	});
	/*window.addEventListener('mouseout',function(e){
		e.preventDefault();
		if(state==1){
			state=0;
		}
	});*/
}
function rotatef($now){
	var del_x=$now.x-lastpoint.x;
	var del_y=lastpoint.y-$now.y;//由于坐标轴向下所以需反转

	angle_x+=del_x*0.1;
	angle_y+=del_y*0.1;
	iwraper.style.transform='rotateX('+(-90+angle_y)+'deg ) rotateZ('+angle_x+'deg) ';
	
	lastpoint=$now;
}