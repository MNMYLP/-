// 新闻分类列表
var categoryList = []
// 当前新闻分类
var currentCat = ''
// 一页多少数据
let page_num = 4
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

// <li class="c3_current"><b>学校新闻</b></li> --> 创建dom元素
function createElForCategory (category) {
  return $(`<li><b>${category}</b></li>`).css({
    width: "0.758rem",
    cursor: "pointer",
    color: "#ababab",
    'font-weight': 700
  })
}

// 注册分类点击事件
// $(selector).on( "click",'span', function() {});
// on父元素委托注册，动态注册
// 新闻公告附属导航栏方法
$(".c3_menu").on("click", "li", function () {
  currentCat = categoryList[$(this).index()]
  // console.log(currentCat)
  $(this).addClass("c3_current").siblings().removeClass("c3_current")
  // c3_current border-bottom样式不生效
  $(this).css("border-bottom", "solid 0.0365rem #9e1725").siblings().css("border-bottom", "solid 0.0365rem #ababab")
  $(".c3_content").empty().append($(
    '<div id="d1">' +
      '<div class="d1_top">' + 
          '<div class="c3_content_div">' +
          '</div>' +
          '<div class="xiaokan">' +
              '<div class="xiaokan_img1">' +
                  '<img src="./img/02技工_新闻公告_xiaokan1.png" alt="">' +
              '</div>' +
              '<div class="xiaokan_img1">' +
                  '<img src="./img/02技工_新闻公告_xiaokan_2.png" alt="">' +
              '</div>' +
          '</div>' +
      '</div>' +
      '<div class="pagination"></div>' +
  '</div>'
  ))
  // 优先展示第一页
  page(1, page_num)
  // 注册分页
  // setPaginator(pages.pages)
  if (pages.pages) {
    $('.pagination').jqPaginator({
      totalPages: pages.pages, 
      renderer:"news_one",
      // pageSize: page_sum.page_sum,
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
        $(".c3_content_div").empty();
        page(num, page_num);
      }
    });
  } else {
    $('.pagination').jqPaginator('destroy');
  }
})

// 获取新闻分类列表
$.ajax({
	url:"/sys/newstype/select" , // 请求路径
	type:"get" , // 请求方式
	data:{},
	success:res => {
    categoryList = res.list
    console.log(categoryList)
    if (categoryList) {
      currentCat = categoryList[0]
      // 生成li
      categoryList.forEach(element => {
        $(".c3_menu").append(createElForCategory(element.name))
      });
      $(".c3_menu li:first").click()
    }
	},// 响应成功后的回调函数
	error:() => {},// 表示如果请求响应出现错误，会执行的回调函数
});

function page(num, hsu) {
  // myajax.myajax = $.ajax({
  $.ajax({
    url: "/sys/news/page", // 请求路径
    type: "get", //请求方式
    async: false,
    data: { type: currentCat.name, limit: hsu, page: num },
    success: res => {
      console.log(res)
      if (res.code == 0) {
        dataList = res.data.records;
        console.log(dataList);
        page_sum.page_sum = dataList.length;
        pages.pages = res.data.pages;
        // console.log(page_sum.page_sum)
        // console.log(pages.pages)
        for (var i = 0; i < dataList.length; i++) {
          if (dataList[i]) {
            let release_date = new Date(dataList[i].release_date).toLocaleDateString().replaceAll("/", "-");
            let content = dataList[i].content.split('<p>');
			      content = content[1].length >= 89 ? content[1].substring(0,85) + '...</p>' : content[1];
            let div = $('<div class="c3_content_div_box">' +
              '<div class="divbox_text">' +
              '<p>[' + release_date + ']</p>' +
              '<h1>' + dataList[i].title + '</h1>' +
              '<p class="div_op">' + content +
              '</div>' +
              '<div class="c3_content_div_box_img">' +
              '<img src="' + baseurl + dataList[i].url + '"alt=" ">' +
              '</div>' +
              '</div>');
            $(".c3_content_div").append(div);
            $(".c3_content_div .c3_content_div_box").click(function () {
              let index = $(this).index()
              console.log(`dataList`, dataList[index])
              console.log(`index`, index)
              console.log(`content`, dataList[index].content)
              $(".c3_content").empty()
              let detail = $(
                '<p>[' + new Date(dataList[index].release_date).toLocaleDateString().replaceAll("/", "-") + ']</p>' +
                '<h1 style="margin: 20px 0;font-weight: 700;">' + dataList[index].title + '</h1>' +
                dataList[index].content.replaceAll("src=\"", `src=\"${baseurl.substr(0, baseurl.lastIndexOf("/"))}`)
              )
              $(".c3_content").css("margin", "auto").append(detail).find("p").attr("style", "line-height: 0.156rem")
              $(".c3_content p").eq(0).removeAttr("style").attr("style", "color: #a11e2b;font-size: 0.102rem;")
              $(".c3_content img").css("width", "100%")
            })
          }
        }
      } else {
        for (var i = 0; i < 5; i++) {
          let div = $('<div class="c3_content_div_box">' +
            '<div class="divbox_text">' +
            '<p>[404]</p>' +
            '<h1>404</h1>' +
            '<p class="div_op">404</p>' +
            '</div>' +
            '<div class="c3_content_div_box_img">' +
            '<img src="img/404.png"alt=" ">' +
            '</div>' +
            '</div>');
          $(".c3_content_div").append(div);
        }
      }
    },//响应成功后的回调函数
    error: () => {
      for (var i = 0; i < 5; i++) {
        let div = $('<div class="c3_content_div_box">' +
          '<div class="divbox_text">' +
          '<p>[404]</p>' +
          '<h1>404</h1>' +
          '<p class="div_op">404</p>' +
          '</div>' +
          '<div class="c3_content_div_box_img">' +
          '<img src="img/404.png"alt=" ">' +
          '</div>' +
          '</div>');
        $(".c3_content_div").append(div);
      }
    },//表示如果请求响应出现错误，会执行的回调函数
  });
}