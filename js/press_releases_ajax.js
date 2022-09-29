$.ajax({
	url:"/sys/banner/data",
    type:"get", 
    data:{module:"新闻公告"},
    success:res => {
		if(res.code == 0){
			$(".img_top").prop("src",res.data[0] ? baseurl + res.data[0].url:"./img/404.png");
		}else{
			$(".img_top").prop("src","./img/404.png");
		}
	},      
	error:() => {//失败时页面为空
		$(".img_top").prop("src","./img/404.png");
	}
});
