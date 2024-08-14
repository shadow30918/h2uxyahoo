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


$(function() {

    /*
    let getUrlString = location.href;
    let url = new URL(getUrlString);
    
    tag = url.searchParams.get('tag');

    if(tag != null){
        console.log("tag："+tag);
        $(".projects .project_type_list li[data-type="+tag+"]").click();
    }
    */

    
    $.getJSON("./json/article_data.json", function(article_data) { 
        article_data["promotion"].forEach(function(article_info,index){
            $(".articel_slide .slide_wrap").append(article_layout(article_info,"promotion"))
        });
        article_data["recommend"].forEach(function(article_info,index){
            $(".articel_slide .slide_wrap").append(article_layout(article_info,"recommend"))
        });

        if($(".articel_slide .slide_wrap .article_item").length<6){
            clong_data = $(".articel_slide .slide_wrap").html()
            $(".articel_slide .slide_wrap").append(clong_data)
        }

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
    })
    
    
    
});

function article_layout(data,type){
    template = `
    <div class="article_item swiper-slide">
        <a href="${data["link"]}" target="_blank">
            <div class="photo">
                <img class="cover" src="img/article/${type}/${data["photo"]}" alt="${data["caption"]}">
                <!-- <div class="category">${data["category"]}</div> -->
                <div class="date">
                    <div class="icon"><img src="img/item/robotread.svg"></div>
                    
                </div>
            </div>
            <div class="article_detail">
                <div class="caption"><h3>${data["caption"]}</h3></div>
                <div class="content"><p>${data["dtl"]}</p></div>
            </div>
        </a>
    </div>
    `
    return template
}




$(window).on('scroll', function(){

    if(win_st > win_H/3*2){
        $(".kv video").trigger("pause")
    }else{
        $(".kv video").trigger("play")
    }
    
})




