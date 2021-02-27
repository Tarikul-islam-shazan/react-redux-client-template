! function($) {
    "use strict";

    /**
    Sidebar Module
    */
    var SideBar = function() {
        this.$body = $("body"),
        this.$sideBar = $('aside.left-panel'),
        this.$navbarToggle = $(".navbar-toggle"),
        this.$navbarItem = $("aside.left-panel nav.navigation > ul > li:has(ul) > a")
    };

    //initilizing
    SideBar.prototype.init = function() {
        //on toggle side menu bar
        console.log("clicked on sidebar toggle init")
        var $this = this;
        $(document).on('click', '.navbar-toggle', function () {
            $this.$sideBar.toggleClass('collapsed');
        });

        //on menu item clicking
        this.$navbarItem.click(function () {
            console.log("clicked on sidebar toggle")
            if ($this.$sideBar.hasClass('collapsed') == false || $(window).width() < 768) {
                $("aside.left-panel nav.navigation > ul > li > ul").slideUp(300);
                $("aside.left-panel nav.navigation > ul > li").removeClass('active');
                if (!$(this).next().is(":visible")) {
                    $(this).next().slideToggle(300, function () {
                        $("aside.left-panel:not(.collapsed)").getNiceScroll().resize();
                    });
                    $(this).closest('li').addClass('active');
                }
                return false;
            }
        });

        //adding nicescroll to sidebar
        if ($.isFunction($.fn.niceScroll)) {
            $("aside.left-panel:not(.collapsed)").niceScroll({
                cursorcolor: '#8e909a',
                cursorborder: '0px solid #fff',
                cursoropacitymax: '0.5',
                cursorborderradius: '0px'
            });
        }
    },

    //exposing the sidebar module
    $.SideBar = new SideBar, $.SideBar.Constructor = SideBar


    // Nice Select
    $(document).ready(function() {
        $('select').niceSelect();
        $('select').niceSelect('update');
        // console.log("entered document")
    });


    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })

}(window.jQuery)
