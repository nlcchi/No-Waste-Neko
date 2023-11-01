const main = Vue.createApp({
    // Data Properties
    data() {
        return {
        };
    },

    // Methods
    methods: {
        showLoadingScreen() {
            document.getElementById('loading-screen').style.display = 'flex';
        },
            
        hideLoadingScreen() {
            document.getElementById('loading-screen').style.display = 'none';
        },

        createRecipeCard(recipe) {
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
        },
    },

    // Lifecycle Hook
    mounted() {
        this.showLoadingScreen();

        
        let url = "../../backend/get_preference.php?username="+sessionStorage.getItem("username");
        axios.get(url).then(response =>{
            let answers = JSON.parse(sessionStorage.getItem("answers"));

           var preference = response.data.data;
           
           let spoonurl = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=8c261a5b6a7d439d8f4dd2357a0d9c0b&number=21';
           
           let diet = preference.diet;
           if (diet.includes("Halal")) {
                spoonurl += '&excludeIngredients=pork,lard&maxAlcohol=0';
                diet.splice(diet.indexOf("Halal"), 1);
            }
            spoonurl += '&diet=' + diet.join(',');

            let intolerance = preference.intolerance;
            spoonurl += '&intolerances=' + intolerance.join(',');

            shown_recipes_row = document.getElementById('shown-recipes-row');

            axios.get(spoonurl).then(response => {
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
        }).catch(error => {
            console.log(error);
        });
    },
})

main.mount('#main');