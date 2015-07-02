var cssSlides = document.querySelectorAll(".slide-css-code");
var jsSlides = document.querySelectorAll(".slide-js-code");
var allSlides = document.querySelectorAll(".slide");

[].forEach.call(allSlides, function(slide, slideNumber, slides){
  slide.setAttribute('data-slide-number', slideNumber + 1);
});

[].map.call(jsSlides, function(jsCode){
  jsCode.addEventListener("blur", function(){
    var theLine = jsCode.innerHTML;
    eval(theLine);
  });
});

[].map.call(cssSlides, function(cssCode){
  cssCode.addEventListener("blur", function(){
    var theStyles = cssCode.innerText;
    cssCode.innerHTML = theStyles;
});
});
