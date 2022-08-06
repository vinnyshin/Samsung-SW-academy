$(document).ready(function() {



	/*##############################################################################*/
	/*  Search Clear Button */
	/*##############################################################################*/

	var $ipt = $('#searchinput'),
		$clearIpt = $('#searchclear');

	$ipt.keyup(function(){
		$("#searchclear").toggle(Boolean($(this).val()));
	});

	$clearIpt.toggle(Boolean($ipt.val()));
	$clearIpt.click(function(){
		$("#searchinput").val('').focus();
		$(this).hide();
	});

	/*##############################################################################*/
	/*  Title Clear Button */
	/*##############################################################################*/

	var $titleIpt = $('#title'),
		$titleClearIpt = $('#titleclear');

	$titleIpt.keyup(function(){
		$titleClearIpt.toggle(Boolean($(this).val()));
	});

	$titleClearIpt.toggle(Boolean($titleIpt.val()));
	$titleClearIpt.click(function(){
		$titleIpt.val('').focus();
		$(this).hide();
		$(".write_total_input").find("em").text("0");
	});

    /*##############################################################################*/
    /* popover */
    /*##############################################################################*/

    $(function () {
        $('[data-toggle="popover"]').popover({
            /*placement: 'top',*/
            /*container: 'body',*/
            html: true,
            template:'<div class="popover-1"><div class="popover-content"></div></div>',
            content: function () {
                return $(this).next('.attack-content').html();
            }
        })
    });

    $(function () {
        $('[data-toggle="popover-1"]').popover({
            /*placement: 'top',*/
            /*container: 'body',*/
            html: true,
            template:'<div class="popover-1 left-1"><div class="popover-content"></div></div>',
            content: function () {
                return $(this).next('.attack-content').html();
            }
        })
    });

    $(function () {
        $('[data-toggle="popover-2"]').popover({
            /*placement: 'top',*/
            /*container: 'body',*/
            html: true,
            template:'<div class="popover-1 left-2"><div class="popover-content"></div></div>',
            content: function () {
                return $(this).next('.attack-content').html();
            }
        })
    });

    /*<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>*/

    /*##############################################################################*/
    /* Top */
    /*##############################################################################*/

    $(".top").click(function(){
        return $("html, body").animate({scrollTop:0},300), !1});

    $(".top").hide();
    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('.top').fadeIn('slow');
            } else {
                $('.top').fadeOut('slow');
            }
        });
    });

    /*##############################################################################*/
    /* tabs-login */
    /*##############################################################################*/
    $(function () {
        function init_tabs() {
            $(".display").css("display", "none");

            if (!$('.tabs-login ul').length) {
                return;
            }
            $('div.display_wrap').each(function () {
                $(this).find('div.display:first').show();
            });

            $('.tabs-login ul a').click(function () {
                if (!$(this).hasClass('active')) {
                    $(this).addClass('active').parent('li').siblings('li').find('a.active').removeClass('active');
                    //$($(this).attr('href')).show("100").siblings('div.display').hide("100");
                    $($(this).attr('href')).show().siblings('div.display').hide();
                }
                this.blur();
                return false;
            });
        }

        init_tabs();
    });
    /* tabs-login End */
