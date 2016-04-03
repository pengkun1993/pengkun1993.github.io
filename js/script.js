window.onload=function(){
	//获取各个元素节点
	var page1=document.getElementById('page1');
	var page2=document.getElementById('page2');
	var page3=document.getElementById('page3');	

	var music=document.getElementById('music');
	var audio=document.getElementsByTagName('audio')[0];
	//设置点击碟片图标开始暂停音乐
	music.addEventListener("touchstart",function(event){
		if(audio.paused){
			this.style.animationPlayState="running";
			audio.play();
		}else{
			this.style.animationPlayState="paused";
			audio.pause();
		}
	},false);
	//音乐播放完毕后，使碟片回归原位
	audio.addEventListener("ended",function(event){
			music.setAttribute("class","");
	},false);
	//点击第一页进入第二页
	page1.addEventListener("touchstart",function(){
		page1.style.display="none";
		page2.style.display="block";
		page3.style.display="block";
		page3.style.top="100%";
		setTimeout(function(){
			page2.setAttribute("class","page fadeOut");
			page3.setAttribute("class","page fadeIn")
		},5000)
	},false);
}