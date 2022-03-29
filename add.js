

//hack
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Adds recipe to the mongo database using the form from add-recipe.html

function addRecipe() {
    
    //hack
    var recipe_id = getRandomInt(1000,2000);

    var recipe_name = $("#recipe-name").val();
    var description = $("#recipe-description").val();
    var ingredients = $("#recipe-ingredients").val();
    var instructions = $("#recipe-instructions").val();
    var image = $("#recipe-image").val();
    var notes = $("#recipe-notes").val();

    $.ajax({
        type: "POST",
        url: "http://localhost:5000/api/recipes/",
        data: { "recipe_id" : recipe_id, "recipe_name" : recipe_name, "description": description, "ingredients": ingredients, "instructions": instructions, "image": image, "notes": notes },
        statusCode: {
            200: function (response) {
                alert("Recipe created.");
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