// Collapse Sidebar Menu 
(function($) {

	"use strict";

	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();
    // Product Carousel
    $('.Product-carousel').owlCarousel({
        loop:true,
        margin:20,
        responsiveClass:true,
        autoplay:true,
        autoplayHoverPause:true,
        dots: false,
        responsive:{
            0:{
                items:1,
                nav:true
            },
            1024:{
                items:3,
                nav:false
            },
            1025:{
                items:4,
                nav:true,
                loop:false
            }
        }
    });
    $('.Product-carousel-related').owlCarousel({
        loop:true,
        margin:20,
        responsiveClass:true,
        autoplay:true,
        autoplayHoverPause:true,
        dots: false,
        responsive:{
            0:{
                items:1,
                nav:true
            },
            991:{
                items:2,
                nav:false
            },
            1000:{
                items:5,
                nav:true,
                loop:false
            }
        }
    })
    $('.explore-design-carasoul').owlCarousel({
        loop:true,
        margin:35,
        responsiveClass:true,
        autoplay:true,
        autoplayHoverPause:true,
        dots: false,
        autoplayTimeout:2500,
        responsive:{
            0:{
                items:1,
                nav:true
            },
            768:{
                items:2,
                nav:false
            },
            1024:{
                items:3,
                nav:false
            },
            1280:{
                items:4,
                nav:true,
                loop:false
            },
            1920:{
                items:5,
                nav:true,
                loop:false
            }
        }
    })

    $(document).ready(function(){
        $('#zoom').zoom();



    });

    $('#catItem').click(function(){
        $('.filter-cat').toggle("slow");
    });

})(jQuery);


