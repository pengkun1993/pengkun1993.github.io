function BoyWalk() {
	var container=$("#content");

	var visualWidth=container.width();
	var visualHeight=container.height();
	//获取数据
	var getValue=function(classname){
		var $elem=$(''+classname+'');
		return {
			height:$elem.height(),
			top:$elem.position().top,
		}
	}
	// 路的Y轴
	var pathY=function(){
		var data=getValue('.a_background_middle');
		return data.top+data.height/2;
	}();
	var $boy=$('#boy');
	var boyWidth=$boy.width();
	var boyHeight=$boy.height();
	// 修正小男孩的位置
	$boy.css({
		top:pathY-boyHeight+25,
	});
	// 暂停走路
	function pauseWalk() {
		$boy.addClass('pauseWalk');
	}
	// 恢复走路
	function restoreWalk() {
		$boy.removeClass('pauseWalk');
	}
	//css3动作变化
	function slowWalk() {
		$boy.addClass('slowWalk');
	}
	// 用transition做运动
	function startRun(options,runTime) {
		var dfdPlay=$.Deferred();
		// 恢复走路
		restoreWalk();
		// 运动属性
		$boy.transition(
			options,
			runTime,
			'linear',
			function(){
				dfdPlay.resolve();//动画完成
			});
		return dfdPlay;
	}
	// 开始走路
	function walkRun(time,dist,disY) {
		time=time || 3000;
		// 脚动作
		slowWalk();
		// 开始走路
		var d1=startRun({
			'left':dist+'px',
			'top':disY ? disY :undefined,
		},time);
		return d1;
	}
	// 计算移动距离
	function calculateDist(direction,proportion) {
		return (direction=="x"?visualWidth : visualHeight)*proportion;
	}
	return {
		// 开始走路
		walkTo:function(time,proportionX,proportionY){
			var distX=calculateDist('x',proportionX);
			var distY=calculateDist('y',proportionY);
			return walkRun(time,distX,distY)
		},
		//停止走路
		stopWalk:function(){
			pauseWalk();
		},
		setColor:function(value){
			$boy.css('background-color',value);
		},
	}
}