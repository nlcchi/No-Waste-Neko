// Description: This file contains the code for the new recipe page
// to be changed, where the game will take the input of user and update ingredients

window.addEventListener('load', (event) => {
    // Show loading screen
    showLoadingScreen();

    // a line to get the ingredients from the game, possibly using session storage...=
    answers = JSON.parse(sessionStorage.getItem('answers'));
    console.log(answers);

    let toURL = '';
    for (const [key,values] of Object.entries(answers)) {
        // console.log(key,values);
        toURL += `&${key}=${answers[key]}`;
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

    let url = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=8c261a5b6a7d439d8f4dd2357a0d9c0b&number=21' + toURL;
    // console.log(url);

    shown_recipes_row = document.getElementById('recipes-row');

    axios.get(url).then((response) => {
        // console.log("axios working", response);
        let recipes = response.data.results;
        // console.log(recipes);

        // Hide loading screen when the last recipe is loaded
        if (recipes.length > 0) {
            hideLoadingScreen();
        }
        for (recipe of recipes) {
            // console.log(recipe);
            axios.get(`https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=8c261a5b6a7d439d8f4dd2357a0d9c0b&includeNutrition=false`).then((response) => {
                // console.log(response.data);
                recipe = response.data;
                shown_recipes_row.innerHTML += createRecipeCard(recipe);

            }).catch((error) => {
                console.log(error);
                console.log("Hiding loading screen...");
                hideLoadingScreen();
                console.log("Loading screen should be hidden now");

            });
        }
    }).catch((error) => {
        console.log(error);
        console.log("Hiding loading screen...");
        hideLoadingScreen();
        console.log("Loading screen should be hidden now");
    });
});   

function createRecipeCard(recipe) {
    // console.log(recipe.image);
    let displayTitle = recipe.title;
    if (displayTitle.length > 20) {
        displayTitle = displayTitle.substring(0, 20) + '...';
    }
    // console.log(recipe);
    var displayImage;
    if (recipe.hasOwnProperty('image') && recipe.image !== null) {
        displayImage = recipe.image;
    } else {
        displayImage = '../styling/pics/logo.png'; 
    }
    console.log(displayImage);
    let recipe_card = `
    <div class='col col-lg-4 col-md-6'>
        <div class="card m-4" style="width: 18rem;">
        <img src="${displayImage}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${displayTitle} 
                <button id="like-btn-${recipe.id}" class="btn heart-btn" onclick="likeRecipe(${recipe.id})">
                    <i class="far fa-heart"></i>
                </button>
            </h5>
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

function likeRecipe(recipeId) {
    console.log(recipeId);
    // Toggle the liked state visually
    let likeBtn = document.getElementById(`like-btn-${recipeId}`);
    likeBtn.classList.add('liked');

    // Add the recipe ID to the likedRecipes array
    likedRecipes.push(recipeId);

    // Send an AJAX request to add the recipe to the database
    // axios.post('add_liked_recipe.php', {
    //     recipe_id: recipeId
    // })
    // .then(function (response) {
    //     console.log(response.data);
    // })
    // .catch(function (error) {
    //     console.log(error);
    // });
}

function showLoadingScreen() {
document.getElementById('loading-screen').style.display = 'flex';
}

function hideLoadingScreen() {
document.getElementById('loading-screen').style.display = 'none';
}
  
  
  