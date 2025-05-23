(function($) {
	'use strict';
	 
  // $('.nonloop-block-11').owlCarousel({
  //     center: false,
  //     items: 1,
  //     loop: false,
  //     stagePadding: 20,
  //     margin:50,
  //     nav: true,
  //     smartSpeed: 1000,
  //     navText: ['<span class="ion-chevron-left">', '<span class="ion-chevron-right">'],
  //     responsive:{
  //       600:{
  //         stagePadding: 20,
  //         items:1
  //       },
  //       800:{
  //         stagePadding: 20,
  //         items:1
  //       },
  //       1000:{
  //         // stagePadding: 200,
  //         items:1
  //       }
  //     }
  //   });

	// owl carousel
	var majorCarousel = $('.js-carousel-1');
	majorCarousel.owlCarousel({
    loop:true,
    autoplay: true,
    stagePadding: 7,
    margin: 20,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    nav: true,
    autoplayHoverPause: true,
    items: 3,
    navText : ["<span class='ion-chevron-left'></span>","<span class='ion-chevron-right'></span>"],
    responsive:{
      0:{
        items:1,
        nav:false
      },
      600:{
        items:2,
        nav:false
      },
      1000:{
        items:3,
        nav:true,
        loop:false
      }
  	}
	});

	// owl carousel
	var major2Carousel = $('.js-carousel-2');
	major2Carousel.owlCarousel({
    loop:true,
    autoplay: true,
    stagePadding: 7,
    margin: 20,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    nav: true,
    autoplayHoverPause: true,
    items: 4,
    navText : ["<span class='ion-chevron-left'></span>","<span class='ion-chevron-right'></span>"],
    responsive:{
      0:{
        items:1,
        nav:false
      },
      600:{
        items:3,
        nav:false
      },
      1000:{
        items:4,
        nav:true,
        loop:false
      }
  	}
	});



})(jQuery);