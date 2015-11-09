
//做数据缓存用，
expressData = '';
advanceData = '';

// 调用juicer 解析 模板，返回 html
function juicerTpl(domID, mockData) {
	// juicer 编译 前端模板

	var juicerTpl = document.getElementById(domID).innerHTML;
	return  juicer(juicerTpl, mockData);
}



// 初始化界面
/*
url	 请求的地址
func 传入函数的名称 func 的唯一参数是url的返回值。
这个值是json格式的。

*/
function initPage(url, recvData, func) {

	$.ajax({
		type: "GET",
		url: url,
		dataType:"json",
		success:function(mockdata) {
			recvData = mockdata;
			if (func != undefined) {
				func(mockdata);
			}
		}, 
		error: function () {
			alert("error");
		}
	});
}


// 确定传入的 initData 是你要操作数据的上一层
// template 是模板
// 返回值是 编译出来的 html 的追加字符串
function initTemplate(initData, templateTest) {
	
	juicer.set('cache',true);
	juicer.set('errorhandling',false);
	juicer.set('strip',true);
	juicer.set('detection',false);

	// console.log(initData);
	return juicer(templateTest, initData);
}



// 初始处理
function initCheckMail(mockData) {
	var addHtml = juicerTpl('hg-tpl-id-one', mockData);
}




// 函数自执行 初始化 iscroll 组件， 进行滚动控制。
function initIScroll(iscrollID) {
	new IScroll(iscrollID, { mouseWheel: true });
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	// alert('initIScroll');
}


// 滑动显示 页面
var setEvt = '';
function moveScreemRightToLeft(pageIDshow, pageIDhidden) {
	if ($(pageIDshow).css('left') != '0%') {
		$(pageIDshow).css('left', (parseInt($(pageIDshow).css('left')) - 10) + '%');
		// alert('moveScreemRightToLeft');
	}
	else {
		clearInterval(setEvt);
		$(pageIDhidden).css('display', 'none');
		initIScroll('#wrapperTwo');
	}

}









