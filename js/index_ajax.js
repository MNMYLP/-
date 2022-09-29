function getProfession(input){
	$.ajax({
		url:"/sys/profession/select/" + input.value,
		type:"get", 
		success:res => {
			console.log(res)
			if(res.code == 0){
				$("select[name='profession']").empty();
				$("select[name='profession']").append("<option value=''>" + '-请选择专业-' + "</option>")
				$.each(res.list,index => {
					$("select[name='profession']").append("<option value=" + res.list[index].id + ">" + res.list[index].profession + "</option>")
				})
			}else{
				$("select[name='profession']").empty();
				$("select[name='profession']").append("<option value=''>" + '获取数据失败' + "</option>");
			}
		},      
		error:() => {//失败时页面为空
			$("select[name='profession']").empty();
			$("select[name='profession']").append("<option value=''>" + '获取数据失败' + "</option>");
		}
	});
};
function download(){
	$.ajax({
		url:"/sys/plan/data" , // 请求路径
		type:"get" , //请求方式
		success:res => {
			if(res.code == 0){
				$('<a href="' + baseurl + '/sys/resource/download?filename=' + res.data[1].file_url + '"></a>')[0].click();//添加图标
			}else{
				alert("下载失败")
			}
		},
		error:() => {
			alert("下载失败")
		}
	});
};
document.querySelector('.js-check1').onclick = function () {
	var check1 = new Check({
		el: '#diy1' ////必须挂载的对象
	}).init();
	if (!check1) {  //是否通过验证
		return false;
	}
	////以下是验证通过后的代码
	let sex;
	function check(radio) {
		sex = radio
	}
	let formdata = {
		name:form1.name.value,//姓名
		sex:form1.sex.value,//性别单
		phone:form1.phone.value,//手机号
		wechat:form1.wechat.value,//微信
		record:form1.record.value,//目前学历
		professionLevel:form1.professionLevel[form1.professionLevel.selectedIndex].text,//报读学历
		professionId:form1.profession.value,//选择专业
		profession:form1.profession[form1.profession.selectedIndex].text,//
		domicilePlace:form1.domicilePlace.value
	}
	$.ajax({
		url:"/sys/student/save" , // 请求路径
		type:"post" , //请求方式
		contentType:'application/json;charset=UTF-8',
		data:
		JSON.stringify(formdata),
		success:function (res) {
			alert("提交成功")
			form1.reset();
		},//响应成功后的回调函数
		error:() => {
			alert("提交失败")
		},//表示如果请求响应出现错误，会执行的回调函数
	});
};
document.querySelector('.js-check2').onclick = function () {
	//实例化2  自定义规则参数
	var check2 = new Check({
		el: '#diy2',  //挂载对象
		//邮箱
		emailRegular: '^[\\w._]+@([qQ][qQ]|[gG][mM][aA][iI][lL]|163)\\.[cC][oO][mM](\\r\\n|\\r|\\n)?$',  //邮箱验证正则
		emailRulesTips: '请输入正确邮箱',
		//密码
		pwdRegular: '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$',  //密码验证正则
		pwdRulesTips: '输入密码与组合规则不一致',
		//确认密码
		confirmPwdTips: '2次密码不一致', //确认密码提示
		//手机
		phoneRegular: '^1(3|4|5|6|7|8|9)\\d{9}$',  //手机号码正则
		phoneRulesTips: '请输入正确的手机号'   //手机号码验证提示
	}).init();//带参数的初始化

	if (!check2) {  //是否通过验证
		return false;
	}
	let formdata = {
		name:form2.name2.value,//姓名
		phone:form2.phone2.value,//手机号
		wechat:form2.wechat2.value,//微信
	}
	$.ajax({
		url:"/sys/student/save" , // 请求路径
		type:"post" , //请求方式
		contentType:'application/json;charset=UTF-8',
		data:
		JSON.stringify(formdata),
		success:function (res) {
			alert("提交成功")
			form2.reset();
		},//响应成功后的回调函数
		error:() => {
			alert("提交失败")
		},//表示如果请求响应出现错误，会执行的回调函数
	});
	////以下是验证通过后的代码
};
$.ajax({
	url:"/sys/banner/data",
    type:"get", 
    data:{module:"首页"},
    success:res => {
		let div;
		let li;
		if(res.code == 0){
			for (let i = 0; i < (res.data.length > 6 ? 6:res.data.length); i++) {
				if(i == 0){//默认页面
					li = $('<li data-target="#carousel-example-generic" data-slide-to="' + i + '" class="active"></li>');
					div = $('<div class="item active">' + 
								'<img src = "' + baseurl + res.data[i].url + '" alt=" ">' + 
							'</div>');
				}else{
					li = $('<li data-target="#carousel-example-generic" data-slide-to="' + i + '"></li>');
					div = $('<div class="item">' + 
								'<img src = "' + baseurl + res.data[i].url + '" alt=" ">' + 
							'</div>');
				}
				$(".carousel-indicators").append(li);
				$(".carousel-inner").append(div);
			}
		}else{
			let li = $('<li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>');
			let div='<div class="item active">' + 
						'<img src="./img/404.png" alt="404">' + 
					'</div>';
			$(".carousel-indicators").append(li);
			$(".carousel-inner").append(div);
		}
	},      
	error:() => {//失败时页面为空
		let li = $('<li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>');
		let div='<div class="item active">' + 
					'<img src="./img/404.png" alt="404">' + 
				'</div>';
		$(".carousel-indicators").append(li);
		$(".carousel-inner").append(div);
	}
});
$.ajax({
	url:"/sys/plan/data" , // 请求路径
	type:"get" , //请求方式
	success:res => {
		if(res.code == 0){
			$.each($(".plan-content div ul"),(index,domEle) => {
				let planIndex = index;
				if(res.data[planIndex]){
					$.each($(domEle).children("li:gt(1)"),(index,domEle) => {
						switch(index){
							case 0:
							$(domEle).children("img").prop("src",baseurl + res.data[planIndex].url);//添加图标
							break;
							case 1:
							if(planIndex == 1){
								$(domEle).find("a").prop("href",baseurl + "/sys/resource/download?filename=" + res.data[planIndex].file_url);//添加图标
							}else{
								$(domEle).find("a").prop("href","./home.html" + res.data[planIndex].anchor);//添加图标
							}
							break;
						}
					});
				}
			});
		}
	},
	error:() => {}
});
$.ajax({
	url:"/sys/advantage/data" , // 请求路径
	type:"get" , //请求方式
	success:res => {
		if(res.code == 0){
			for (var i = 0; i < res.data.length; i++) {
				let img = baseurl + res.data[i].icon_url;
				let li = $( '<li class="planB">' + 
								'<ul class="advantage-content2">' + 
									'<li>' + 
										'<img id="cont_img" src = "' + img + '" alt=" ">' + res.data[i].title + 
									'</li>' + 
									'<li>' + res.data[i].content + 
									'</li>' + 
								'</ul>' + 
							'</li>');
				$(".advantage-content1").append(li);
				var beforeC3 = "<style>" +
					".advantage-content1 > li:nth-child("+ (i+1) +"):hover::before{" +
						'content: "";' +
						"position: absolute;" +
						"width: 1.08rem;" +
						"height: 1.08rem;" +
						"top: 0.33rem;" +
						"left: 2.042rem;" +
						"background: url(" + img + ") 0 0 no-repeat;" +
						"transform: rotate(-25deg);" +
						"background-size: 100%;" +
					"}" +
				"</style>";
				// console.log(res.data[i].title)
				// console.log(baseurl + res.data[i].icon_url)
				$(".advantage-content").append(beforeC3);
			}
		}else{
			$(".advantage-content1").append('<img src="./img/404.png" alt="404">');
		}
	},//响应成功后的回调函数
	error:() => {
		$(".advantage-content1").append('<img src="./img/404.png" alt="404">');
	},//表示如果请求响应出现错误，会执行的回调函数
});
$.ajax({
	url:"/sys/hotprofession/data" , // 请求路径
	type:"get" , //请求方式
	success:res => {
		if(res.code == 0){
			for (var i = 0; i < res.data.length; i++) {
				let li = $( '<li>' + 
								'<ul class="recruit-content2">' + 
									'<li>' + 
										'<img src="' + baseurl + res.data[i].url + '" alt=" ">' + 
									'</li>' + 
									'<li>' + 
										'<p>' + res.data[i].profession + '</p>' + 
										'<p><span>培养目标&nbsp;：</span>' + res.data[i].target + '</p>' + 
										'<p><a>咨询学费</a></p>' + 
									'</li>' + 
								'</ul>' + 
							'</li>');
				$(".recruit-content1").append(li);
			}
		}else{
			$(".recruit-content1").append('<img src="./img/404.png" alt="404">');
		}
	},//响应成功后的回调函数
	error:() => {
	    $(".recruit-content1").append('<img src="./img/404.png" alt="404">');
	},//表示如果请求响应出现错误，会执行的回调函数
});
$.ajax({
	url:"/sys/picture/data" , // 请求路径
	type:"get" , //请求方式
	data:{module:"走进康展"},
	success:res => {
		if(res.code == 0){
			let imgList = $(".showschool img:not([src])");
			$.each(imgList,(index,domEle) => {
				$(domEle).prop("src",res.data[index] ? baseurl + res.data[index].url:"./img/404.png");
			});
			$(".lastshow img").prop("src",res.data[imgList.length] ? baseurl + res.data[imgList.length].url:"./img/404.png");
		}else{
			$.each($(".showschool img:not([src])"),(index,domEle) => {
				$(domEle).prop("src","./img/404.png");
			});
			$(".lastshow img").prop("src","./img/404.png");
		}
	},//响应成功后的回调函数
	error:() => {
	    $.each($(".showschool img:not([src])"),(index,domEle) => {
	    	$(domEle).prop("src","./img/404.png");
	    });
		$(".lastshow img").prop("src","./img/404.png");
	},//表示如果请求响应出现错误，会执行的回调函数
	
});
$.ajax({
	url:"/sys/news/page" , // 请求路径
	type:"get" , //请求方式
	data:{type:"",limit:6,page:1},
	success:res => {
		if(res.code == 0){
			let dataList = res.data.records;
			$.each($(".news1"),function (index,domEle){
				if(dataList[index]){
					$(domEle).children("img").prop("src",baseurl + dataList[index].url);
					let release_date = new Date(dataList[index].release_date).toLocaleDateString().replaceAll("/","-");
					$(domEle).append('<p>' + dataList[index].title + '</p>');
					$(domEle).append('<p>[' + release_date + ']</p>');
					let content = dataList[index].content.split('<p>');
					content = $('<p>' + content[1]).text();
					$(domEle).append(content.length > 17 ? '<p class="news1_text">' + content.substring(0,18) + '...</p>' : '<p class="news1_text">' + content + '</p>');
				}
			});
			$.each($(".news3"),function (index,domEle){
				if(dataList[index + 2]){
					let release_date = new Date(dataList[index + 2].release_date).toLocaleDateString().replaceAll("/","-");
					$(domEle).append('<p>' + dataList[index + 2].title + '</p>');
					$(domEle).append('<p>[' + release_date + ']</p>');
					let content = dataList[index + 2].content.split('<p>');
					content = $('<p>' + content[1]).text();
					$(domEle).append(content.length > 85 ? '<p class="news_text">' + content.substring(0,86) + '...</p>' : '<p class="news1_text">' + content + '</p>');
				}
			});
		}else{
			$.each($(".news1"),function (index,domEle){
				$(domEle).append('<img src="./img/404.png" alt="404">');
				$(domEle).append('<p>404</p>');
				$(domEle).append('<p>[404]</p>');
				$(domEle).append('<p>404</p>');
			});
			$.each($(".news3"),function (index,domEle){
				$(domEle).append('<p>404</p>');
				$(domEle).append('<p>[404]</p>');
				$(domEle).append('<p>404</p>');
			});
		}
	},//响应成功后的回调函数
	error:() => {
		$.each($(".news1"),function (index,domEle){
			$(domEle).append('<img src="./img/404.png" alt="404">');
			$(domEle).append('<p>404</p>');
			$(domEle).append('<p>[404]</p>');
			$(domEle).append('<p>404</p>');
		});
	    $.each($(".news3"),function (index,domEle){
	    	$(domEle).append('<p>404</p>');
	    	$(domEle).append('<p>[404]</p>');
	    	$(domEle).append('<p>404</p>');
	    });
	},//表示如果请求响应出现错误，会执行的回调函数
});



