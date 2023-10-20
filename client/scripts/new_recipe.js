// Description: This file contains the code for the new recipe page
// to be changed, where the game will take the input of user and update ingredients

// a line to get the ingredients from the game, possibly using session storage...

window.addEventListener('load', (event) => {
    let ingredients = '&includeIngredients=';
    ingredients += 'chicken,carrot'; //to be changed when game is done
    console.log(ingredients);

    let url = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=ba6c0db4041042189779e7d7311402ae&number=21' + ingredients;

    shown_recipes_row = document.getElementById('recipes-row');

    axios.get(url).then((response) => {
        let recipes = response.data.results;
        // console.log(recipes);
        for (recipe of recipes) {
            axios.get(`https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=ba6c0db4041042189779e7d7311402ae&includeNutrition=false`).then((response) => {
                // console.log(response.data);
                recipe = response.data;
                shown_recipes_row.innerHTML +=(createRecipeCard(recipe));
            }).catch((error) => {
                console.log(error);
            });
        }
    }).catch((error) => {
        console.log(error);
    });
});   

function createRecipeCard(recipe) {
    console.log(recipe.image);
    let recipe_card = `
    <div class='col col-sm-4'>
        <div class="card m-4" style="width: 18rem;">
        <img src="${recipe.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${recipe.title}</h5>
            <p class="card-text"> Serving Size: ${recipe.servings}
            <br>
            Ready in ${recipe.readyInMinutes} minutes
            </p>
            <a href="${recipe.sourceUrl}" class="btn btn-primary">Full receipe</a>
        </div>
        </div>
    </div>
`
console.log(recipe_card);
return recipe_card;
}