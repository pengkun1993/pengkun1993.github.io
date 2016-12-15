$(function(){
	//fullpage插件设置
	$('#fullpage').fullpage({
		resize:true,
		navigation:true,
		navigationPosition:'right',
		navigationColor:"#fff",
		scrollOverflow:true,
	});
	//li颜色渐深
	$('#three li').each(function(index,event){
		index=index%5;
		var rgb=150-index*30;
		$(event).css({'background-color':'rgba('+rgb+','+rgb+','+rgb+',0.3)'});
	})
});