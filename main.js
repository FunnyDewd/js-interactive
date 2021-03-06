/* global console */
/* jshint unused:false, evil: true*/
var cssSlides = document.querySelectorAll('.slide-css-code');
var jsSlides = document.querySelectorAll('.slide-js-code');
var htmlSlides = document.querySelectorAll('.slide-html-code');
var allSlides = document.querySelectorAll('.slide');
var theDocument = document.body;

[].forEach.call(allSlides, function(slide, slideNumber, slides) {
  slide.setAttribute('data-slide-number', slideNumber + 1);
});

[].map.call(jsSlides, function(jsCode) {
  jsCode.addEventListener('blur', function() {
    var theLine = jsCode.innerHTML;
    eval(theLine);
  });
});

[].map.call(cssSlides, function(cssCode) {
  cssCode.addEventListener('blur', function() {
    var theStyles = cssCode.innerText;
    cssCode.innerHTML = theStyles;
  });
});

[].map.call(htmlSlides, function(htmlCode) {
  // get the HTML into the textarea
  var theContent = htmlCode.parentNode.querySelector(".slide-content");
  var theTextarea = htmlCode.querySelector("textarea");

  theTextarea.value = theContent.innerHTML;

  theTextarea.addEventListener('blur', function(){
    var newContent = this.value;
    var theContent = this.parentNode.parentNode.querySelector(".slide-content");
    theContent.innerHTML = newContent;
  });

  theTextarea.addEventListener("keydown", function(event){
    event.stopPropagation();
  });
});

function moveToPreviousSlide() {
  // if we are already at the first slide, do nothing, for now...
  var currentSlide = document.querySelector('.slide.current');
  var nextSlide = currentSlide.nextElementSibling;
  var previousSlide = currentSlide.previousElementSibling;

  if (!previousSlide) {
    // do nothing
    return;
  } else {

    if (nextSlide) {
      nextSlide.classList.remove('next');
    }

    currentSlide.classList.remove('current');
    currentSlide.classList.add('next');
    previousSlide.classList.remove('previous');
    previousSlide.classList.add('current');
    previousSlide.previousElementSibling.classList.add('previous');

  }

  // otherwise move to the previous slide.

}

function moveToNextSlide() {
  // if we are already at the first slide, do nothing, for now...
  var currentSlide = document.querySelector('.slide.current');
  var nextSlide = currentSlide.nextElementSibling;
  var previousSlide = currentSlide.previousElementSibling;

  if (!nextSlide) {
    // do nothing
    return;
  } else {
    if (previousSlide) {
      previousSlide.classList.remove('previous');
    }

    currentSlide.classList.remove('current');
    currentSlide.classList.add('previous');
    nextSlide.classList.remove('next');
    nextSlide.classList.add('current');
    nextSlide.nextElementSibling.classList.add('next');

  }

  // otherwise move to the next slide.

}

function handleKeyDown(event) {
  var LEFT_ARROW = 37;
  var UP_ARROW = 38;
  var RIGHT_ARROW = 39;
  var DOWN_ARROW = 40;
  var theKey;
  var theTarget;

  if (typeof event === 'undefined') {
    event = window.event;
  }

  theTarget = event.target;

  // ignore arrow keys coming from the editable content elements
  if ('contenteditable' in theTarget.attributes) {
    return;
  }

  theKey = event.keyCode;

  if (theKey === LEFT_ARROW || theKey === UP_ARROW) {
    moveToPreviousSlide();
  }

  if (theKey === RIGHT_ARROW || theKey === DOWN_ARROW) {
    moveToNextSlide();
  }

}

// bind the keypress events to the body
document.body.addEventListener('keydown', handleKeyDown, false);
