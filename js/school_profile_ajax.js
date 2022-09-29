// $.ajax({
// 	url:"/sys/banner/data",
//     type:"get", 
//     data:{module:"学校概况"},
//     success:res => {
// 		if(res.code == 0){
// 			$(".img img").prop("src",res.data[0] ? baseurl + res.data[0].url:"./img/404.png");
// 		}else{
// 			$(".img img").prop("src","./img/404.png");
// 		}
// 	},      
// 	error:() => {//失败时页面为空
// 		$(".img img").prop("src","./img/404.png");
// 	}
// });
$.ajax({
	url:"/sys/introduction/data",
    type:"get", 
    success:res => {
		if(res.code == 0 && res.data){
			let content = res.data.content;
			let index = content.indexOf("</p>");
			let left = content.slice(0,index + 4);
			let bottom = content.slice(index + 4,content.length).replaceAll('src=\\"', 'src=\\"' + baseurl);
			$(".div_left_top").before(left);
			$(".banner_bottom").append(bottom);
		}
	},      
	error:() => {//失败时页面为空
	}
});
$.ajax({
	url:"/sys/teacher/data",
    type:"get", 
    success:res => {
		if(res.code == 0){
			for (let i = 0; i < res.data.length; i++) {
				let div = $('<div class="item">' + 
								'<div class="item_son">' +
									'<img src = "' + baseurl + res.data[i].url + '" alt=" ">' + 
									'<p>' + res.data[i].name + '</p>' + 
									'<p>' + res.data[i].post + '</p>' + 
								'</div>' + 
							'</div>')
				$(".shizi").append(div)
			}
		}else{
			$(".shizi").append('<img src="./img/404.png" alt="404">')
		}
	},      
	error:() => {//失败时页面为空
		$(".shizi").append('<img src="./img/404.png" alt="404">')
	}
});
$.ajax({
	url:"/sys/picture/data" , // 请求路径
	type:"get" , //请求方式
	data:{module:"领导关怀"},
	success:res => {
		if(res.code == 0){
			let list = [];
			for (let i = 0; i < res.data.length; i++) {
				console.log(res.data);
				list[i] = '<div class="swiper-slide slide' + i + '">' + 
							  '<img src="' + baseurl + res.data[i].url + '" alt=" ">' + 
							  '<div class="swiper_text">'+res.data[i].title+'</div>'
						  '</div>';
			}
			for (let i = 0; i < list.length; i++) {
				$($(".swiper-wrapper")[0]).append(list[i])
				$($(".swiper-wrapper")[1]).append(list[i == 0 ? res.data.length - 1 : i - 1])
				$($(".swiper-wrapper")[2]).append(list[i == res.data.length - 1 ? 0 : i + 1])
			}
			'use strict';
			let currentSwiper = new Swiper('.current-swiper', {
				loop: false,
				paginationClickable: true,
				observer: true, //修改swiper自己或子元素时，自动初始化swiper
			});
			currentSwiper.$el.parent().find('.swiper-button-next').on('click', function() {
				currentSwiper.slideNext()
			});
			currentSwiper.$el.parent().find('.swiper-button-prev').on('click', function() {
				currentSwiper.slidePrev()
			});
			let leftSwiper = new Swiper('.left-swiper', {
				loop: false,
				simulateTouch: false
			});
			let rightSwiper = new Swiper('.right-swiper', {
				loop: false,
				simulateTouch: false
			});
			currentSwiper.controller.control = [leftSwiper, rightSwiper];
		}else{
			$($(".swiper-wrapper")[0]).append('<img src="./img/404.png">');
			$($(".swiper-wrapper")[1]).append('<img src="./img/404.png">');
			$($(".swiper-wrapper")[2]).append('<img src="./img/404.png">');
		}		  
	},//响应成功后的回调函数
	error:() => {
		$($(".swiper-wrapper")[0]).append('<img src="./img/404.png">');
		$($(".swiper-wrapper")[1]).append('<img src="./img/404.png">');
		$($(".swiper-wrapper")[2]).append('<img src="./img/404.png">');
	},//表示如果请求响应出现错误，会执行的回调函数
});
$.ajax({
		url:"/sys/picture/data" , // 请求路径
		type:"get" , //请求方式
		data:{module:"资质荣誉"},
		success:res => {
			if(res.code == 0){
				for (let i = 0; i < res.data.length; i++) {
					let div = $('<div class="swiper-slide">' + 
									'<img src = "' + baseurl + res.data[i].url + '" alt=" ">' + 
									
								'</div>');
					$(".mySwiper div:first").append(div);
				}
				let swiper = new Swiper("#swiper_kkk", {
					pagination: {
						el: ".swiper-pagination",
						type: "progressbar",
					},
					paginationClickable: true,
					observer: true, //修改swiper自己或子元素时，自动初始化swiper
				}) 
			}else{
				$(".mySwiper div:first").append('<img src="./img/404.png" alt="404">')
			}
		},
		error:() => {
			$(".mySwiper div:first").append('<img src="./img/404.png" alt="404">')
		},//表示如果请求响应出现错误，会执行的回调函数
	});
