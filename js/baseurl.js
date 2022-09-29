let baseurl = 'http://192.168.4.84:8081/school'
$.ajaxPrefilter( function( options ) {
    //发起真正的Ajax请求之前，统一拼接请求的根路径
    options.url = baseurl + options.url
});
