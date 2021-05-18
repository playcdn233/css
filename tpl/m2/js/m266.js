var m256 = m256 || {};
m256 = {
    slide: function(){
        var bannerSwiper = new Swiper('.banner_slide',{
            pagination: '.swiper-pagination',
            loop:true,
            autoplay:5000,
            paginationClickable: true,
        }); 
    },
    navSlide: function() {
        var filmswiper = new Swiper('.swiper-filmcontainer', {
            slidesPerView: 'auto',
            paginationClickable: true,
            speed : 500,
            freeMode: true,
            freeModeFluid: true,
            freeModeMomentumRatio: 0.4,
            scrollContainer: true,
            momentumRatio: 0,
            momentumBounce: false,
        });
        var navSwiper = new Swiper('.swiper-navcontainer', {
            freeMode: true,
            freeModeMomentumRatio: 0.5,
            slidesPerView: 'auto',
            roundLengths: true,
            setWrapperSize :true,
        }); 
    },
    tabClick : function(a, b) {
        $(a).click(function(){
            $(this).addClass("on").siblings().removeClass("on");
            $(b).children().eq($(this).index()).addClass("show").siblings().removeClass("show");
        })
    },
    menuClick : function(a,b,c) {
        var btn = $(a);
        var box = $(b);
        var f = true;
        btn.click(function(){
            if(f){
                box.stop().animate({
                    "height" : c + "rem"
                }, 400) 
                f = false;  
            }else {
                box.stop().animate({
                    "height" : "0"
                }, 400) 
                f = true;
            }
        })
        box.click(function(){
            $(this).stop().animate({
                "height" : "0"
            }, 400)
            f = true;
        })
    },
    goTop : function(a){
        var gotop = $(a);
        $(window).scroll(function(){
            $(window).scrollTop() > 200 ? gotop.show() : gotop.hide();                 
        })
        gotop.on("click",function(){
            $('html,body').stop().animate({
                scrollTop : 0
            },500)
        });
    },
    showData: function(a,b,c,d) {
        $(a).click(function(){
            $("body").css({"overflow" : "hidden"})
            $(b).stop().animate({
                "height" : c + "rem"
            }, 400)
        })
        $(".src_"+ d + " .close").click(function(){
            $("body").css({"overflow" : "inherit"})
            $(b).stop().animate({
                "height" : "0"
            }, 400)
        })
    },
    txtData: function() {
        $(".show_txt span").click(function(){
            if($(this).hasClass("down")){
                $(".show_txt > p").css({
                    "height" : "auto",
                })
                $(this).removeClass("down").addClass("up")   
            }else {
                $(".show_txt > p").css({
                    "height" : "1.96rem",
                })
                $(this).removeClass("up").addClass("down") 
            }
        })
    },
    themeData: function(a,b,c){
        $(a).click(function(){
            if($(this).hasClass("down")){
                $(b).css({
                    "height" : "auto"
                }) 
                $(this).removeClass("down").addClass("up");
            }else {
                $(b).css({
                    "height" : c
                })
                $(this).removeClass("up").addClass("down")
            }
        })
    },
    sortData: function(a,b,c){
        $(a).click(function(){
            var ob = $(b),
                box = $(c),
                len = ob.length,
                arr = [],
                i = 0,
                str;
                if($(this).children("i.down").hasClass("on")){
                    $(this).children("i.up").addClass("on").siblings().removeClass("on")
                }else {
                    $(this).children("i.down").addClass("on").siblings().removeClass("on")   
                }
                ob.each(function(){
                    i = len - $(this).index() -1;
                    str = ob.eq(i);
                    arr.push(str);
                })
                box.append(arr);
        })   
    },
    sourceData: function(){
        var p = $("#arr_down").attr("site");
        $("#arr_down").click(function(){
            var site = $(this).attr("site");
            $("body").css({"overflow" : "hidden"})
            $(".play_source_mark").show();
            $(".play_source_mark").stop().animate({
                "opacity" : "1"
            }, 400)
            $(".play_source_con").stop().animate({
                "bottom" :  "0rem"
            }, 400)        
        })
        $(".play_source_mark").click(function(){
            sourceClose()
        })
        $(".source_close").click(function(){
            sourceClose()
        })
        $(".source_slide").click(function(){
            sourceClose()
        })
        function sourceClose() {
            $("body").css({"overflow" : "inherit"})
            $(".play_source_con").stop().animate({
                "bottom" : "-5rem"
            }, 400) 
            $(".play_source_mark").stop().animate({
                "opacity" : "0"
            }, 400)
            setTimeout(function(){
                $(".play_source_mark").hide();
            }, 400)
        }
    },
    ajaxData : function() {
        var box2 = $(".fix_varie_box");
        if(box2.length >= 1) {
            var id = $(".varie_mes").attr("id"),
                tableid = $(".varie_mes").attr("tableid"),
                site = $(".varie_mes").attr("site"),
                url = ""+id+"&tableid="+tableid+"&site="+site+"&do=switchyear&year="
            function varieAjax(obj,url){
                $.ajax({
                        type: 'GET',
                        url: url,
                        dataType: 'json',
                        success: function(data){
                            obj.empty();
                            obj.append(data['data']); 
                            m256.lanScroll();
                            m256.horScroll(); 
                    },
                    error: function(xhr, type){
                        console.log("未加载到数据")
                    }
                });       
            }
            $(".fix_varie_nav .swiper-slide").click(function(){
                var year = $(this).children().text();
                var ajaxurl = url + year;
                $(this).addClass("on").siblings().removeClass("on");
                varieAjax(box2, ajaxurl);
            })
        }
    },
    lanScroll : function() {
        var box = $(".swiper-variecontainer");
        if(box.length >= 1) {
            var item = $(".swiper-variecontainer .ent_model .model_item");
            var t = parseFloat(item.outerWidth(true)+1);
            var l = item.length;
            $(".swiper-variecontainer .ent_model").width(t*l);
            box.on('vmousedown', function(event){
                $(this).on('vmousemove',function(event){
                    picMod();               
                }).on('vmouseup', function(){
                    setTimeout(function(){
                        picMod();
                    }, 500)
                })
            })
            function picMod(){
                item.each(function(){
                    var thisWrap = parseInt(box.width()) + parseInt(box.offset().left);
                    var thisPic = $(this).offset().left; 
                    var real = $(this).children().find("img").attr("data-src");
                    if (thisPic <= thisWrap && real != $(this).children().find("img").attr("src")) {
                       $(this).children().find("img").attr("src", real);
                    }
                    
                })
            }
        }
    },
    horScroll : function() {
        var box = $(".fix_varie_con");
        if(box.length >= 1) {
            var item = $(".fix_varie_con .model_item");
            box.bind("scroll", function(event){
                item.each(function(){
                    var thisButtomTop = parseInt($($(window)).height()) + parseInt($(window).scrollTop());  
                    var thisTop = parseInt($(window).scrollTop());  
                    var PictureTop = parseInt($(this).offset().top); 
                    var real = $(this).children().find("img").attr("data-src"); 
                    if (PictureTop >= thisTop && PictureTop <= thisButtomTop && real != $(this).children().find("img").attr("src")) {
                       $(this).children().find("img").attr("src", real);
                    }
                });
            })    
        }
    },
    share: function() {
        var share = $(".share");
        if(share.length >= 1) {
            $(".news_detail_top em").click(function() {
                $("body").css({"overflow" : "hidden"})
                $(".share_mark").show();
                $(".share_mark").stop().animate({
                    "opacity" : "1"
                },300) 
                $(".share_box").stop().animate({
                    "height" : "2.5rem"
                },300)
            })
            $(".share_mark").click(function() {
                shareHide()
            })
            $(".share_box span").click(function(){
                shareHide()
            })
            function shareHide() {
                $("body").css({"overflow" : "inherit"})
                $(".share_box").stop().animate({
                    "height" : "0rem"
                },300)
                $(".share_mark").stop().animate({
                    "opacity" : "0"
                },300)
                setTimeout(function(){
                    $(".share_mark").hide();     
                }, 300) 
            }
        }
    },
    insertEle: function(a,b) {
        $("document").ready(function(){  
            var obj = $(a);
            if(obj.length > 0) {
                obj.each(function(){
                    var sl = $(this).children().find(b),
                    sw = $(this).width(),
                    len = $(this).children().find(".swiper-slide").length;
                    $(this).children().css({"transform" : "translate3d(0px, 0px, -1px)"})
                    slw = sl.outerWidth(),
                    sp = sl.position().left;
                    sp + slw > sw && sl.index() < len -1 ? sl.parent().css({"transform" : "translate3d(-"+ ((sp + slw*2) - sw) +"px, 0px, 0px)"}) : sl.parent().css({"transform" : "translate3d(-"+ ((sp + slw) - sw) +"px, 0px, 0px)"})                      

                })
            }
        })
    },
    monthSele: function(a) {
        var obj = $(".month_select"),
            len = $(".month_select li").length,
            sp = $(".month_select .on"),
            height = obj.children().children().outerHeight(),
            sh = sp.parent().parent().outerHeight(true),
            sd = sp.parent().parent().index();

        $(".month_select ul").css({
            "margin-top" : -(sh*sd)
        })
        $(".month_select span").click(function(){
            if($(this).hasClass("down")){
                $(this).siblings().css({
                    "height" : height
                })
                $(this).siblings().children().css({
                    "margin-top" : 0
                })  
                $(this).removeClass("down").addClass("up"); 
            }else {
                $(this).siblings().css({
                    "height" : ".6rem"
                })
                $(this).siblings().children().css({
                    "margin-top" : -(sh*sd)
                }) 
                $(this).removeClass("up").addClass("down")
            }
        })
    },
    barScroll: function(a,b,c) {
        if($(a).length > 0) {
            var sh = $(c).height();
            var th = $(".head_detail").height();
            var jh = $(a).height();
            var f = true;
            Abar(f);
            $(a).parent().css({
                "padding-top" : ".88rem"
            })
            $(window).scroll(function(){
                if($(window).scrollTop() > jh) {
                    f = false;
                    Tbar(f);
                    Sbar(f);
                    $(c).stop(true,true).animate({
                        "opacity" : "1"
                    },100)
                    $(".bar_mark").hide();  
                }else {
                    f = true;
                    Tbar(f);
                    Sbar(f);
                    $(c).fadeIn(200);
                }
            })
            $(c).click(function(){
                f = false;
                Abar();
                $(c).fadeIn(200)
                $(".bar_mark").show();
            })
            $(".bar_mark").click(function(){
                f = false;
                Tbar(f);
                Sbar(f);
                $(c).stop(true,true).animate({
                    "opacity" : "1"
                },100)
                $(".bar_mark").hide();
            })
            function Tbar(f){
                f ? $(b).css({"position" : "static","visibility" : "visible"}) : $(b).css({"position" : "static","visibility" : "hidden"})
            }
            function Sbar(f){
                f ? $(c).css({"position" : "relative","top" : ".88rem"}) : $(c).css({"position" : "fixed","top" : ".88rem"})
            }
            function Abar(f){
                f ? $(a).siblings(".head_detail").css({"position" : "fixed","width" : "7.2rem","top" : "0","z-index" : "99"}) : $(b).css({"position" : "fixed","top" : ".88rem","visibility" : "visible","z-index" : "999"})
            }
        }
    },
    splitString: function(a,b) {
        var str = $(a).text();
        var len = b;
        var arr= [];
        function autoAddEllipsis(pStr, pLen) { 
            var _ret = cutString(pStr, pLen); 
            var _cutFlag = _ret.cutflag; 
            var _cutStringn = _ret.cutstring; 

            if ("1" == _cutFlag) { 
                return _cutStringn + "..."; 
            } else { 
                return _cutStringn; 
            } 
        } 
        function cutString(pStr, pLen) { 
            var _strLen = pStr.length; 
            var _tmpCode; 
            var _cutString; 
            var _cutFlag = "1"; 
            var _lenCount = 0; 
            var _ret = false; 
            if (_strLen <= pLen/2) { 
                _cutString = pStr; 
                _ret = true; 
            } 
            if (!_ret) { 
            for (var i = 0; i < _strLen ; i++ ) { 
                if (isFull(pStr.charAt(i))) { 
                    _lenCount += 2; 
                } else { 
                    _lenCount += 1; 
                } 
                if (_lenCount > pLen) { 
                    _cutString = pStr.substring(0, i); 
                    _ret = true; 
                    break; 
                } else if (_lenCount == pLen) { 
                    _cutString = pStr.substring(0, i + 1); 
                    _ret = true; 
                    break; 
                } 
            } 
        } 
        if (!_ret) { 
            _cutString = pStr; 
            _ret = true; 
        } 

        if (_cutString.length == _strLen) { 
            _cutFlag = "0"; 
        } 

            return {"cutstring":_cutString, "cutflag":_cutFlag}; 
        } 
        function isFull (pChar) { 
            if ((pChar.charCodeAt(0) > 128)) { 
                return true; 
            } else { 
                return false; 
            } 
        } 
        var strAfter = autoAddEllipsis(str, len);

        arr[0] = str;

        arr[1] = strAfter;

        $(a).text(strAfter);

        return arr;
    },
    splitClick: function(a,b,c) {
        if($(a).length > 0) {
            var str = m256.splitString(".star_txt p", "145");
            var d = $(a).html();
            var f = true;
            $(a).click(function(){
                if(f) {
                    $(b).parent().height("auto");
                    $(b).text(str[0]);
                    $(a).html("收起")
                    f = false;   
                }else {
                    $(b).parent().height(c);
                    $(b).text(str[1]);
                    $(a).html(d)
                    f = true;
                }
            })
        }
    },
    lazyLoad: function() {            
        var throttle = function (fn, delay, mustRunDelay) {
            var timer;  
            var t_start;        
            return function (val) {
                var args = arguments, t_curr = +new Date();  
                clearTimeout(timer);
                if (!t_start) {  
                    t_start = t_curr;
                }
                if (t_curr - t_start >= mustRunDelay) {
                    fn.apply(null, args);
                    t_start = t_curr;
                } else {
                    timer = setTimeout(function () {
                        fn.apply(null, args);
                    }, delay);
                }
            }
        };
        function LazyLoad() {}
            var download_count = 0,
            nl_count = 0,
            nl_obj = [],
            ele_obj = [];
        LazyLoad.prototype = {
            init: function () {
                this.initElementMap();
                this.lazy();
                this.throttleLoad();
            },
            getPosition: {
                Viewport: function () {
                    if (document.compatMode == "BackCompat") {
                        var Height = document.body.clientHeight;
                    } else {
                        var Height = document.documentElement.clientHeight;
                    }
                    return Height;
                },
                ScrollTop: function () {
                    if (document.compatMode == "BackCompat") {
                        var elementScrollTop = document.body.scrollTop;
                    } else {
                        var elementScrollTop = document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop;
                    }
                    return elementScrollTop;
                },
                ElementViewTop: function (ele) {
                    if (ele) {
                        var actualTop = ele.offsetTop;
                        var current = ele.offsetParent;
                        while (current !== null) {
                            actualTop += current.offsetTop;
                            current = current.offsetParent;
                        }
                        return actualTop - this.ScrollTop();
                    }
                }
            },
            initElementMap: function () {
                var el = document.getElementsByTagName('img');
                for (var j = 0, len2 = el.length; j < len2; j++) {
                    //查找有data-src标签的img
                    if (typeof (el[j].getAttribute("data-src")) == "string") {
                        ele_obj.push(el[j]);
                        download_count++;
                    }
                }
            },
            lazy: function () {
                if (!download_count) return;
                var innerHeight = LazyLoad.prototype.getPosition.Viewport();
                for (var i = 0, len = ele_obj.length; i < len; i++) {
                    var t_index = LazyLoad.prototype.getPosition.ElementViewTop(ele_obj[i]); 
                    if (t_index < innerHeight) {
                        ele_obj[i].src = ele_obj[i].getAttribute("data-src");
                        ele_obj[i].removeAttribute("data-src");
                        delete ele_obj[i];
                        download_count--;
                    }
                }
            },
            throttleLoad: function () {
                var throttle1 = throttle(LazyLoad.prototype.lazy, 200, 500);
                window.onscroll = window.onload = function () {
                    throttle1();
                }
            },
        };
        window.LazyLoad = LazyLoad;
        var x = new LazyLoad();
        x.init();
    },
    entPlay: function() {
        var a = $(".ent_poster");
        var b = $(".ent_detail iframe");
        if(a.length > 0) {
            if(b.length > 0) {
                a.click(function(){
                    var f = $(this).siblings("iframe").attr("data-src");
                    $(this).hide().siblings("iframe").attr("src", f);
                })
            }
        }
    },
    navTab: function(){
        if($('.swiper_nav').length > 0) {
            var nav = $('.swiper_nav').swiper({
                slidesPerView: 'auto',
                freeMode:true,
                noSwiping : true,
                freeModeFluid:true,
                onTap: function(nav){
                    pages.slideTo(nav.clickedIndex)
                }
            })
            var pages = $('.swiper_pages').swiper({
                noSwiping : true,
                onSlideChangeStart: function(){
                    $(".swiper_nav .on").removeClass('on')
                    $(".swiper_nav .swiper-slide").eq(pages.activeIndex).addClass('on')  
                }
            })
            
        }
    },
    artLoad: function(){
        if($("#artLoad").length > 0){
            $("#artLoad").siblings(".loading").click(function(){
                var id = $("#artLoad").attr("data"),
                    page = $("#artLoad").attr("page"),
                    npage = parseInt(page) + 1;
                $.ajax({
                        type: 'GET',
                        data: {'page':npage, 'id':id},
                        url: "",
                        dataType: 'json',
                        success: function(data){
							if(data.num < 10){						
								$(".loading").css('display','none');	
							} 							
							if (data.html) {
								$("#artLoad").attr("page",npage);
								$("#artLoad").append(data['html']); 
							} else {
								$(".loading").css('display','none');	
							}
                    },
                    error: function(xhr, type){
                        $(".loading").css('display','none');	
                    }
                });         
            })
        }
    }
} 
m256.lazyLoad();
function channel(){
    m256.slide();
    m256.menuClick(".menu_btn",".layer",10.4);
    m256.goTop(".go_top");
    m256.navSlide();
    m256.tabClick(".anime_nav li",".anime_con");

}
function detail() {
    m256.menuClick(".menu_detail",".layer",10.4);
    m256.sourceData();
    m256.goTop(".go_top");
    m256.navSlide();
    m256.txtData();
	/*
	m256.showData(".show_data1",".src_1",5.5,1);
    m256.showData(".show_data1",".fix_varie",6.1,1);
    m256.sortData(".sort1",".fix_select_1 a", ".fix_select_1");
	*/
	var len = $('.fix_select_con').length;
	for (var i=1;i<=len;i++)
	{
	m256.showData(".show_data"+i,".src_"+i,5.5,i);
    m256.showData(".show_data"+i,".fix_varie",6.1,i);
    m256.sortData(".sort"+i,".fix_select_"+i+" a", ".fix_select_"+i);
	}
    m256.lanScroll();
    m256.horScroll(); 
    m256.ajaxData();
    m256.barScroll(".select_bar",".model_bar", ".select");
    m256.splitClick(".star_txt em",".star_txt p","1.6rem");
    m256.themeData(".theme_txt span", ".theme_txt p","1.2rem");
    m256.themeData(".star_data span", ".star_data .editor_con","1.6rem");
    m256.navTab();
    m256.share();
    m256.entPlay(); 
    m256.monthSele();
    m256.artLoad();
}