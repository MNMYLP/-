// 生活分类列表
var categoryList = []
// 当前生活分类
var currentCat = ''
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
// 新闻数据列表暂存，用于新闻详情展示
var dataList = []

// <li class="c3_current"><b>校园风光</b></li> --> 创建dom元素
function createElForCategory (category) {
  return $(`<li><b>${category}</b></li>`)
}

// 注册分类点击事件
// $(selector).on( "click",'span', function() {});
// on父元素委托注册，动态注册
// 新闻公告附属导航栏方法
$(".title").on("click", "li", function () {
  currentCat = categoryList[$(this).index()]
  // console.log(currentCat)
  $(this).addClass("c3_current").siblings().removeClass("c3_current")
  $(this).css("border-bottom", "solid 0.0365rem #9e1725").siblings().css("border-bottom", "solid 0.0365rem #ababab")
  $(".show-school").empty()
  // 优先展示第一页
  page(1, page_num)
  // 注册分页
  if (pages.pages) {
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
    });
  } else {
    $('.pagination').jqPaginator('destroy');
  }
})

// 获取新闻分类列表
$.ajax({
	url:"/sys/campuslifetype/select" , // 请求路径
	type:"get" , // 请求方式
	data:{},
	success:res => {
    categoryList = res.list
    console.log(categoryList)
    if (categoryList) {
      currentCat = categoryList[0]
      // 生成li
      categoryList.forEach(element => {
        $(".title").append(createElForCategory(element.name))
      });
      $(".title li:first").click()
    }
	},// 响应成功后的回调函数
	error:() => {},// 表示如果请求响应出现错误，会执行的回调函数
});

function page(num, hsu) {
  // myajax.myajax = $.ajax({
  $.ajax({
    url: "/sys/campuslife/page", // 请求路径
    type: "get", //请求方式
    async: false,
    data: { type: currentCat.name, limit: hsu, page: num },
    success: res => {
      console.log(res)
      if (res.code == 0) {
        let data = res.data.records;
        page_sum.page_sum = data.length;
        pages.pages = res.data.pages;
        for (var i = 0; i < data.length; i++) {
        let date = new Date(data[i].create_time);
        let li = $( '<li>' + 
                        '<div>' + 
                            '<img src="' + baseurl + data[i].url + '" alt=" ">' + 
                        '</div>' + 
                        '<div>' + 
                            '<p>' + data[i].title + '</p>' + 
                            '<p>' + data[i].content + '</p>' + 
                            '<p>' + date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + '</p>' + 
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