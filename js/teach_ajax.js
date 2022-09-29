$.ajax({
	url:"/sys/banner/data",
    type:"get", 
    data:{module:"教学教研"},
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
	error: () => {//失败时页面为空
		$(".shizi").append('<img src="./img/404.png" alt="404">')
	}
});