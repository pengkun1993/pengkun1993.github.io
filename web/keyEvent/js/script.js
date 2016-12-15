window.onload=function () {
  init();
  main();
}
var data,ititle,istop,timer,iplay,fage;
/**
 * 全局变量赋值
 */
function init() {
  data=['Phone5','Ipad','三星笔记本','佳能相机','惠普打印机','谢谢参与','50元充值卡','1000元超市购物券'];
  ititle=document.getElementById('title');
  istop=document.getElementById('stop');
  iplay=document.getElementById('play');
  timer=null;
  fage=false;
}
/**
 * 主函数
 */
function main() {
  //鼠标控制
  //开始
  iplay.onclick=start;
  //停止
  istop.onclick=stop;

  //键盘控制
  document.onkeyup=function(e){
    var e = e || window.event;
    if(e.keyCode==13){
      if(fage){
        stop();
        fage=false;
      }else{
        start();
        fage=true;
      }
    }
  }
}
function start() {
  window.clearInterval(timer);
  timer=setInterval(
    function(){
    var i = Math.floor(Math.random()*data.length); 
    ititle.innerHTML=data[i];
    iplay.style.backgroundColor="#ccc";
    },50
  );
}
function stop(){
    window.clearInterval(timer);
    iplay.style.backgroundColor="#036";
  }