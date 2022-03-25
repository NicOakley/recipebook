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

        $(data).each(function(key, object) {
            left_content_string += "<h2 class='recipe-name'>"+object['recipe_name']+"</h2>";
            left_content_string += "<p class='recipe-desc mt-3'>"+object['desc']+"</p><hr style='height: 1px; width: 400px;'>";
            left_content_string += "<h5 class='mt-4 mb-2 ml-5 text-left'>Ingredients </h5><p class='text-left ml-5'>"+ object['ingredients'] +"</p>";

        });

       //set the HTML in the div on the cookbook
       $("#content-1").html(left_content_string);

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


//asdas