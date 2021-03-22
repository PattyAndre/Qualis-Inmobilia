// main.js

var wm_defaults = {
  viewOffset: { top: 0, right: 0, bottom: 000, left: 0 },
  scale: 0.8,
  reset: false,
  duration: '1000'
};
var dist = '100px';

ScrollReveal().reveal('.reveal', wm_defaults);
ScrollReveal().reveal('.delay-100', { delay: 100 });
ScrollReveal().reveal('.delay-200', { delay: 200 });
ScrollReveal().reveal('.delay-300', { delay: 300 });
ScrollReveal().reveal('.delay-400', { delay: 400 });
ScrollReveal().reveal('.delay-800', { delay: 800 });
ScrollReveal().reveal('.r-top', { origin: 'top', distance: dist });
ScrollReveal().reveal('.r-bottom', { origin: 'bottom', distance: dist });
ScrollReveal().reveal('.r-left', { origin: 'left', distance: dist });
ScrollReveal().reveal('.r-right', { origin: 'right', distance: dist });

//   window.setTimeout(function(){
//     counter = 0;
//     $(".nav-item").each(function(){
//       counter += 1;
//       var that = this;
//       window.setTimeout(function(){
//       $(that).css("opacity", "1");
//       }, counter*300);
//     });
//   }, 100);

//┌───────────────────────┐
//│ Adds Smooth Scrolling │
//└───────────────────────┘

$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') ==
        this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate(
          {
            scrollTop: target.offset().top
          },
          1000,
          function() {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(':focus')) {
              // Checking if the target was focused
              return false;
            } else {
              $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            }
          }
        );
      }
    }
  });

//┌───────────────────────--------┐
//│ add class to navbar on scroll │
//└─────────────────--------──────┘
//
//

//   function changeNavbar(){
//     var nav = $('.navbar');
//     var top = 100;
//     if ($(window).scrollTop() >= top || $(window).width() < 968) {
//         nav.addClass('bg-light');
//     } else {
//         nav.removeClass('bg-light');
//     }
//   };
//   // call on load and on scroll
//   $(changeNavbar);
//   $(window).scroll(changeNavbar);
//   $(window).scroll(walkDog);

//   var rotation = 0;
//   function walkDog(){

//     $(".anim").each(function(){
//       $(this).css('transform', "rotate("+rotation+ "deg)" )
//       rotation += 0.4;

//     });
//   };
