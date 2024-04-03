
var article_category = [];
var article_data = [];

$(function(){
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
    


    $.getJSON("./json/article_category.json", function(data) {
        article_category = data;
        console.log(article_category)

        if( article_category.length <=0 ){

            $(".category.first_section ").addClass("no_article")

        }else{
            //category_layout
            article_category.forEach(function(category_info,key){
                
                category_temp = `
                <li class="category_item" category="${category_info["id"]}" style="--index:${key}">
                    <div class="icon"><img src="img/brand/category_icon/${category_info["id"]}.svg"></div><div class="caption">${category_info["caption"]}</div>
                </li>
                `
                $(".category_list").append(category_temp)
            });


            $(".category_item:first-child").addClass("active");
            setTimeout(function(){
                $(".category_item").addClass("show");
            },0)
            setTimeout(function(){
                $(".category_item").addClass("final")
            },1500)
        }

        


        $.getJSON("./json/article_data.json", function(data) {
            article_data = data
    
            article_data.forEach(function(article_info,key){
    
                $(".article_list").append(article_layout(article_info,key))
                
                
                
            });
    
            setTimeout(function(){
                AOS.init();
            },100)
        });
    });



    
})


function article_layout (data,index){


    article_category_info = article_category.find((element)=>element["id"]==data["category"])
    //console.log(article_category_info)

    layout = `
        <li class="list_item ${article_category_info["id"]}">
            <div class="photo_block"  data-aos="fade-up" data-aos-anchor-placement="top-bottom"  data-aos-offset="${win_H/10*2}" data-aos-duration="1000" >
                <div class="photo"><img src="img/brand/standard/photo/${data["photo"]}" alt="${data["caption"]}"></div>
                <div class="category">${article_category_info["caption"]}</div>
            </div>
            <div class="content"  data-aos="flip-down" data-aos-anchor-placement="top-bottom"  data-aos-offset="${win_H/10}" data-aos-duration="700" data-aos-delay="0">
                <div class="border_wrap">
                    <div class="caption"><h3>${data["caption"]}</h3></div>
                    <div class="discribtion">${data["dtl"]}</div>
                    <div class="link"><a href="${data["link"]}">SEE MORE</a></div>
                </div>
            </div>
        </li>
    `

    return layout;
}