// Adds recipe to the mongo database using the form from add-recipe.html

function addRecipe() {
    var recipe_id = $("#recipe-id").val();
    var recipe_name = $("#recipe-name").val();
    var desc = $("#recipe-description").val();
    var ingredients = $("#recipe-ingredients").val();
    var directions = $("#recipe-instructions").val();
    var image = $("#recipe-image").val();
    var notes = $("#recipe-notes").val();

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

//on click of delete button, delete recipe from the mongo database by recipe_id
$('#delete-recipe').click(function (e) {
    var recipe_id = $("#delete-recipe-id").val();
    console.log(recipe_id);
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