! function($) {
    "use strict";
    
    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: true,
        asNavFor: '.slider-nav'
    })

    .magnificPopup({
        type: 'image',
        delegate: 'a:not(.slick-cloned)',
        closeOnContentClick: false,
        tLoading: 'Загрузка...',
        mainClass: 'mfp-zoom-in mfp-img-mobile',
        image: {
            verticalFit: true,
            tError: '<a href="%url%">Фото #%curr%</a> не загрузилось.'
        },
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            tCounter: '<span class="mfp-counter">%curr% / %total%</span>', // markup of counte
            preload: [0,1] // Will preload 0 - before current, and 1 after the current image
        },
        zoom: {
            enabled: true,
            duration: 300
        },
        removalDelay: 300, //delay removal by X to allow out-animation
        callbacks: {
            open: function() {
                //overwrite default prev + next function. Add timeout for css3 crossfade animation
                $.magnificPopup.instance.next = function() {
                    var self = this;
                    self.wrap.removeClass('mfp-image-loaded');
                    setTimeout(function() { $.magnificPopup.proto.next.call(self); }, 120);
                };
                $.magnificPopup.instance.prev = function() {
                    var self = this;
                    self.wrap.removeClass('mfp-image-loaded');
                    setTimeout(function() { $.magnificPopup.proto.prev.call(self); }, 120);
                };
                var current = $carousel.slick('slickCurrentSlide');
                $carousel.magnificPopup('goTo', current);
            },
            imageLoadComplete: function() {
                var self = this;
                setTimeout(function() { self.wrap.addClass('mfp-image-loaded'); }, 16);
            },
            // beforeClose: function() {
            //     $carousel.slick('slickGoTo', parseInt(this.index));
            // }
        }
    });
    $('.slider-nav').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        vertical:true,
        asNavFor: '.slider-for',
        dots: false,
        focusOnSelect: true,
        verticalSwiping:true,
        arrows: false,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    vertical: false,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    vertical: false,
                }
            },
            {
                breakpoint: 580,
                settings: {
                    vertical: false,
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 380,
                settings: {
                    vertical: false,
                    slidesToShow: 2,
                }
            }
        ]
    });

}(window.jQuery)
