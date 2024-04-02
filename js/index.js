
let swiperSec1 = new Swiper('.banner_slide .swiper', {
    loop: true,
    slidesPerView: 3,
    //spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        disabledClass: "-disabled"
    }
})

let swiperSec2 = new Swiper('.article .swiper', {
    loop: true,
    slidesPerView: 3,
    //spaceBetween: 30,
    centeredSlides: true,
    // autoplay: {
    //     delay: 5000,
    //     disableOnInteraction: false
    // },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        disabledClass: "-disabled"
    },
    breakpoints: {
        768: {
          slidesPerView: 5
        }
      },
})

$(".projects .project_type_list li").click(function(){
    project_type = $(this).data("type")

    if($(this).hasClass("active")){
        $(".projects .project_list .project_item").show()
        $(this).removeClass("active")
    }else{
        $(".projects .project_list .project_item").each(function(){
            if($(this).hasClass(project_type)){
                $(this).show()
            }else{
                $(this).hide()
            }
            $(this).removeClass("active")
        })
        $(".projects .project_type_list li").removeClass("active")
        $(this).addClass("active")
    }
});

$(".volumn").click(function(){

    if($(this).hasClass("on")){
        $(this).removeClass("on")
        $(".kv video").prop("muted",true);
    }else{
        $(this).addClass("on")
        $(".kv video").prop("muted",false);
    }
})


$(function() {

    let getUrlString = location.href;
    let url = new URL(getUrlString);
    
    tag = url.searchParams.get('tag');

    if(tag != null){
        console.log("tag："+tag);
        $(".projects .project_type_list li[data-type="+tag+"]").click();
    }


    
});




$(window).on('scroll', function(){

    if(win_st > win_H/3*2){
        $(".kv video").trigger("pause")
    }else{
        $(".kv video").trigger("play")
    }
    
})




