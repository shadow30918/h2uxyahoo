
var article_category = [];
var article_data = [];
var recommend_data = [];

$(function(){
    

    $("body").on("click",".category_item",function(){
        $(".category_item").removeClass("active")
        $(this).addClass("active")
        this_category = $(this).attr("category");
        console.log(this_category)

        article_filter(this_category);
    })


    $.getJSON("./json/article_category.json", function(article_category_data) {
        article_category = article_category_data;
        console.log(article_category)

        if( article_category.length <=0 ){

            $(".category.first_section ").addClass("no_article")
            AOS.init();

        }else{

            /*
                //category_layout
                article_category.forEach(function(category_info,key){
                    
                    category_temp = `
                    <li class="category_item" category="${category_info["id"]}" style="--index:${key}">
                        <div class="icon"><img src="img/brand/category_icon/${category_info["id"]}.svg"></div><div class="caption">${category_info["caption"]}</div>
                    </li>
                    `
                    $(".category_list").append(category_temp)
                });

                //$(".category_item:first-child").addClass("active");

                setTimeout(function(){
                    $(".category_item").addClass("show");
                },0)
                setTimeout(function(){
                    $(".category_item").addClass("final")
                },1500)
            */


            $.getJSON("./json/article_data.json", function(data) {              

                article_data = data["promotion"]
                recommend_data = data["recommend"]

                console.log(article_data);


                article_category.forEach(function(category_info,key){

                    this_category_article_arry = article_data.filter((ele)=>ele["category"]==category_info["id"])

                    if(this_category_article_arry.length>0){
                        category_temp = `
                        <li class="category_item" category="${category_info["id"]}" style="--index:${key}">
                            <div class="icon"><img src="img/brand/category_icon/${category_info["id"]}.svg"></div><div class="caption">${category_info["caption"]}</div>
                        </li>
                        `
                        $(".category_list").append(category_temp)
                    }
                })

                if( $(".category_list .category_item").length ==1 && false){
                    $(".category.first_section .inner").hide()
                }else{
                    setTimeout(function(){
                        $(".category_item").addClass("show");
                    },0)
                    setTimeout(function(){
                        $(".category_item").addClass("final")
                    },1500)
                }


        
                article_data.forEach(function(article_info,key){
                    $(".article_list").append(article_layout(article_info,key))
                });

                recommend_data.forEach(function(article_info,key){
                    $(".recommend .slide_wrap").append(recommend_layout(article_info,key))
                });
                if(recommend_data.length<6){
                    clone_data = $(".recommend .slide_wrap").html();
                    $(".recommend .slide_wrap").append(clone_data,clone_data)
                }
                
                let swiperSec2 = new Swiper('.recommend .swiper', {
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
        
                setTimeout(function(){
                    //$(".category_item:first-child").click();
                    AOS.init();
                },100)
            });
        }

        

        
        
    });



    
})


function article_filter(sel_category) {
    $(".article_list .list_item").each(function(){
        if($(this).hasClass(sel_category)){
            $(this).show()
        }else{
            $(this).hide()
        }
    })
    
    AOS.init();

    $("html,body").animate({
        scrollTop: $(".article_list_wrap").offset().top - win_H/3
    },700,"swing")
}

function article_layout (data,index){


    article_category_info = article_category.find((element)=>element["id"]==data["category"])
    //console.log(article_category_info)

    if(article_category_info!=undefined){
        layout = `
        <li class="list_item ${article_category_info["id"]}">
            <div class="photo_block"  data-aos="fade-up" data-aos-anchor-placement="top-bottom"  data-aos-offset="${win_H/10*2}" data-aos-duration="1000" >
                <div class="photo"><img src="img/article/promotion/${data["photo"]}" alt="${data["caption"]}"></div>
                <div class="category">${article_category_info["caption"]}</div>
            </div>
            <div class="content"  data-aos="flip-down" data-aos-anchor-placement="top-bottom"  data-aos-offset="${win_H/10}" data-aos-duration="700" data-aos-delay="0">
                <div class="border_wrap">
                    <div class="caption"><h3>${data["caption"]}</h3></div>
                    <div class="discribtion">${data["dtl"]}</div>
                    <div class="link"><a href="${data["link"]}" target="_blank">SEE MORE</a></div>
                </div>
            </div>
        </li>
        `
    }else{
        layout = '';
    }
    

    return layout;
}

function recommend_layout(data,index) {
    layout = `
    <div class="article_item swiper-slide">
        <a href="${data["link"]}" target="_blank">
            <div class="photo">
                <img class="cover" src="img/article/recommend/${data["photo"]}" alt="${data["caption"]}">
                <!-- <div class="category">${data["category"]}</div> -->
            </div>
            <div class="article_detail">
                <div class="caption"><h3>${data["caption"]}</h3></div>
                <div class="content"><p>${data["dtl"]}</p></div>
            </div>
        </a>
    </div>
    `
    return layout
}

