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

})(jQuery);


// Product Carousel
$('.Product-carousel').owlCarousel({
    loop:true,
    margin:20,
	responsiveClass:true,
	autoplay:true,
	autoplayHoverPause:true,
	dots: false,
    nav:true,
    items : 1, // THIS IS IMPORTANT
    responsive : {
        767 : { items : 1  },
        768 : { items : 3  },
        1280 : { items : 4
        }
    },
});
$('.Product-carousel-related').owlCarousel({
    loop:true,
    margin:20,
	responsiveClass:true,
	autoplay:true,
	autoplayHoverPause:true,
	dots: false,
    nav:true,
    items : 1, // THIS IS IMPORTANT
    responsive : {
        767 : { items : 1  },
        768 : { items : 3  },
        1280 : { items : 4
        }
    },
});

$(document).ready(function(){
    $('#zoom').zoom();
});

// Toggle Responsive Menu