//    /*##############################################################################*/
//    /* vTicker */
//    /*##############################################################################*/
//
//    /*! vTicker 1.21 http://richhollis.github.com/vticker/ | http://richhollis.github.com/vticker/license/ | based on Jubgits vTicker http://www.jugbit.com/jquery-vticker-vertical-news-ticker/ */
//    (function(d) {
//        var g, c, f;
//        g = {
//            /* speed: 700,*/
//            speed: 500,
//            pause: 4E3,
//            showItems: 1,
//            mousePause: !0,
//            height: 0,
//            animate: !0,
//            margin: 0,
//            padding: 0,
//            startPaused: !1,
//            autoAppend: !0
//        };
//        c = {
//            moveUp: function(a, b) {
//                return c.showNextItem(a, b, "up")
//            },
//            moveDown: function(a, b) {
//                return c.showNextItem(a, b, "down")
//            },
//            nextItemState: function(a, b) {
//                var e, c;
//                c = a.element.children("ul");
//                e = a.itemHeight;
//                0 < a.options.height && (e = c.children("li:first").height());
//                e += a.options.margin + 2 * a.options.padding;
//                return {
//                    height: e,
//                    options: a.options,
//                    el: a.element,
//                    obj: c,
//                    selector: "up" === b ?
//                        "li:first" : "li:last",
//                    dir: b
//                }
//            },
//            showNextItem: function(a, b, e) {
//                var d;
//                d = c.nextItemState(a, e);
//                d.el.trigger("vticker.beforeTick");
//                e = d.obj.children(d.selector).clone(!0);
//                "down" === d.dir && d.obj.css("top", "-" + d.height + "px").prepend(e);
//                b && b.animate ? a.animating || c.animateNextItem(d, a) : c.nonAnimatedNextItem(d);
//                "up" === d.dir && a.options.autoAppend && e.appendTo(d.obj);
//                return d.el.trigger("vticker.afterTick")
//            },
//            animateNextItem: function(a, b) {
//                b.animating = !0;
//                return a.obj.animate("up" === a.dir ? {
//                        top: "-=" + a.height + "px"
//                    } : {
//                        top: 0
//                    },
//                    b.options.speed,
//                    function() {
//                        d(a.obj).children(a.selector).remove();
//                        d(a.obj).css("top", "0px");
//                        return b.animating = !1
//                    })
//            },
//            nonAnimatedNextItem: function(a) {
//                a.obj.children(a.selector).remove();
//                return a.obj.css("top", "0px")
//            },
//            nextUsePause: function() {
//                var a, b;
//                b = d(this).data("state");
//                a = b.options;
//                if (!b.isPaused && !c.hasSingleItem(b)) return f.next.call(this, {
//                    animate: a.animate
//                })
//            },
//            startInterval: function() {
//                var a, b;
//                b = d(this).data("state");
//                a = b.options;
//                return b.intervalId = setInterval(function(a) {
//                        return function() {
//                            return c.nextUsePause.call(a)
//                        }
//                    }(this),
//                    a.pause)
//            },
//            stopInterval: function() {
//                var a;
//                if (a = d(this).data("state")) return a.intervalId && clearInterval(a.intervalId), a.intervalId = void 0
//            },
//            restartInterval: function() {
//                c.stopInterval.call(this);
//                return c.startInterval.call(this)
//            },
//            getState: function(a, b) {
//                var c;
//                if (!(c = d(b).data("state"))) throw Error("vTicker: No state available from " + a);
//                return c
//            },
//            isAnimatingOrSingleItem: function(a) {
//                return a.animating || this.hasSingleItem(a)
//            },
//            hasMultipleItems: function(a) {
//                return 1 < a.itemCount
//            },
//            hasSingleItem: function(a) {
//                return !c.hasMultipleItems(a)
//            },
//            bindMousePausing: function(a) {
//                return function(a, e) {
//                    return a.bind("mouseenter", function() {
//                        if (!e.isPaused) return e.pausedByCode = !0, c.stopInterval.call(this), f.pause.call(this, !0)
//                    }).bind("mouseleave", function() {
//                        if (!e.isPaused || e.pausedByCode) return e.pausedByCode = !1, f.pause.call(this, !1), c.startInterval.call(this)
//                    })
//                }
//            }(this),
//            setItemLayout: function(a, b, c) {
//                var f;
//                a.css({
//                    overflow: "hidden",
//                    position: "relative"
//                }).children("ul").css({
//                    position: "relative",
//                    margin: 0,
//                    padding: 0
//                }).children("li").css({
//                    margin: c.margin,
//                    padding: c.padding
//                });
//                return isNaN(c.height) || 0 === c.height ? (a.children("ul").children("li").each(function() {
//                    if (d(this).height() > b.itemHeight) return b.itemHeight = d(this).height()
//                }), a.children("ul").children("li").each(function() {
//                    return d(this).height(b.itemHeight)
//                }), f = c.margin + 2 * c.padding, a.height((b.itemHeight + f) * c.showItems + c.margin)) : a.height(c.height)
//            },
//            defaultStateAttribs: function(a, b) {
//                return {
//                    itemCount: a.children("ul").children("li").length,
//                    itemHeight: 0,
//                    itemMargin: 0,
//                    element: a,
//                    animating: !1,
//                    options: b,
//                    isPaused: b.startPaused,
//                    pausedByCode: !1
//                }
//            }
//        };
//        f = {
//            init: function(a) {
//                var b, e;
//                d(this).data("state") && f.stop.call(this);
//                b = jQuery.extend({}, g);
//                a = d.extend(b, a);
//                b = d(this);
//                e = c.defaultStateAttribs(b, a);
//                d(this).data("state", e);
//                c.setItemLayout(b, e, a);
//                a.startPaused || c.startInterval.call(this);
//                if (a.mousePause) return c.bindMousePausing(b, e)
//            },
//            pause: function(a) {
//                var b;
//                b = c.getState("pause", this);
//                if (!c.hasMultipleItems(b)) return !1;
//                b.isPaused = a;
//                b = b.element;
//                if (a) return d(this).addClass("paused"), b.trigger("vticker.pause");
//                d(this).removeClass("paused");
//                return b.trigger("vticker.resume")
//            },
//            next: function(a) {
//                var b;
//                b = c.getState("next", this);
//                if (c.isAnimatingOrSingleItem(b)) return !1;
//                c.restartInterval.call(this);
//                return c.moveUp(b, a)
//            },
//            prev: function(a) {
//                var b;
//                b = c.getState("prev", this);
//                if (c.isAnimatingOrSingleItem(b)) return !1;
//                c.restartInterval.call(this);
//                return c.moveDown(b, a)
//            },
//            stop: function() {
//                c.getState("stop", this);
//                return c.stopInterval.call(this)
//            },
//            remove: function() {
//                var a;
//                a = c.getState("remove", this);
//                c.stopInterval.call(this);
//                a = a.element;
//                a.unbind();
//                return a.remove()
//            }
//        };
//        return d.fn.vTicker = function(a) {
//            return f[a] ? f[a].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" !== typeof a && a ? d.error("Method " + a + " does not exist on jQuery.vTicker") : f.init.apply(this, arguments)
//        }
//    })(jQuery);
//
//    {
//        /* let vticker = $('#vticker');*/
//        vticker = $('#vticker');
//        if(vticker != null){
//        	vticker.vTicker();
//        }
//
//        /*let width = vticker.find('ul').width();
//         vticker.css({
//         'display': 'inline-block',
//         'vertical-align': 'bottom',
//         'width': width
//         });*/
//    }

});//$(document).ready(function() End


