$(function(){
	$('#fullpage').fullpage({
		resize:true,/*
		navigation:true,
		navigationPosition:'right',
		navigationColor:"#fff",*/
		scrollOverflow:true,
	});
	//two，icon正方形
	var icon_w=$('#two .icon').css('width');
	$('#two .icon').css({'height':icon_w,'line-height':icon_w});
	//Three,square正方形颜色
	$('#three .square').each(function(index,element){
		var color_num=150-index%5*30;
		$(this).css('background-color','rgba('+color_num+','+color_num+','+color_num+',0.3)');
	});
});