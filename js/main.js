$(function(){
	//two，icon正方形
	var icon_w=$('#two .icon').css('width');
	$('#two .icon').css({'height':icon_w,'line-height':icon_w});
	
	$('#fullpage').fullpage({
		resize:true,
		navigation:true,
		navigationPosition:'right',
		navigationColor:"#fff",
		scrollOverflow:true,
	});
});