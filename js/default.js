let scrollTimer = null;
let win_st = $(window).scrollTop();
let win_H = $(window).height();
let page_path = location.pathname;





$(function() {
    win_H = $(window).height();
    
    AOS.init();

    page_name = page_path.split(".")[0].split("/").pop()
    page_name = (page_name=="")?"index":page_name;
    $("nav .nav_item[caption='"+page_name+"']").addClass("active")

    $(".nav_item").hover(function(){
        origin_X = $(".nav_list").offset().left;
        this_X = $(this).offset().left;
        this_w = $(this).innerWidth();
        $(".underLine").css({"left":this_X-origin_X,"width":this_w})
    })

    $(".hem").click(function(){
        $(this).toggleClass("open")
    })

    $(".gotop").click(function(){
        scroll_t = ($(window).scrollTop() / 2 > 1500)? 1500 :$(window).scrollTop() / 2
        $("html,body").animate({
            scrollTop: 0
        },scroll_t,'swing')
    })

    $(".back").click(function(){
        if($(window).scrollTop() / 2 > 1500){
            scroll_t = 1500;
            ease = "easeInOutQuint"
        }else{
            scroll_t = $(window).scrollTop() / 2;
            ease = "swing"
        }
        $("html,body").animate({
            scrollTop: $(".category.first_section").offset().top
        },scroll_t,ease)
    })

    $("nav .collapse_list").click(function(){
        if($(window).width()<1039){
            $(this).find(".sub_list").slideToggle(300)
        }
    })
    
    $("video").click(function(){
        if($(this).hasClass("pause")){
            $(this).removeClass("pause").trigger("play")
        }else{
            $(this).addClass("pause").trigger("pause")
        }
    })

    document.getElementById('shareFBbtn').onclick = function() {
        FB.ui({
          display: 'popup',
          method: 'share',
          href: 'https://campaign.edh.tw/',
        }, function(response){});
    }
    document.getElementById('shareLinebtn').onclick = function() {
        window.open("https://social-plugins.line.me/lineit/share?url=https://campaign.edh.tw/","line-share","width=500,height=500,top=100,left=50")
    }

});

$(window).on("load",function(){
    AOS.init();
})

$(window).on('scroll', function(){
    
    win_st = $(window).scrollTop();
    win_H = $(window).height();

    if(win_st > 0){
        $("header").addClass("scroll")
    }else{
        $("header").removeClass("scroll")
    }

    /*
    clearInterval(scrollTimer);
    $("header").addClass("show");
    scrollTimer = setTimeout(function(){
        $("header").removeClass("show");
    }, 1500);
    */
    
})

//resize
$(window).on('resize', function(){
   
}).trigger('resize')