//lectureStudy
$(function(){
	$('.lecturebtn_wrap > a').on("click", function(){
		$(this).toggleClass('active').siblings().removeClass('active');
	});

	$('.lecturebtn_wrap > span > a').on("click", function(){
		$(this).toggleClass('active');
	});

	$('.lecture_index ul > li').on("click", function(){
		$(this).toggleClass('active').siblings().removeClass('active');
	});

});



//bookmark click event
$(function() {
	$('.btn-recomm > a').each(function(){
		$(this).on('click', function(e){
			$(this).toggleClass('active');
		});
	});

});

// click event
$(function() {
	$('.wrap_recomm > a.ico_recomm').each(function(){
		$(this).on('click', function(e){
			// $(this).toggleClass('active'); // 기존 2017-08-08 이전

			if(typeof clickProcFlag == "undefined")
			{
				$(this).toggleClass('active');
			}
			else
			{
				if( clickProcFlag )
				{
					$(this).toggleClass('active');
				}
			}
		
			
			
		});
	});

	$('.wrap_recomm > a.ico_unrecomm').each(function(){
		$(this).on('click', function(e){
			if(typeof clickProcFlag == "undefined")
			{
				$(this).toggleClass('active');
			}
			else
			{
				if( clickProcFlag )
				{
					$(this).toggleClass('active');
				}
			}
			
		});
	});

});

