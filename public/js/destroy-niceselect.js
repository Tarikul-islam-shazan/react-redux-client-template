! function($) {
    "use strict";
    // Nice Select
    $(document).ready(function() {
        $('select').niceSelect('destroy');
        console.log("destroy called nice")
    });
}(window.jQuery)
