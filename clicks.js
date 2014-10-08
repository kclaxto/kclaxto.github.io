/*global $*/
/*jslint sloppy:true, browser: true*/
$('.logo').on('click', function (e) {
    $('.logo').css({left: e.pageX,
                    top: e.pageY});
    $('.logo').toggleClass('rotated');
});