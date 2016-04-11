window.onload=function(){
	//获取元素
	var imusic=document.getElementById('music');
	var taudio=document.getElementsByTagName('audio')[0];
	var page1=document.getElementById('page1');	
	var page2=document.getElementById('page2');
	var page3=document.getElementById('page3');
	//当音乐播放完毕，使图标停止旋转并回到初始状态
	taudio.addEventListener("ended",function(event){
		imusic.setAttribute("class","");
	},false);
	//点击音乐图标实现音乐的暂停播放
	/*imusic.onclick=function(){//这是点击事件
		if(taudio.paused){
			taudio.play();
			//this.setAttribute("class","play");
			this.style.animationPlayState="running";
		}else{
			taudio.pause();
			//this.setAttribute("class","");
			this.style.animationPlayState="paused";
		}
	}*/
	imusic.addEventListener("touchstart",function(event){//侦听触摸事件
		if(taudio.paused){
			taudio.play();
			this.style.animationPlayState="running";
		}else{
			taudio.pause();
			this.style.animationPlayState="paused";
		}
	},false);
	//点击屏幕翻页
	page1.addEventListener("touchstart",function(event){
		page1.style.display="none";
		page2.style.display="block";
		page3.style.display="block";
		page3.style.top="100%";
		setTimeout(function(){
			page2.setAttribute("class","page fadeOut");
			page3.setAttribute("class","page fadeIn");
		},5000) 	
	},false);
}