let scrollTimer = null;
let win_st = $(window).scrollTop();
let win_H = $(window).height();
let page_path = location.pathname;





$(function() {

    
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

});

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



