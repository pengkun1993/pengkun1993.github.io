$(function(){
	var container=$("#content");
	var swipe=Swipe(container);
	swipe.scrollTo(container.width(),0);
	var boy=BoyWalk();
	//开始走路
	$('buttona:first').bind('click',function(){
		// 太阳运动
		$('#sun').addClass('rotation');
		// 云运动
		$('.cloud1').addClass('cloud1Anim');
		$('.cloud2').addClass('cloud2Anim');

		boy.walkTo(2000,0.2).then(function(){
			// 第一次走路完成
			var distx=container.width()*1;
			swipe.scrollTo(distx,5000);
		}).then(function(){
			return boy.walkTo(5000,0.5);
		})
	});
	//开关门
	// 门动画
	function doorAction(left,right,time){
		var $door=$('.door');
		var doorLeft=$('.door-left');
		var doorRight=$('.door-right');
		var defer=$.Deferred();
		var count=2;
		//等待开门完成
		var complete=function(){
			if(count==1){
				defer.resolve();
			}
			count--;
		};
		doorLeft.transition({
			'left':left
		},time,complete);
		doorRight.transition({
			'right':right
		},time,complete);
		return defer;
	}
	function openDoor() {
		return doorAction('-50%','-50%',2000);
	}
	function shutDoor() {
		return doorAction('0%','0%',2000);
	}
	$("button:first").click(function(){
		openDoor().then(function(){
			$('.b_background').addClass('lamp-bright');
		});
	});
	$("button:last").click(function(){
		shutDoor().then(function(){
			$('.b_background').removeClass('lamp-bright');
		});
	});
});
