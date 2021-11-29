$(function () {
    // load
    // ("use strict");
    // $("#u_skip").load("./layout/u_skip.html");
    // $("#header").load("./layout/header.html");
    // $("#footer").load("./layout/footer.html");

    // nav-total

    // gnb ham
    let $window = $(window),
        $header = $("#header"),
        $gnb = $header.find("#gnb"),
        $navDepth1 = $header.find(".gnb-wrap"),
        $navTotal = $(".nav-total"),
        $navWrap = $("#navWrap"),
        $navButton = $navTotal.find(".btn-menu");

    $navTotal.removeClass("expanded");
    $navButton.on("click", function () {
        if ($navTotal.hasClass("expanded") === true) {
            $navTotal.removeClass("expanded");
        } else {
            $navTotal.addClass("expanded");
        }
    });
    $gnb.on("mouseenter", function () {
        $navTotal.addClass("expanded");
    });
    $navWrap.on("mouseleave", function () {
        $navTotal.removeClass("expanded");
    });

    // header sticky
    $window
        .scroll(function () {
            if ($(this).scrollTop() > 50) {
                $header.addClass("sticky");
            } else {
                $header.removeClass("sticky");
            }
        })
        .trigger("scroll");

    // mobile nav
    let $depth1 = $(".depth-1 > li"),
        $depth1Link = $depth1.find("> a");

    $depth1Link.click(function (event) {
        event.preventDefault();
        $depth1.removeClass("active");
        if ($depth1.hasClass("active") === true) {
            $(this).parent().removeClass("active");
        } else {
            $(this).parent().addClass("active");
        }
    });

    // scrollUp
    $.scrollUp({
        scrollName: "scrollUp", // Element ID
        topDistance: "300", // Distance from top before showing element (px)
        topSpeed: 300, // Speed back to top (ms)
        animation: "fade", // Fade, slide, none
        animationInSpeed: 200, // Animation in speed (ms)
        animationOutSpeed: 200, // Animation out speed (ms)
        scrollText: "페이지 위로 이동", // Text for element
        activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
    });

    // main
    var visualSwiperNum = $(".visual-swiper .swiper-slide").length;
    var visualSwiper = new Swiper(".visual-swiper", {
        //effect: 'fade',
        loop: true,
        autoplay: {
            delay: 8000,
            disableOnInteraction: false,
        },
        navigation: {
            nextEl: ".visual-button-next",
            prevEl: ".visual-button-prev",
        },
        pagination: {
            el: ".main-visual .swiper-pagination",
            clickable: true,
            renderBullet: function (index, className) {
                return '<a class="' + className + '">0' + (index + 1) + "</a>";
            },
        },
        on: {
            init: function () {
                var titleText = $(".main-visual .swiper-slide-active").find("span.title").text();
                var titleLink = $(".main-visual .swiper-slide-active").find("span.link").text();
                $(".main-visual .swiper-control p.title").text(titleText);
                $(".main-visual article .more a").attr("href", titleLink);
                if (titleLink) {
                    $(".main-visual article .more").css({ opacity: 1 });
                } else {
                    $(".main-visual article .more").css({ opacity: 0 });
                }

                $(".main-visual .space-swiper-pn>i").removeClass("progressing");
                playVideo($(".main-visual .swiper-slide-active"));
            },
            slideChangeTransitionStart: function (e) {
                var titleText = $(".main-visual .swiper-slide-active").find("span.title").text();
                var titleLink = $(".main-visual .swiper-slide-active").find("span.link").text();
                $(".main-visual .swiper-control p.title").text(titleText);
                $(".main-visual article .more a").attr("href", titleLink);
                if (titleLink) {
                    $(".main-visual article .more").css({ opacity: 1 });
                } else {
                    $(".main-visual article .more").css({ opacity: 0 });
                }

                $(".main-visual .space-swiper-pn>i").removeClass("progressing");
                var pn = e.realIndex + 1;
                $(".main-visual .swiper-pagination a")
                    .eq(0)
                    .text("0" + pn);
            },
            slideChangeTransitionEnd: function (e) {
                setTimeout(function () {
                    $(".main-visual .space-swiper-pn>i").addClass("progressing");
                    playVideo($(".main-visual .swiper-slide-active"));
                }, 500);
            },
        },
    });

    function playVideo(ele) {
        $("video")[0].pause();
        if (ele.find("video").length) {
            ele.find("video")[0].play();
        }
    }
});
