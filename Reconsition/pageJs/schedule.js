$(function () {
	

// 规则
// status 1代表实心、2代表空心、3代表对号、4代表错号 
 	 // 		   {
     // 	           "note": "申请开票",
     //                "status": 1
     //            },
     //            {
     //                "note": "待审核",
     //                "status": 1
     //            },
     //            {
     //                "note": "已审核",
     //                "status": 1
     //            },
     //            {
     //                "note": "已开票",
     //                "status": 1
     //            },
     //            {
     //                "note": "已邮寄",
     //                "status": 3
     //            }
/*
×
<span class="mail-status-gui-point-max">
	<span class="icon-two">&#xf077;</span>
</span>

实心圈
<span class="mail-status-gui-point"></span>

对
<span class="mail-status-gui-point-max">
	<span class="icon-two">&#xf078;</span>
</span>

空心圈
.mail-status-gui-grey-point


-----------------------------------
实线
mail-status-gui-line

灰线
mail-status-gui-not-line


<span class="mail-status-gui-right">
	<div class="mail-status-gui-line"></div>
</span>

<span class="mail-status-gui-left">
	<span class="mail-status-gui-not-line"></span>
</span>

*/
	var advanceData = {
						"ver": "1.0",
						"ret": true,
						"errcode": 0,
						"errmsg": "",
						"data": {
							"invoiceInfo": {
								"buyCompany": "邵麟",
								"invoiceComment": "酒店名称：贵阳空港君亿豪城大酒店\n入离店时间：2015-09-19 2015-09-20",
								"invoiceAmount": "250.0",
								"recipient": "邵麟",
								"address": "贵州省盘县柏果镇朝阳小学",
								"invoiceDoc": "CAL000000000009289",
								"mailNo": "588073602830",
								"mailCompany": "天津申通（到付）",
							"companyCode":"shengtong",
							"companyImg":"none",
								"expressStatsName": "运输中"
							},
							"invoiceAdvance": {

								"invoiceNoteList": [
									{
										"note": "申请开票",
										"status": 1
									},
									{
										"note": "待审核",
										"status": 1
									},
									{
										"note": "已审核",
										"status": 1
									},
									{
										"note": "已开票",
										"status": 1
									},
									{
										"note": "已邮寄",
										"status": 3
									}
								],
								"invoiceAdvanceList": [
									{
										"invoiceStatus": 1,
										"title": "已邮寄",

										"content": "您的发票已经开具啦！1 天内将有快递员开始派送哦~"
									},
									{
										"invoiceStatus": 1,
										"title": "已开票",
										"content": "您的发票已经开具啦！1 天内将有快递员开始派送哦~"
									},
									{
										"invoiceStatus": 1,
										"title": "已审核",
										"content": "您的发票信息已经核实无误啦！开票大概需要1天时间，请耐心等待~"
									},
									{
										"invoiceStatus": 1,
										"title": "待审核",
										"content": "已经有发票专员在核实您的发票信息咯，审核大概需要1 天的时间，请耐心等待~"
									},
									{
										"invoiceStatus": 1,
										"title": "申请开票",
										"content": "申请开票成功。该订单状态变为“已离店”后，将会有发票专员为您核实发票信息。"
									}
								]
							}
						}
					};

			
	
	// 获取中心圆圈原点类型
	function getPointType (numcase) {

		var re = '<span class="mail-status-gui-';
		switch (numcase) {
			case 1:
				return re += 'point"></span>';
			
			case 2:
				return re += 'grey-point"></span>';

			case 3:
				return re += 'point-max"><span class="icon-two">&#xf078;</span></span>';

			case 4:
				return re += 'point-max"><span class="icon-two">&#xf077;</span></span>';

			default:
				break;
		}

	}



	// 获取线的类型
	// 思路，通过逻辑来判断，
	// 右边的线永远关注上一个节点
	// 左边的哦线，关注当前节点
	// 思路以后，决定，每次传入的都是next一个节点的状态。所以不重要。

	function getLineType (numcase) {
		if (numcase != 2) {		//只要不是空心的，都证明已经走到这里了
			return '<span class="mail-status-gui-right"><div class="mail-status-gui-line"></div></span>';
		}
		else {
			return '<span class="mail-status-gui-right"><div class="mail-status-gui-not-line"></div></span>';
		}
	}


	/*
		给状态动态实现模板 
		statusStr html字符串
		note 状态
		status 圆圈的状态
		num 第几个状态
		length 节点的个数，最后一个节点，无右边
	*/ 

    function addClassStatus(note, maildata, num, length) {
    	var leftline = rightline = centerPoint = "";

    	if (num == 0) {					// 第一个点 ，没有左面的线。
    		rightline = getLineType (maildata[num + 1].status);
    	}
    	else if (num == length) {		// 最后一个点，无右边。
    		leftline = getLineType (maildata[num].status);
    	}
    	else {

    		//这里的设计，还是有点意思的，永远都是相对于线的有节点。
    		leftline = getLineType (maildata[num].status);		
    		rightline = getLineType (maildata[num + 1].status);
    	}

    	centerPoint = getPointType(maildata[num].status);		//获取中间节点


		return  '<div class="mail-state-flex">' +
					'<div class="mail-status-gui">' +
						'<span class="mail-status-gui-left">' +
							leftline  +
						'</span>' +
							centerPoint +
						'<span class="mail-status-gui-right">' +
							 rightline +
						'</span>' +
					'</div>' +
					
					'<div class="mail-status-content">' +
						'<span class="mail-status-content-discribe">' +
							note +
						'</span>' +
					'</div>' +
				'</div>' ;
	}


	// 初始化邮递数据
	function handlemaildata(maildata) {
		var statusStr = '';

		for (var i = 0; i <=  maildata.length - 1; i++) {

			switch (maildata[i].status) {
				case 1: 
					statusStr += addClassStatus(maildata[i].note, maildata, i,  maildata.length - 1);
					break;
				case 2: 
					statusStr += addClassStatus(maildata[i].note, maildata, i,  maildata.length - 1);
					break;
				case 3: 
					statusStr += addClassStatus(maildata[i].note, maildata, i,  maildata.length - 1);
					break;
				case 4: 
					statusStr += addClassStatus(maildata[i].note, maildata, i,  maildata.length - 1);
					break;

				default:
					break;
			}
		}

		statusStr = '<!--  包含 发票进度 的头部，以及图像显示， 状态提示。-->\
						<div class="invoiceSchedule-top">\
							<!-- 状态提示 包含 水平横线 和 小圆圈 以及下面的提示文字 -->\
							<div class="mail-state">\
								<!-- 追加图像信息  显示横杠和小圆圈 -->' + 
									statusStr +
						   '</div>\
						</div>';


		return statusStr;
	}




	//advanceData.data.invoiceAdvanceList
	function initlogiticRoadHtml (roadData) {

		var status = '';
		var reStr = '';
		for (var i = 0; i <= roadData.length - 1; i++) {
		// for (var i = 0; i < 1; i++) {
			status = 'pro';
			if (i == 0) {
				status = 'cur';
			}
			reStr += '<div class="logisticStatus-road-' + status + '">' +
					  '<div class="logisticStatus-road-' + status + '-number">' + (roadData.length - i) + '</div>'
					  + roadData[i].title + '</div>\
					  <div class="logisticStatus-road-data">2015-04-02 18:14:32</div>\
					  <p class="logisticStatus-road-content">' + roadData[i].content + '</p>';
		
			if (i != roadData.length - 1){
				reStr += '<div class="blank-line-in-road"></div>';
			}
			
		}

		return reStr;
	}




	var mailData = '<!-- 显示 快递内容信息 -->\
					<div class="mail-msg">\
						<!-- 追加 快递 路径 信息 -->\
						<div class="mail-msg-status">\
							<div class="mail-msg-status-title">\
									<div class="mail-msg-status-title-lable">快递</div>\
									<div class="mail-msg-status-title-company">'+
										advanceData.data.invoiceInfo.mailCompany +
									'</div>\
							</div>\
							<div class="mail-msg-status-state">\
									<div class="mail-msg-status-state-lable">状态</div>\
									<p class="mail-msg-status-state-comtent">' +
										  advanceData.data.invoiceInfo.expressStatsName +
									'</p>\
									<!-- 屏幕右侧的 右箭头 > 定宽 -->\
									<div class="mail-msg-goIcon">\
				 						<div class="icon-go">&#xf07f;</div>\
									</div>\
							</div>\
						</div>\
					</div>\
					<hr class="mail-line-space">\
					<div class="mail-data">\
						<div class="mail-data-title">\
							<div class="mail-data-title-lable">抬头</div>\
							<div class="mail-data-title-company">' + advanceData.data.invoiceInfo.buyCompany + '</div>\
						</div>\
						<div class="mail-data-mark">\
							<div class="mail-data-mark-lable">备注</div>\
							<p class="mail-data-mark-comtent">' + advanceData.data.invoiceInfo.invoiceComment + '</p>\
						</div>\
						<div class="mail-data-mark">\
							<div class="mail-data-mark-lable">金额</div>\
							<p class="mail-data-mark-comtent">￥' + advanceData.data.invoiceInfo.invoiceAmount + '</p>\
						</div>\
						<!-- <hr class="mail-line-space"> -->\
					</div>\
					<hr class="mail-line-space">\
					<!-- 收件人信息 -->\
					<div class="mail-user-data">\
						<div class="mail-user-data-person">\
							<div class="mail-user-data-person-lable">收件人</div>\
							<div class="mail-user-data-person-data">' + advanceData.data.invoiceInfo.recipient + ' 111××××1111</div>\
						</div>\
						<div class="mail-user-data-person">\
							<div class="mail-user-data-person-lable">地址</div>\
							<div class="mail-user-data-person-lable">' + advanceData.data.invoiceInfo.address + '</div>\
						</div>\
					</div>';





	function initPage(advanceData) {
		var first = handlemaildata(advanceData.data.invoiceAdvance.invoiceNoteList);
		// console.log(first);
		var second = '<!-- 第一个 空白间隔区域 -->\
					 <div class="blank-area-one"></div>\
					 <div class="logisticStatus-road">\
						 <!-- js 添加 物流信息  -->' + 
						
						 initlogiticRoadHtml (advanceData.data.invoiceAdvance.invoiceAdvanceList) +
					 '</div>';
		var thr =  '<!-- 最后一个空白间隔区域 -->\
					<div class="space"></div>\
						<div class="bottom">\
							<div class="buttom-content">\
								<span>我要提问</span>\
							</div>\
						</div>\
					</div>';

		$(".invoiceSchedulePage-AddData").prepend(first  +  mailData + second + thr);

		initIScroll('#wrapper');

	}
	
	initPage(advanceData);
	

	var singal = false;

	$('.mail-msg-status').on('tap', 'div', function (evt) {
		var tag = evt.target;

		if (tag.nodeType == 1) {

			if (singal == false) {
				initLogisticPage();		//初始化另一张页面
				singal = true;
			}

			$('.logisticsInfoPage').css('display', 'block').css('left', '100%').css('z-index', 10);
			$('.invoiceSchedulePage').css('z-index', 1);

			setEvt = setInterval(function() {
				moveScreemRightToLeft('.logisticsInfoPage', '.invoiceSchedulePage');
			}, 200);


		}
	});
	
}); 