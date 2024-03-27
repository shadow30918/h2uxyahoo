let scrollTimer = null;
let win_st = $(window).scrollTop();
let win_H = $(window).height();



$(function() {

    $(".hem").click(function(){
        $(this).toggleClass("open")
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

    if(win_st > win_H/3*1){
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



