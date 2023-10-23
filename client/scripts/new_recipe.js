// Description: This file contains the code for the new recipe page
// to be changed, where the game will take the input of user and update ingredients

window.addEventListener('load', (event) => {
    // a line to get the ingredients from the game, possibly using session storage...=
    answers = JSON.parse(sessionStorage.getItem('answers'));
    console.log(answers);

    let toURL = '';
    for (const [key,values] of Object.entries(answers)) {
        // console.log(key,values);
        toURL += `&${key}=${answers[key].toLowerCase()}`;
    }
    // console.log(toURL);

    //a line to retrive diet and intolerance from the database
    let dietaryRequirements = ["Halal", "Vegan"]; // to be changed
    if (dietaryRequirements.includes('Halal')) {
        toURL += '&excludeIngredients=pork,lard&maxAlcohol=0';
        dietaryRequirements.splice(dietaryRequirements.indexOf("Halal"), 1)
    }
    toURL += `&diet=${dietaryRequirements.join(',')}`

    let intolerances = ["Peanut"]; // to be changed
    toURL += `&intolerances=${intolerances.join(',')}`
    // console.log(toURL);

    let url = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=04c359f786bc4e02bf51de5bb7d4538c&number=21' + toURL;
    // console.log(url);

    shown_recipes_row = document.getElementById('recipes-row');

    axios.get(url).then((response) => {
        // console.log("axios working", response);
        let recipes = response.data.results;
        // console.log(recipes);
        for (recipe of recipes) {
            // console.log(recipe);
            axios.get(`https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=04c359f786bc4e02bf51de5bb7d4538c&includeNutrition=false`).then((response) => {
                // console.log(response.data);
                recipe = response.data;
                shown_recipes_row.innerHTML += createRecipeCard(recipe);
            }).catch((error) => {
                console.log(error);
            });
        }
    }).catch((error) => {
        console.log(error);
    });
});   

function createRecipeCard(recipe) {
    // console.log(recipe.image);
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
// console.log(recipe_card);
return recipe_card;
}