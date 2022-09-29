// 一页多少数据
let page_num = 6
// 数据总量
var page_sum = {
  page_sum: 0
}
// 页数
var pages = {
  pages: 0
}
// 科研数据列表暂存，用于科研详情展示
var dataList = []

$.ajax({
	url:"/sys/picture/page" , // 请求路径
    type:"get" , //请求方式
	data:{module:"科研实训",limit: 6, page: 1},
	success:res => {
		if(res.code == 0){
            let data = res.data.records;
            page_sum.page_sum = data.length;
            pages.pages = res.data.pages;
			for (var i = 0; i < data.length; i++) {
				let date = new Date(data[i].release_date);
				let li = $( '<li>' + 
								'<div>' + 
								'<img src="' + baseurl + data[i].url + '" alt=" ">' + 
								'</div>' + 
								'<div>' + 
									'<p>' + data[i].title + '</p>' + 
									'<p>' + data[i].content + '</p>' + 
									'<p>' + date.getMonth() + '-' + date.getDate() + '</p>' + 
								'</div>' + 
							'</li>');
				$(".show-school").append(li);
            }
            // 注册分页
            $('.pagination').jqPaginator({
                totalPages: pages.pages, 
                renderer:"news_one",
                visiblePages: pages.pages,
                first: false,
                prev: '<li class="prev"><a href="javascript:void(0);"><img src="./img/psxajuphh2w3dkyspdciwlu0zo4mp9ogf9cb08dae50-9ee4-4af6-97dc-f001d28bc412.png" /></a></li>',
                next: '<li class="next"><a href="javascript:void(0);"><img src="./img/pswsmootmd5b4rx6qfg18o6b366jkcprbh22ad9b46-e5a9-4923-a319-b4efb7b7b641.png" /></a></li>',
                last: false,
                page: '<li class="page"><a href="javascript:void(0);">{{page}}</a></li>',
                currentPage: 1,
                onPageChange: function (num) {
                    //num表示当前是多少页
                    $('#text').html('当前第' + num + '页');
                    $(".show-school").empty();
                    page(num, page_num);
                }
            })
		}else{
			$(".show-school").append('<img src="./img/404.png" alt="404">');
		}
	},//响应成功后的回调函数
	error:function () {
	    $(".show-school").append('<img src="./img/404.png" alt="404">');
	},//表示如果请求响应出现错误，会执行的回调函数
});

function page(num, hsu) {
  $.ajax({
    url: "/sys/picture/page", // 请求路径
    type: "get", //请求方式
    async: false,
    data: { module:"科研实训", limit: hsu, page: num },
    success: res => {
      if (res.code == 0) {
        let data = res.data.records;
        page_sum.page_sum = data.length;
        pages.pages = res.data.pages;
        for (var i = 0; i < data.length; i++) {
        let date = new Date(data[i].release_date);
        let li = $( '<li>' + 
                        '<div>' + 
                            '<img src="' + baseurl + data[i].url + '" alt=" ">' + 
                        '</div>' + 
                        '<div>' + 
                            '<p>' + data[i].title + '</p>' + 
                            '<p>' + data[i].content + '</p>' + 
                            '<p>' + date.getMonth() + '-' + date.getDate() + '</p>' + 
                        '</div>' + 
                    '</li>');
        $(".show-school").append(li);
        }
      } else {
        $(".show-school").append('<img src="../img/404.png" alt="404">');
      }
    },//响应成功后的回调函数
    error: () => {
        $(".show-school").append('<img src="../img/404.png" alt="404">');
    },//表示如果请求响应出现错误，会执行的回调函数
  });
}