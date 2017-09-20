window.onload = function() {
	init();
	drag();
}
var cTitle;
var iloginPanel;
var iboxClose;
var iloginState;
var iloginStatePanel;
var tlis;
var iloginStateShow;
var iloginStateTxt;

function init() {
	cTitle = getByClass('login_logo_webqq', 'loginPanel')[0];
	iloginPanel = document.getElementById('loginPanel');
	iboxClose = document.getElementById('ui_boxyClose');
	iloginState = document.getElementById('loginState');
	iloginStatePanel = document.getElementById('loginStatePanel');
	tlis = iloginStatePanel.getElementsByTagName('li');
	iloginStateShow = document.getElementById('loginStateShow');
	iloginStateTxt = document.getElementById('login2qq_state_txt');
}
//通过class获取对象
function getByClass(className, parent) {
	var parent = parent ? document.getElementById(parent) : document;
	var eles = [];
	var elements = parent.getElementsByTagName('*');
	for (var i = 0; i < elements.length; i++) {
		if (elements[i].className == className) {
			eles.push(elements[i]);
		}
	}
	return eles;
}
//事件调用函数
function drag() {
	//按下鼠标拖拽
	cTitle.onmousedown = fnDown;
	//关闭按钮
	iboxClose.onclick = function() {
		iloginPanel.style.display = 'none';
	};
	//显示状态下拉框
	iloginState.onclick = function(e) {
			var e = e ? e : window.event;
			if (e.stopPropagation) {
				e.stopPropagation();
			} else {
				e.cancelBubble = true;
			}
			iloginStatePanel.style.display = "block";
		}
		//添加li事件
	for (var i = 0; i < tlis.length; i++) {
		//背景颜色修改
		tlis[i].onmouseover = function() {
			this.style.backgroundColor = "gray";
		}
		tlis[i].onmouseout = function() {
				this.style.backgroundColor = "white";
			}
			//单击选定状态
		tlis[i].onclick = clickLi;
	}
	//空白处单击收起列表
	document.onclick = function() {
		iloginStatePanel.style.display = "none";
	}
}

function fnDown(event) {
	event = event || window.event;
	//鼠标距离框长度
	var disX = event.clientX - iloginPanel.offsetLeft;
	var disY = event.clientY - iloginPanel.offsetTop;
	document.onmousemove = function(event) {
			event = event || window.event;
			fnMove(event, disX, disY);
		}
		//释放鼠标
	document.onmouseup = function() {
		document.onmousemove = null;
		document.onmouseup = null;
	}
}

function fnMove(event, disX, disY) {
	var l = event.clientX - disX;
	var t = event.clientY - disY;
	var maxW = document.documentElement.clientWidth - iloginPanel.offsetWidth - 10;
	var maxH = document.documentElement.clientHeight - iloginPanel.offsetHeight;
	if (l < 0) {
		l = 0;
	} else if (l > maxW) {
		l = maxW;
	}
	if (t < 0) {
		t = 0;
	} else if (t > maxH) {
		t = maxH;
	}
	iloginPanel.style.left = l + 'px';
	iloginPanel.style.top = t + 'px';
}

function clickLi(e) {
	var e = e || window.event;
	var id = this.id;
	iloginStateShow.className = "login-state-show " + id;
	iloginStatePanel.style.display = "none";
	if (e.stopPropagation) {
		e.stopPropagation();
	} else {
		e.cancelBubble = true;
	}
	var ctext = getByClass('stateSelect_text', id)[0];
	iloginStateTxt.innerHTML = ctext['innerHTML'];
}