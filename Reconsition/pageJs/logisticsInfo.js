function initLogisticPage() {

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

										"content": "您的发票已经开具啦！1天内将有快递员开始派送哦~"
									},
									{
										"invoiceStatus": 1,
										"title": "已开票",
										"content": "您的发票已经开具啦！1天内将有快递员开始派送哦~"
									},
									{
										"invoiceStatus": 1,
										"title": "已审核",
										"content": "您的发票信息已经核实无误啦！开票大概需要1天时间，请耐心等待~"
									},
									{
										"invoiceStatus": 1,
										"title": "待审核",
										"content": "已经有发票专员在核实您的发票信息咯，审核大概需要1天的时间，请耐心等待~"
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

					
	var expressData = {
				"ver": "1.0",
				"ret": true,
				"errcode": 0,
				"errmsg": "",
				"data": {
					"expressNo": "688772329986",
					"companyCode": "longbanwuliu",
					"businessCode": "",
					"monitorStatus": "200",
					"monitorMessage": "ok",
					"ischeck": "1",
					"state": "3",
					"createTime": 1444650946000,
					"updateTime": 1444657320000,
					"expressInfoList": [
						{
							"id": 8,
							"expressNo": "688772329986",
							"companyCode": "longbanwuliu",
							"context": "派件已【签收】,签收人是【图片扫描】",
							"ftime": "2015-09-05 21:05:01",
							"status": "签收",
							"areacode": "",
							"areaname": "",
							"createTime": 1444657320000
						},
						{
							"id": 9,
							"expressNo": "688772329986",
							"companyCode": "longbanwuliu",
							"context": "【广东潮州A】的【孙少凌】正在派件",
							"ftime": "2015-09-02 19:05:29",
							"status": "派件",
							"areacode": "445100000000",
							"areaname": "广东,潮州市",
							"createTime": 1444657320000
						},
						{
							"id": 10,
							"expressNo": "688772329986",
							"companyCode": "longbanwuliu",
							"context": "【广东潮州A】的【转潮安】正在派件",
							"ftime": "2015-08-30 14:55:05",
							"status": "派件",
							"areacode": "445121000000",
							"areaname": "广东,潮州市,潮安县",
							"createTime": 1444657320000
						},
						{
							"id": 11,
							"expressNo": "688772329986",
							"companyCode": "longbanwuliu",
							"context": "快件到达【广东潮州A】",
							"ftime": "2015-08-30 14:36:19",
							"status": "在途",
							"areacode": "",
							"areaname": "",
							"createTime": 1444657320000
						},
						{
							"id": 12,
							"expressNo": "688772329986",
							"companyCode": "longbanwuliu",
							"context": "快件在【虎门分拨中心】装车,正发往【广东潮州A】",
							"ftime": "2015-08-30 05:21:15",
							"status": "在途",
							"areacode": "441961000000",
							"areaname": "广东,东莞市,虎门镇",
							"createTime": 1444657320000
						},
						{
							"id": 13,
							"expressNo": "688772329986",
							"companyCode": "longbanwuliu",
							"context": "快件到达【虎门分拨中心】",
							"ftime": "2015-08-30 00:22:17",
							"status": "在途",
							"areacode": "",
							"areaname": "",
							"createTime": 1444657320000
						},
						{
							"id": 14,
							"expressNo": "688772329986",
							"companyCode": "longbanwuliu",
							"context": "快件在【深圳固戍】装车,正发往【虎门分拨中心】",
							"ftime": "2015-08-29 22:57:46",
							"status": "在途",
							"areacode": "440300000000",
							"areaname": "广东,深圳市",
							"createTime": 1444657320000
						}
					]
				}
			}
	// 初始化 物流状态
	// 参数是 ajax 返回的json。
	function initMialStatus (advanceData) {

		// 进行字符串处理，将数据拼接到字符串中。
		var logisticsStatus = 	'<div class="middle-logistics-left">' + 
									'<img src="img/申通.png" alt="mail commpay logo" class="mail-logo">' +
								'</div>' +

								'<div class="middle-logistics-right">' +
									'<ul class="middle-logistics-right-status">' +
										'<li class="middle-logistics-company-status">' +
											'<span class="middle-logistics-company-status-lable">物流状态</span>' +
											'<span class="middle-logistics-company-status-content">' +
												advanceData.data.invoiceInfo.expressStatsName + 
											'</span>' +
										'</li>' +
										'<li class="middle-logistics-company-srouce">' +
											'<span class="middle-logistics-company-srouce-lable">信息来源:</span>' +
											'<span class="middle-logistics-company-srouce-content">'+
												advanceData.data.invoiceInfo.mailCompany + 
											'</span>' +
										'</li>' +
										'<li class="middle-logistics-company-mailnumber">' +
											'<span class="middle-logistics-company-mailnumber-lable">运单编号:</span>' +
											'<span class="middle-logistics-company-mailnumber-content">' +
												advanceData.data.invoiceInfo.mailNo +
											'</span>' +
										'</li>' +
									'</ul>' +
								'</div>';

		// 追加到html内
		$('.middle-logistics').prepend(logisticsStatus);
	}


	// 初始化 物流信息，
	// 参数是 ajax返回的物流信息数据
	function initMailMsg(expressData) {

		var dataArr = expressData.data.expressInfoList;
		var dataLength = dataArr.length;
		var first = middle = last = '';


		for (var i = 0; i <= dataLength - 1; i++) {

			if (i == 0) {
				first = '<!-- 当前状态 -->'+
						'<div class="logistics-location-status-first">'+
							'<div class="gui-drawing-first-spaceline">'+
								'<p class="logistics-location-status-first-company">'+
									dataArr[i].context +
								'</p>'+
								'<p class="logistics-location-status-first-data">'+
									dataArr[i].ftime +
								'</p>'+
							'</div>'+
						'</div>';

			}
			else if (i > 0 && i <  dataLength - 1) 
			{
				middle += '<!-- 中间状态 -->' +
							'<div class="logistics-location-status-normal">' +
								'<div class="gui-drawing-normal-spaceline">' +
									'<p class="logistics-location-status-normal-company">' +
										dataArr[i].context +
									'</p>' +
									'<p class="logistics-location-status-normal-data">' +
										dataArr[i].ftime +
									'</p>' +
								'</div>' +
							'</div>';

			}
			else if (i == dataLength - 1)
			{
				last = '<!-- 最初状态 -->' +
						'<div class="logistics-location-status-last">'+
							'<div class="gui-drawing-last-spaceline">'+
								'<p class="logistics-location-status-last-company">'+
									dataArr[i].context +
								'</p>'+
								'<p class="logistics-location-status-last-data">'+
									dataArr[i].ftime +
								'</p>'+						
							'</div>'+
						'</div>';
			}

		}
		

		$(".logistics-location-status").prepend(first + middle + last);
	}


	// 清酒url 获取mock的数据。
	// 但是我们这里为了方便，就不传数据了，直接就是把测试数据放到本地。
	// fekit 的 mock调试也很方便， 重构的这个就是为自己做个纪念，就不做ajax请求获取数据了。
	// function initPageUrl(url, recvData, func) {

	// 	$.ajax({
	// 		type: "GET",
	// 		url: url,
	// 		dataType:"json",
	// 		success : function(mockdata) {
	// 			recvData = mockdata;
	// 			if (func != undefined) {
	// 				func(mockdata);
	// 			}
	// 		}, 
	// 		error: function () {
	// 			alert("error");
	// 		}
	// 	});
	// }


	// 页面跳转
	$('.logisticsInfoPage-icon-one').tap(function() {
		// window.location.href = 'InvoiceSchedule.html';
		$('.invoiceSchedulePage').css('left', '100%').css('top', '0').css('display', 'block').css('z-index', 10);
		$('.logisticsInfoPage').css('z-index', 1);

		setEvt = setInterval(function() {
			moveScreemRightToLeft('.invoiceSchedulePage', '.logisticsInfoPage');
		}, 200);

	});


	// 初始化
	initMialStatus(advanceData);
	initMailMsg(expressData);
}