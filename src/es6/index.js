"use strict";

var Mi = {
    init: function init() {
        this.Basic.init(), this.Components.init();
    },
    Basic: {
        init: function init() {
            var self = this;
            Pace.on("done", function() {
                $("#page-loader").fadeOut(200), self.animations();
            }), self.mobileDetector(), self.backgrounds(), self.scroller(), self.masonry(), self.ajaxLoader(), self.mobileNav(), self.map(), self.forms();
        },
        mobileDetector: function mobileDetector() {
            var e = {
                Android: () => navigator.userAgent.match(/Android/i),

                BlackBerry: () => navigator.userAgent.match(/BlackBerry/i),

                iOS: () => navigator.userAgent.match(/iPhone|iPad|iPod/i),

                Opera: () => navigator.userAgent.match(/Opera Mini/i),

                Windows: () => navigator.userAgent.match(/IEMobile/i),

                any: () => e.Android() || e.BlackBerry() || e.iOS() || e.Opera() || e.Windows()
            };
            window.trueMobile = e.any(), trueMobile && $("audio").remove();
        },
        backgrounds: function backgrounds() {
            var e = $(".bg-image").children("img").attr("src");
            $(".bg-image").css("background-image", "url(" + e + ")").children("img").hide();
        },
        animations: function animations() {
            $(".animated-hover").on("mouseenter", function() {
                var e = $(this).data("hover-animation"),
                    t = $(this).data("hover-animation-duration");
                $(this).stop().css({
                    "-webkit-animation-duration": t + "ms",
                    "animation-duration": t + "ms"
                }).addClass(e);
            }).on("mouseleave", function() {
                var e = ($(this), $(this).data("hover-animation"));
                $(this).data("hover-animation-duration");
                $(this).stop().removeAttr("style").removeClass(e);
            }), $(".animated").appear(function() {
                $(this).each(function() {
                    var e = $(this),
                        t = 200 + $(this).data("animation-delay");
                    setTimeout(function() {
                        e.addClass(e.data("animation")).addClass("visible");
                    }, t);
                });
            });
        },
        scroller: function scroller() {
            var e = ($("#header"), $("#header").height()),
                t = ($("#mobile-nav"), $(".section", "#content")),
                a = $("body"),
                o = 0;
            a.hasClass("header-horizontal") && (o = -e);
            var i = $('#header, #mobile-nav, [data-target="local-scroll"]');
            i.find("a").on("click", function() {
                $(this).blur();
            }), i.localScroll({
                offset: o,
                duration: 800,
                easing: $("#content").data("scroll-easing")
            });
            var n = $("#main-menu li > a, #mobile-nav li > a"),
                r = function r(e) {
                    n.each(function() {
                        var t = $(this).attr("href");
                        e == t ? $(this).addClass("active") : $(this).removeClass("active");
                    });
                };
            t.waypoint({
                handler: function handler(e) {
                    if ("up" == e) {
                        var t = "#" + this.element.id;
                        r(t);
                    }
                },
                offset: function offset() {
                    return a.hasClass("header-horizontal") ? -this.element.clientHeight + e : -this.element.clientHeight + 2;
                }
            }), t.waypoint({
                handler: function handler(e) {
                    if ("down" == e) {
                        var t = "#" + this.element.id;
                        r(t);
                    }
                },
                offset: function offset() {
                    return a.hasClass("header-horizontal") ? e + 1 : 1;
                }
            }), $(window).resize(function() {
                setTimeout(function() {
                    Waypoint.refreshAll();
                }, 600);
            });
        },
        masonry: function masonry() {
            var e = $(".masonry");
            e.masonry({
                columnWidth: ".masonry-sizer",
                itemSelector: ".masonry-item",
                percentPosition: !0
            }), e.imagesLoaded().progress(function() {
                e.masonry("layout");
            }), e.on("layoutComplete", Waypoint.refreshAll());
        },
        ajaxLoader: function ajaxLoader() {
            function e() {
                r.fadeIn(200, function() {
                    $("html").addClass("locked-scrolling");
                });
            }

            function t() {
                r.load(o);
            }

            function a() {
                s = !1, $("html").removeClass("locked-scrolling"), $("body").removeClass("ajax-modal-opened"), $(document).scrollTop(i), r.fadeOut(200).scrollTop(0);
            }
            var o,
                i,
                n = $("#ajax-loader"),
                r = $("#ajax-modal"),
                s = !1;
            $('[data-target="ajax-modal"]').on("click", function() {
                return s = !0, i = $(document).scrollTop(), o = $(this).attr("href"), t(), $("body").addClass("ajax-modal-opened"), !1;
            }), $(document).ajaxStart(function() {
                s && n.fadeIn(200);
            }), $(document).ajaxStop(function() {
                s && n.fadeOut(200, function() {
                    e();
                });
            }), r.delegate('*[data-dismiss="close"]', "click", function() {
                return a(), !1;
            });
        },
        mobileNav: function mobileNav() {
            $('[data-target="mobile-nav"]').on("click", function() {
                return $("body").toggleClass("mobile-nav-open"), !1;
            });
        },
        map: function map() {

            var map = new AMap.Map('gaode-map', {
                zoom: 18,
                center: [112.95189, 28.186193],
                zoomEnable: false
            });
            var marker = new AMap.Marker({
                position: [112.953966, 28.185858],
                draggable: false,
                cursor: 'move'
            });
            marker.setMap(map);
            marker.setAnimation('AMAP_ANIMATION_BOUNCE');
            map.setMapStyle('light');
        },
        forms: function forms() {}
    },
    Components: {
        init: function init() {
            this.carousel(), this.modal(), this.chart(), this.progressBar(), this.tooltip(), this.popover(), this.messenger(), this.videoPlayer(), this.navToggleable(), this.navFilter();
        },
        modal: function modal() {
            $(".modal").on("show.bs.modal", function() {
                $("body").addClass("modal-opened");
            }), $(".modal").on("hide.bs.modal", function() {
                $("body").removeClass("modal-opened");
            }), $("#mapModal").on("shown.bs.modal", function() {
                google.maps.event.trigger(map, "resize");
            });
        },
        chart: function chart() {},
        progressBar: function progressBar() {
            $(".progress-animated").appear(function() {
                var e = $(this).find(".progress-bar");
                e.each(function() {
                    setTimeout(function() {
                        var t = e.attr("aria-valuenow"),
                            a = 0;
                        setInterval(function() {
                            a++, t >= a && e.children("span").text(a + "%");
                        }, 15), e.css("width", t + "%");
                    }, 300);
                });
            });
        },
        carousel: function carousel() {
            $(".carousel").owlCarousel({
                items: $(this).data("items"),
                itemsDesktop: $(this).data("items-desktop"),
                itemsDesktopSmall: !1,
                itemsTablet: $(this).data("items-tablet"),
                itemsMobile: $(this).data("items-mobile"),
                singleItem: $(this).data("single-item"),
                autoPlay: $(this).data("auto-play"),
                pagination: $(this).data("pagination"),
                stopOnHover: !0
            });
        },
        tooltip: function tooltip() {
            $("[data-toggle='tooltip']").tooltip();
        },
        popover: function popover() {
            $("[rel='popover']").popover();
        },
        videoPlayer: function videoPlayer() {
            var e = $(".video-player");
            e && e.YTPlayer(), trueMobile && e.hasClass("bg-video") && (e.prev(".bg-video-placeholder").show(), e.remove());
        },
        messenger: function messenger() {
            $('[data-target="messenger"]').on("click", function() {
                var e = $("#messenger"),
                    t = $("#messenger-box");
                return e.hasClass("active") ? (t.find(".messenger-box-content").fadeOut(), e.fadeOut(300).removeClass("active")) : e.fadeIn(300, function() {
                    t.find(".messenger-box-content").fadeIn(400);
                }).addClass("active"), !1;
            });
        },
        navToggleable: function navToggleable() {
            $(".nav-toggleable > li.dropdown > a").on("click", function() {
                return $(this).parent("li").toggleClass("active"), !1;
            });
        },
        navFilter: function navFilter() {
            var e = $(".nav-filter");
            e.on("click", "a", function() {
                var e = $($(this).parents(".nav-filter").data("filter-grid")),
                    t = $(this).attr("data-filter");
                return e.isotope({
                    filter: t
                }), $(this).parents(".nav").find(".active").removeClass("active"), $(this).parent("li").addClass("active"), !1;
            });
        }
    }
};
$(document).ready(function() {
    Mi.init();
});
