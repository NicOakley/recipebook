//fire the getData() function when the page loads
var pagenum = 1;
var lastPage = 0;
$(document).ready(function() {
    getRecipe(pagenum);
});
    //next page
    $('#content-2').click(function (e) {
        nextPage();
    });
    //last page
    $('#content-1').click(function (e) { 
        lPage();
    });

function getRecipe(id) {
    $.get("http://localhost:5000/api/recipes/"+id, function(data)  {

        //check if get is successful
        if(data.length > 0){
        

        //iterate over the JSON response, building an HTML string
        var left_content_string = "";
        var right_content_string = "";

        $(data).each(function(key, object) {
            //build the left_content_string for the left page
            //title
            left_content_string += "<h2 style='font-family: pacifico;' class='recipe-name'>"+object['recipe_name']+"</h2>";
            //description
            left_content_string += "<p style='font-family: pacifico;' class='recipe-desc mt-3'>"+object['desc']+"</p><hr style='height: 1px; width: 400px;'>";
            //ingredients
            left_content_string += "<h5 class='mt-4 mb-2 ml-5 text-left'>Ingredients</h5><div class='text-left ml-5' style='min-height: 80px; max-width:200px;'>"+ object['ingredients'] + "</div>";
            //image
            left_content_string += "<img class='img-fluid mt-4 rounded' style='max-height: 250px; min-height:250px; outline: 2px solid #836148; opacity: 80%;' src='"+object['image']+"'>";

            //build the right_content_string for the right page
            right_content_string += "<h5 class='mt-4 mb-2 ml-5 text-left'>Directions </h5><p class='text-left ml-5'>"+ object['directions'] +"</p>";
            right_content_string += "<h5 class='mt-4 mb-2 ml-5 text-left'>Notes </h5><p class='text-left ml-5' style='font-size: 14px;'>"+ object['notes'] +"</p>";
        });

       //set the HTML in the div on the cookbook
       $("#content-1").html(left_content_string);
       $("#content-2").html(right_content_string);
    }
    else{
        pagenum = lastPage;
    }
    });
}

function nextPage(){
    if($('.recipe-name').text() != ''){
        lastPage = pagenum;
        pagenum++;
        getRecipe(pagenum);
        console.log("pagenum: "+pagenum);
        console.log("lastPage: "+lastPage);
    }
}

function lPage(){
    if(pagenum != 1){
        pagenum--;
        getRecipe(pagenum);
        console.log("pagenum: "+pagenum);
        console.log("lastPage: "+lastPage);
    }


}