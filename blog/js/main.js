$(function(){
	//li颜色渐深
	$('#three li').each(function(index,event){
		index=index%5;
		var rgb=150-index*30;
		$(event).css({'background-color':'rgba('+rgb+','+rgb+','+rgb+',0.3)'});
	})
	//canvas方块
	var c_w=$('#two .icon').css('width');
	$('#two .icon').css({'height':c_w,'line-height':c_w});
	
	//fullpage插件设置
	$('#fullpage').fullpage({
		resize:true,
		navigation:true,
		navigationPosition:'right',
		navigationColor:"#fff",
		scrollOverflow:true,
	});
});