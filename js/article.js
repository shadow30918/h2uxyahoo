

$(function(){
    
    var article_category = [];
    var article_data = [];

    $.getJSON("./json/article_category.json", function(data) {
        article_category = data;
        console.log(article_category)


    });
})