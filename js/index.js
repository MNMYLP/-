
window.onload = function() {
   document.body.style.zoom = "normal"; //避免zoom尺寸叠加
   let scale = document.body.clientWidth / 1904;
   document.body.style.zoom = scale;
 };
 //防抖，避免resize占用过多资源
 (function() {
   var throttle = function(type, name, obj) {
     obj = obj || window;
     var running = false;
     var func = function() {
       if (running) {
         return;
       }
       running = true;
       requestAnimationFrame(function() {
         obj.dispatchEvent(new CustomEvent(name));
         running = false;
       });
     };
     obj.addEventListener(type, func);
   };

   throttle("resize", "optimizedResize");
 })();

 window.addEventListener("optimizedResize", function() {
   document.body.style.zoom = "normal";
   let scale = document.body.clientWidth / 1904;
   document.body.style.zoom = scale;
});
var trname = window.innerWidth;
if(trname>=1400){
   var t = window.devicePixelRatio   // 获取下载的缩放 125% -> 1.25    150% -> 1.5
   if(t != 1){   // 如果进行了缩放，也就是不是1
      document.body.style.zoom = -0.6 * t + 1.55;
   }   
}
if(trname<1400)document.body.style.zoom = 3;
