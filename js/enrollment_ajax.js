function getProfession(input){
	$.ajax({
		url:"/sys/profession/select/" + input.value,
		type:"get", 
		success:res => {
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
document.querySelector('#submit').onclick = function () {
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
	////以下是验证通过后的代码
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
$.ajax({
	url:"/sys/banner/data",
    type:"get", 
    data:{module:"招生就业"},
	success:res => {
		if(res.code == 0){
			$("nav img").prop("src",res.data[0] ? baseurl + res.data[0].url:"./img/404.png");
		}else{
			$("nav img").prop("src","./img/404.png");
		}
	},      
	error: () => {//失败时页面为空
		$("nav img").prop("src","./img/404.png");
	}
});
// $.ajax({
// 	url:"/sys/profession/data",
//     type:"get", 
// 	success:res => {
// 		if(res.code == 0){
// 			let div;
// 			for(let i = 0;i < res.data.length; i++){
// 				div = $(
// 				`<li>
// 					<ul class="advantage-content1">
// 						<li>
// 							<img src="./img/background-img.jpg" alt=" ">
//                         </li>
// 						<li>
// 							<div class="content2">
// 								<img class="content2_img"
// 									src="` + baseurl + res.data[i].icon_url + `"
//                                     alt="">
// 								<span>` + res.data[i].profession + `</span>
//                             </div>
//                         </li>
//                         <li>
// 							<div class="content3">` + res.data[i].introduction + `</div>
//                         </li>
//                     </ul>
//                 </li>`).css("background-image","url('" + baseurl + res.data[i].url + "')");
// 				$(".more:first").before(div)
// 			}
// 		}
// 	},      
// 	error: () => {//失败时页面为空
		
// 	}
// });
