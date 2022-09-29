$.ajax({
	url:"/sys/banner/data",
    type:"get", 
    data:{module:"联系我们"},
	success:res => {
		console.log(res)
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