// Adds recipe to the mongo database using the form from add-recipe.html
function addRecipe() {
    var recipe_id = $("#recipe-id").val();
    var recipe_name = $("#recipe-name").val();
    var desc = $("#recipe-description").val();
    var ingredients = $("#recipe-ingredients").val();
    var directions = $("#recipe-instructions").val();
    var image = $("#recipe-image").val();
    var notes = $("#recipe-notes").val();

    //if the recipe id is empty or not an integer, then do not add the recipe
    if(recipe_id == '' || isNaN(recipe_id)){
        alert("Please enter a recipe id");
        return;
    }
    //if the recipe name is empty, then do not add the recipe
    if(recipe_name == ''){
        alert("Please enter a recipe name");
        return;
    }

    //if the image is not a url, then do not add the recipe
    if(image != '' && image.indexOf("http") == -1){
        alert("Please enter a valid image url");
        return;
    }

    $.ajax({
        type: "POST",
        url: "http://localhost:5000/api/recipes/",
        data: { "recipe_id" : recipe_id,"recipe_name" : recipe_name, "desc": desc, "ingredients": ingredients, "directions": directions, "image": image, "notes": notes },
        statusCode: {
            200: function (response) {
                alert("Recipe created.");
                $("#recipe-id").val("");
                $("#recipe-name").val("");
                $("#recipe-description").val("");
                $("#recipe-ingredients").val("");
                $("#recipe-instructions").val("");
                $("#recipe-image").val("");
                $("#recipe-notes").val("");
            }
        },
        dataType: "json"
      });
}

//Update recipe values if the id is found in the database
$("#recipe-id").on("input", function() {
    //check if recipe-id is null
    

    //if the value entered is an integer and not undefined
    if(!isNaN($("#recipe-id").val()) && $("#recipe-id").val() != ""){
        //get the recipe from the database
        $.get("http://localhost:5000/api/recipes/"+$(this).val(), function(data)  {
            //set the valuse of the form to the values from the database
            $("#recipe-name").val(data[0]['recipe_name']);
            $("#recipe-description").val(data[0]['desc']);
            $("#recipe-ingredients").val(data[0]['ingredients']);
            $("#recipe-instructions").val(data[0]['directions']);
            $("#recipe-image").val(data[0]['image']);
            $("#recipe-notes").val(data[0]['notes']);
        });
    }

    //if the value is undefined, clear all the values in the form
    else if($("#recipe-id").val() == ""){
        $("#recipe-name").val("");
        $("#recipe-description").val("");
        $("#recipe-ingredients").val("");
        $("#recipe-instructions").val("");
        $("#recipe-image").val("");
        $("#recipe-notes").val("");
    }
 });

//on click of delete button, delete recipe from the mongo database by recipe_id
$('#delete-recipe').click(function (e) {
    var recipe_id = $("#delete-recipe-id").val();
    $.ajax({
        type: "DELETE",
        url: "http://localhost:5000/api/recipes/"+recipe_id,
        statusCode: {
            200: function (response) {
                alert("Recipe deleted.");
                $("#delete-recipe-id").val("");
        },
        dataType: "json"
    }});
});

//on click of edit button, update recipe in the mongo database by recipe_id
$('#edit-recipe').click(function (e) {
    var recipe_id = $("#recipe-id").val();
    var recipe_name = $("#recipe-name").val();
    var desc = $("#recipe-description").val();
    var ingredients = $("#recipe-ingredients").val();
    var directions = $("#recipe-instructions").val();
    var image = $("#recipe-image").val();
    var notes = $("#recipe-notes").val();

    $.ajax({
        type: "PUT",
        url: "http://localhost:5000/api/recipes/"+recipe_id,
        data: { "recipe_id" : recipe_id,"recipe_name" : recipe_name, "desc": desc, "ingredients": ingredients, "directions": directions, "image": image, "notes": notes },
        statusCode: {
            200: function (response) {
                alert("Recipe updated.");
                $("#recipe-id").val("");
                $("#recipe-name").val("");
                $("#recipe-description").val("");
                $("#recipe-ingredients").val("");
                $("#recipe-instructions").val("");
                $("#recipe-image").val("");
                $("#recipe-notes").val("");
        },
        dataType: "json"
    }});
});