// click event - boardCommuView - detail-header
$(function() {
    $('.pointbox > a.infobox.recomm').each(function(){
        $(this).on('click', function(e){
            $(this).toggleClass('active');
        });
    });
});

//lectureStudy allview nav
$(function(){
	$('#btn_nav').on("click", function(){
		// $('.lecture_con .allview_nav').show();
		if( $('.lecture_con .allview_nav').is(":visible") )
		{
			$('.allview_nav').hide();
		}
		else
		{
			$('.lecture_con .allview_nav').show();
		}
	});

	$('.allview_nav > li').on("click", function(){
		$(this).toggleClass('active').siblings().removeClass('active');
		$('.allview_nav').hide();
	});


	$('#allview .btn_allview_nav').on("click", function(){
		$('#allview .allview_nav').show();
	});

});





//lectureStudy
$(function(){
	$('.btn_view_play').on("click", function(){
		$('.text_wrap').toggleClass('none').siblings().removeClass('none');
		$('.movie_wrap').toggleClass('w100');

	});

	$('.btn_view_text').on("click", function(){
		$('.movie_wrap').toggleClass('none').siblings().removeClass('none');
		$('.movie_wrap').removeClass('w100');

	});

	$('.btn_view_both').on("click", function(){
		$('.movie_wrap').removeClass('none');
		$('.text_wrap').removeClass('none');
		$('.movie_wrap').removeClass('w100');
	});


});

//play allview height
$(function(){
	var a = $(window).height();
	var b = $('#top').height();
	var c = $('#div2').height();
	var d = $('#div3').height();
	var e = $('#title').height();
	var f = $(window).width();

	$('#left').css({'height':(a-b+1)+'px'}); //left contents
	$('#div2').css({'height':(a-b-d)+'px'}); //scroll
	$('#div4').css({'height':(a-b-d-e-48)+'px'}); //live code scroll
	/*$('#allview .modal-dialog').css({'height':(a)+'px'});
	$('#allview .modal-dialog').css({'width':(f)+'px'});*/
	$('#allview .modal-dialog .allview_wrap').css({'height':(a)+'px'});
	$('#allview .modal-dialog .allview_wrap').css({'width':(f)+'px'});

	$(window).on('resize', function(){
		$('#div2').css('height',$(window).height() - $('#top:visible').height() - $('#div3:visible').height());
		$('#left').css('height',$(window).height() - $('#top:visible').height());
		$('#div4').css('height',$(window).height() - $('#top:visible').height() - $('#div3:visible').height()- $('#title:visible').height());
	});
});



/*$(function(){
	var a = $(".left > .box5.height").height();
	$('.right > .box5.height').css({'height':(a) +'px'});
});
*/

//lectureNote height
$(function(){
	var a = $(window).height();
	var b = $('.pdf_title').height();
	var c = $('.text_bottom_con').height();

	$('.allviewtext_wrap .pdf_cont').css({'height':(a-b-c-20)+'px'});
	$('.allviewtext_wrap .scroll_wrap').css({'height':(a-b-c-20)+'px'});

	$(window).on('resize', function(){
		$('.allviewtext_wrap .pdf_cont').css('height',$(window).height() - $('.pdf_title:visible').height() - $('.allviewtext_wrap .text_bottom_con:visible').height());
		$('.allviewtext_wrap .scroll_wrap').css('height',$(window).height() - $('.pdf_title:visible').height() - $('.allviewtext_wrap .text_bottom_con:visible').height());
	});
});



//tab type1
$(function(){
	$('.tab_type1 > ul > li').on("click", function(){
		$(this).addClass('active').siblings().removeClass('active');

	});
});



//tab type2
$(function(){
	$('.tab_type2 .inner > a').on("click", function(){
		$(this).addClass('active');
		$(this).parent().parent().siblings().children().children().removeClass('active');
	});
});


//notice hide
$(function(){
	$('.btn_notice_close').on("click", function(){
		$('.txt_notice').hide();
	});

});



//tab
$(function(){
	var $tab = $('.tab_type3 > li');
	var $sub = $('.member_box2 , .visualcode_list, .reference_list, .member_box3_m');
	var i = 0;
	$tab.click(function(){
		$(this).addClass('active').siblings().removeClass('active');
		i = $(this).index();
		$sub.hide();
		$sub.eq(i).show();
	});
});



