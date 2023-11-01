const main = Vue.createApp({
    // Data Properties
    data() {
        return {
            recipes: [],
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
            // like_btn.innerHTML = '<i class="fas fa-heart"></i>';
            like_btn.disabled = true;

            let spoonurl = `https://api.spoonacular.com/recipes/${recipe_id}/information?apiKey=68cde3b31a3a4afe83e42bad147fea8c&includeNutrition=false`;
            axios.get(spoonurl).then(response => {
                let recipe = response.data;
                this.addRecipe(recipe);
            }).catch(error => {
                console.log(error);
            });
        },

        addRecipe(recipe) {
            console.log("Adding recipe to database");
            let url = "../../backend/add_recipe.php?username="
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
    },

    // Lifecycle Hook
    mounted() {
        this.showLoadingScreen();
        
        let url = "../../backend/get_preference.php?username="+sessionStorage.getItem("username");
        axios.get(url).then(response =>{
            let answers = JSON.parse(sessionStorage.getItem("answers"));
            console.log(answers);

           var preference = response.data.data;
           
           let spoonurl = 'https://api.spoonacular.com/recipes/complexSearch?apiKey=68cde3b31a3a4afe83e42bad147fea8c&number=21';
           
           let diet = preference.diet;
           if (diet.includes("Halal")) {
                spoonurl += '&excludeIngredients=pork,lard&maxAlcohol=0';
                diet.splice(diet.indexOf("Halal"), 1);
            }
            spoonurl += '&diet=' + diet.join(',');

            let intolerance = preference.intolerance;
            spoonurl += '&intolerances=' + intolerance.join(',');
            
            axios.get(spoonurl).then(response => {
                let recipes = response.data.results;
                
                for (let recipe of recipes) {
                    axios.get(`https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=68cde3b31a3a4afe83e42bad147fea8c&includeNutrition=false`).then((response) => {
                        this.recipes.push(response.data);
                        this.hideLoadingScreen();
                    }).catch((error) => {
                        console.error(error);
                        this.hideLoadingScreen();
                    });
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