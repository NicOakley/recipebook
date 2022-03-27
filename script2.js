//fire the getData() function when the page loads
var pagenum = 1;
var lastPage = 0;

$(document).ready(function() {


    console.log(pagenum);
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

//this method will "get" all data, build the table rows and insert the HTML into the table body
/*function getData() {

    $.get("http://localhost:5000/api/recipes/", function(data)  {
        console.log("in script");

        //iterate over the JSON response, building an HTML string
        var left_content_string = "";
            
        $(data).each(function(key, object) {
    
            //HTML table row
            left_content_string += "<h2 class='recipe-name'>"+object['recipe_name']+"</h2>";
        });
    
        //set the HTML string on the client
        $("#content-1").html(left_content_string);
        
    });
}*/


function getRecipe(id) {
    $.get("http://localhost:5000/api/recipes/"+id, function(data)  {

        //iterate over the JSON response, building an HTML string
        var left_content_string = "";
        var ingredient_string = "";
        var right_content_string = "";
        var ingredient_content_string = "";
        var n = 0;


        $(data).each(function(key, object) {
            //iterate over the object['ingredients'] array, building an HTML string
            //if n is greater than 6, then a new row will be created
            for(n = 0; n < object['ingredients'].length; n++) {
                ingredient_string += "<p class='text-left ml-5'>"+object['ingredients'][n]+"</p>";
           }

           //ingredients
           ingredient_content_string += "<h5 class='mt-4 mb-2 ml-5 text-left' style='font-weight: bold'>Ingredients</h5><div class='text-left ml-5' style='min-height: 140px;'>"+ ingredient_string + "</div>";



            //build the left_content_string for the left page
            //title
            left_content_string += "<h2 style='font-family: pacifico;' class='recipe-name'>"+object['recipe_name']+"</h2>";
            //description
            left_content_string += "<p style='font-family: pacifico;' class='recipe-desc mt-3'>"+object['desc']+"</p><hr style='height: 1px; width: 400px;'>";
            
            //image
            left_content_string += "<img class='img-fluid mt-4 rounded' style='max-height: 250px; min-height:250px; outline: 2px solid #836148; opacity: 80%;' src='"+object['image']+"'>";

            //build the right_content_string for the right page
            right_content_string += "<h5 class='mt-4 mb-2 ml-5 text-left'>Directions </h5><p class='text-left ml-5'>"+ object['directions'] +"</p>";
            right_content_string += "<h5 class='mt-4 mb-2 ml-5 text-left' style='font-size: 14px;'>Notes </h5><p class='text-left ml-5' style='font-size: 14px;'>"+ object['notes'] +"</p>";

        });

       //set the HTML in the div on the cookbook
       $("#content-1").html(left_content_string);
       $("#content-2").html(right_content_string);
       $('#ingredients').html(ingredient_content_string);
       

       if($('.recipe-name').text() == ''){
        pagenum = lastPage;
        getRecipe(lastPage);
    }
    });
}

function nextPage(){
    if($('.recipe-name').text() != ''){
        lastPage = pagenum;
        pagenum++;
        getRecipe(pagenum);
        console.log(pagenum);
    }
}

function lPage(){
    if(pagenum != 1){
        pagenum--;
        getRecipe(pagenum);
        console.log(pagenum);
    }
}