//visual code layer
$(function() {

	$('.view_breakpoint').on("click", function(){
	   $(".layer_type1").animate({
			//left:'0px',
			//opacity:'1' ,
			width:'toggle'
	   });
	});
	$('.btn_closelayer').on("click", function(){
		$(".layer_type1").animate({
			//left:'-1000px',
			//opacity:'0.5',
			width:'toggle'
		});
	});


	$('.structure_list > .list > .btn_close').each(function(){
		$(this).on('click', function(e){
			$(this).parent('.list').hide();
		});
	});

	$('.draw_list > .list > .btn_close').each(function(){
		$(this).on('click', function(e){
			$(this).parent('.list').hide();
		});
	});
});

//sub-inner-sidebar Tab
$(function(){
    var $tab = $('.tab-menu > h5');
    var $sub = $('.menu-list');
    var i = 0;
    $tab.click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        i = $(this).index();
        $sub.hide();
        $sub.eq(i).show();
    });
});



//ClubMain nav
$(function(){
	$('.nav_notice > ul > li').on("click", function(){
		$(this).toggleClass('active').siblings().removeClass('active');

	});

});


//visualCodeDetailRegister
$(function(){
	$('.structure_list > .list').on("click", function(){
		$(this).toggleClass('select').siblings().removeClass('select');
	});

});


//clubAdmin problembox
$(function(){
	/*
	$('.problembox_mglist > li').on("click", function(){
		$(this).toggleClass('active').siblings().removeClass('active');
	});
	*/
	// $('.problembox_mglist').on("click", 'li span.txt', function(e){
	$('.problembox_mglist').on("click", 'li', function(e){
		// $(this).toggleClass('active').siblings().removeClass('active');
		// remove classes from all
		$(".problembox_mglist > li").removeClass("active");
		// add class to the one we clicked
		$(this).addClass("active");

		// $(this.parentElement).toggleClass('active').siblings().removeClass('active');
		// e.stopPropagation();
	});

	// finder problem popup
	/*$('.categoryList').on("click", 'li', function(){
		$(this).toggleClass('active').siblings().removeClass('active');
	});*/

	$('div.box7').on("click", 'div.list_area', function(){
		$(this).toggleClass('active').siblings().removeClass('active');
	});

	$('.problembox_management .btn_add').on("click", function(){
		$(this).toggleClass('active');
	});




	//clubAdmin tab_type4
	$('.tab_type4 > ul > li').on("click", function(){
		$(this).toggleClass('active').siblings().removeClass('active');
	});

});



//My Problem Box Menu
$(function(){
	$(".nav_problembox > ul > li > a").on("click", function(){
		$(this).parent('li').addClass("active").siblings().removeClass('active');
		$(this).next("ul").slideDown();
		if(!$(this).next("ul").is(":visible")){
			$(this).next("ul").slideUp();
		}else{
			$(this).next("ul").slideDown();
		}
	})

	$(".nav_problembox > ul > li > ul > li").on("click", function(){
		$(this).addClass("active").siblings().removeClass('active');
	})
});


//문제풀이
$(function(){
	$('.test_wrap').slideDown();
	$(".test_top_area > .btn_up").on("click", function(){
		$(this).toggleClass("down");
		$('.test_wrap').slideUp();
		if(!$(this).hasClass("down")){
			$('.test_wrap').slideDown();
		}else{
			$('.test_wrap').slideUp();
		}
	});

//비쥬얼코드 textarea 높이 자동
$('.box6').on( 'keyup', 'textarea', function (e){
     $(this).css('height', 'auto' );
     $(this).height( this.scrollHeight );
   });
$('.box6').find( 'textarea' ).keyup();


});


//통합검색
/*
$(function(){
	$(".input-icon").on("click", function(){
		$('.search_layer').show();
		$('.dim').show();
	});

	$(".btn_close_search").on("click", function(){
		$('.search_layer').hide();
		$('.dim').hide();
	});

});*/