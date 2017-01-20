//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function () {
    $('a.page-scroll').bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 300);
        event.preventDefault();
    });
});
//scroll down and hide, scroll up and show
var didScroll;
var lastScrollTop = 0;
var delta = 10;
var navbarHeight = $('header').outerHeight();

$(window).scroll(function (event) {
    didScroll = true;
});

setInterval(function () {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    if (Math.abs(lastScrollTop - st) <= delta)
        return;
    if (st > lastScrollTop && st > navbarHeight) {
        // Scroll Down
        $('header').hide(800);
    } else {
        if (st + $(window).height() < $(document).height()) {
            $('header').show(600);
        }
    }

    lastScrollTop = st;
}
//scroll down and show picture

$(document).ready(function () {
    $('img').addClass("hideme").viewportChecker({
        classToAdd: "visible animated fadeIn",
        offset: 20
    });
    $('.content img').addClass("visible");
    $('.card').addClass("hideme").viewportChecker({
        classToAdd: "visible animated fadeIn",
        offset: 50
    });
    $('.content .card').addClass("visible");
});
