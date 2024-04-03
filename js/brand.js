
let brand_category = [];

$(function(){
    $.getJSON("./json/brand_category.json", function(data) {
        brand_category = data;
        //console.log(brand_category)

        $.getJSON("./json/brand_data.json", function(data) {

            brand_data = data;
            //console.log(brand_data)
    
            brand_category.forEach(function(category,key){
    
                if(brand_data[category["id"]]!=undefined && Object.keys(brand_data[category["id"]]).length > 0 ){
                    // console.log(category["id"])
                    // console.log(brand_data[category["id"]])

                    //category_layout
                    category_temp = `
                    <li class="category_item" category="${category["id"]}" style="--index:${key}">
                        <div class="icon"><img src="img/brand/category_icon/${category["id"]}.svg"></div><div class="caption">${category["caption"]}</div>
                    </li>
                    `
                    $(".category_list").append(category_temp)
    

                    //brand_page_layout
                    this_brand_pro = brand_data[category["id"]];

                    if(category["id"]=="promotion"){
                        page_template = `
                        <div class="page ${(key==0)?"active":""}" category="${category["id"]}">
                            <div class="brand_pro">
                                <div class="bg">
                                    <div class="cir"></div>
                                </div>
                                <div class="title_icon"><img src="img/brand/category_icon/${category["icon"]}"></div>
                                <div class="title"><h2>${category["caption"]}</h2></div>
                                <div class="mountain"><img src="img/brand/mountain_pro.svg"></div>
                                <div class="inner">
                                    <ul class="pro_list">
                                    </ul>
                                </div>
                            </div>
                        </div>
                        `
                    }else{
                        page_template = `
                        <div class="page" category="${category["id"]}">
                            <div class="brand_pro">
                                <div class="bg">
                                    <div class="cir"></div>
                                </div>
                                <div class="title_icon"><img src="img/brand/category_icon/${category["icon"]}"></div>
                                <div class="title"><h2>${category["caption"]}</h2></div>
                                <div class="mountain"><img src="img/brand/mountain.svg"></div>
                                <div class="inner">
                                    <ul class="pro_list">
                                    </ul>
                                </div>
                            </div>
                            <div class="paticipants">
                                <div class="wave"><img src="img/brand/wave_1.svg"></div>
                                <div class="inner">
                                    <div class="title"><h2>參與品牌</h2></div>
                                    <ul class="paticipants_list">
                                    </ul>
                                </div>
                            </div>
                        </div>
                        `
                    }

                    $(".page_container").append(page_template);

                    this_brand_pro.forEach((element,index) => {

                        layout = brand_pro_layout(element,category,index)
                        
                        $(".page[category="+category["id"]+"] .pro_list").append(layout)

                    });

                    if(category["id"]!="promotion"){
                        for (let index = 0; index < category["amount"]; index++) {
                            
                            $(".page[category="+category["id"]+"] .paticipants_list").append(brand_list_layout(index,category))
                            
                        }
                    }
                }
                
            })
    
            AOS.init();
            $(".category_item:first-child").addClass("active")
            setTimeout(function(){
                $(".category_item").addClass("show");
            },0)
            setTimeout(function(){
                $(".category_item").addClass("final")
            },1500)
        });

    });

    $(".category_list").on("click",".category_item",function(){
        console.log($(this).attr("category"))
        $(".page,.category_item").removeClass("active");
        $(this).addClass("active")
        $(".page[category="+$(this).attr("category")+"]").addClass("active")
        AOS.refresh();

        $("html,body").animate({
            scrollTop: $(".page_container").offset().top
        },1000,"swing")
    })
})

function page_layout (data){

}

function brand_pro_layout (data,category,index){

    if(category["id"]=="promotion"){
        layout = `
        <li class="list_item" id="promotion_${index}">
            <div class="photo_block"  data-aos="fade-up" data-aos-anchor-placement="center-bottom" data-aos-anchor="#promotion_${index}"  data-aos-offset="${win_H/10*1}" data-aos-duration="1000" >
                <div class="photo"><img src="img/brand/promotion/photo/${data["photo"]}" alt="${data["caption"]}"></div>
            </div>
            <div class="content"  data-aos="zoom-in-${(index%2==1)?"left":"right"}" data-aos-anchor-placement="center-bottom" data-aos-anchor="#promotion_${index}"  data-aos-offset="${win_H/10}" data-aos-duration="800" data-aos-delay="150" data-aos-easing="ease-out-back">
                <div class="tag">${category["caption"]}</div>
                <div class="logo"><img src="img/brand/promotion/logo/${data["logo"]}" alt="${data["caption"]}"></div>
                <div class="caption"><h3>${data["caption"]}</h3></div>
                <div class="discribtion">
                    <div class="sub_cap"><h4>${data["sub_caption"]}</h4></div>
                    <div class="dtl">
                        <p>${data["dtl"]}</p>
                    </div>
                </div>
                <div class="link"><a href="${data["link"]}">前往品牌官網</a></div>
            </div>
        </li>
        `
    }else{
        layout = `
        <li class="list_item">
            <div class="photo_block"  data-aos="fade-up" data-aos-anchor-placement="top-bottom"  data-aos-offset="${win_H/10*2}" data-aos-duration="1000" >
                <div class="photo"><img src="img/brand/standard/photo/${data["photo"]}" alt="${data["caption"]}"></div>
            </div>
            <div class="content"  data-aos="fade-up" data-aos-anchor-placement="top-bottom"  data-aos-offset="${win_H/10}" data-aos-duration="1500" data-aos-delay="0">
                <div class="tag">${category["caption"]}</div>
                <div class="caption"><a href="${data["link"]}"><h3>${data["caption"]}</h3></a></div>
                <div class="discribtion">${data["dtl"]}</div>
            </div>
        </li>
        `
    }

    return layout;
}

function brand_list_layout (index,category) {
    index = (index+1<10)?"0"+(index+1):index+1;
    layout = `
    <li class="brand_item">
        <img src="img/brand/standard/logo/${category["id"]}/${category["id"]}_${index}.png">
    </li>
    `
    return layout;
}