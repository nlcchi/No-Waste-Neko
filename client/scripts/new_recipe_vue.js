const main = Vue.createApp({
    // Data Properties
    data() {
        return {
            recipes: [],
            // showNoRecipesModal: false, // New property to control modal visibility
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

        likeRecipe(recipe_id) {
            console.log("Liking recipe with id " + recipe_id);
            let like_btn = document.getElementById(`like-btn-${recipe_id}`);
            like_btn.classList.add('liked');
            like_btn.disabled = true;

            let spoonurl = `https://api.spoonacular.com/recipes/${recipe_id}/information?apiKey=b6848601c8214ba2aa01641eb221e3cc&includeNutrition=false`;
            axios.get(spoonurl).then(response => {
                let recipe = response.data;
                this.addRecipe(recipe);
            }).catch(error => {
                console.log(error);
            });
        },

        addRecipe(recipe) {
            console.log("Adding recipe to database");
            let url = "../../backend/api/add_recipe.php?username="
            axios.post(url, {
                username: sessionStorage.getItem("username"),
                imgURL: recipe.image,
                recipeName: recipe.title,
                servingSize: recipe.servings,
                estCookingTime: recipe.readyInMinutes,
                recipeURL: recipe.sourceUrl,
            }).then(response =>{
                var data = response.data;
                console.log(data);
            }).catch(error => {
                console.log(error);
            });
        },

        showNoRecipesModal() {
            var element = document.getElementById('no-recipes');
            console.log(element);
            element.class = 'model';
            element.removeAttribute('aria-modal');
            element.removeAttribute('role');
            element.removeAttribute('style');
        }
    },

    // computed: {
    //     modalClass() {
    //         if (showNoRecipesModal) {
    //             return 'modal show';
    //         } else {
    //             return 'modal';
    //         }
    //     }
    // },

    // Lifecycle Hook
    mounted() {
        this.showLoadingScreen();
        
        let url = "../../backend/api/get_preference.php?username="+sessionStorage.getItem("username");
        // console.log(url);
        axios.get(url).then(response =>{
            var preference = response.data.data;
            
            let spoonurl = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=b6848601c8214ba2aa01641eb221e3cc&number=21';
            
            let diet = preference.diet;
            if (diet.includes("Halal")) {
                spoonurl += '&excludeIngredients=pork,lard&maxAlcohol=0';
                diet.splice(diet.indexOf("Halal"), 1);
            }
            spoonurl += '&diet=' + diet.join(',');
            
            let intolerance = preference.intolerance;
            spoonurl += '&intolerances=' + intolerance.join(',');
            
            let answers = JSON.parse(sessionStorage.getItem("answers"));
            console.log(answers);
            spoonurl += '&maxReadyTime=' + answers.maxReadyTime;
            spoonurl += '&type=' + answers.type;
            if (answers.type == 'main course' || answers.type == 'appetizer') {
                spoonurl += '&cuisine=' + answers.cuisine;
                spoonurl += '&maxReadyTime=' + answers.maxReadyTime;
                spoonurl += '&includeIngredients=';
                for (let ingredient of answers.includeIngredients) {
                    // console.log(ingredient);
                    if (ingredient == 'skip' || ingredient == "nvm, let's go") {
                        console.log(ingredient, 'true');
                        answers.includeIngredients.splice(answers.includeIngredients.indexOf(ingredient), 1);
                    }
                }
                spoonurl += answers.includeIngredients.join(',');            
            }
            // console.log(spoonurl);

            axios.get(spoonurl).then(response => {
                console.log("getting recipes");
                let recipes = response.data.results;
                console.log(recipes);
                if (recipes.length == 0) {
                    this.hideLoadingScreen();
                    var element = document.getElementById('no-recipes');
                    element.class = 'model show';
                    element.style.display = 'block';
                    element.setAttribute('aria-modal', 'true');
                    element.setAttribute('role', 'dialog');
                    // this.showNoRecipesModal = true;
                } else {
                    for (let recipe of recipes) {
                        axios.get(`https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=b6848601c8214ba2aa01641eb221e3cc&includeNutrition=false`).then((response) => {
                            this.recipes.push(response.data);
                            // console.log(this.recipes);
                            this.hideLoadingScreen();
                        }).catch((error) => {
                            console.error(error);
                            this.hideLoadingScreen();
                        });
                    }
                }
                
            }).catch((error) => {
                console.error(error);
                this.hideLoadingScreen();
            });
            
        }).catch(error => {
            console.log(error);
        });
    },
})

main.mount('#new_recipes');