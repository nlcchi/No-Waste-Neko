

const app = Vue.createApp({
    data() {
        return {
            cardtitle: "",
            servingsize: "",
            cookingtime: "",
            fullrecipe: "",
            imgurl: "",
            recipes: {},
            recipe: {},
            loop:[]
        }
    },

    methods: {
        removecard(recipeName,recipeURL) {
            var username= sessionStorage.getItem('username');
            // console.log(recipeName,recipeURL);

            axios
            .delete(`../../backend/api/del_recipe.php?username=${username}&recipeName=${recipeName}&recipeURL=${recipeURL}`)
            .then((response) =>{
            let updateLoop = this.loop.filter((el) => el.food !== recipeName);
            this.loop = updateLoop
            // console.log(this.loop)
            }).catch((error) => {
                // console.log(error);
            });
        },

        showLoadingScreen() {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.style.display = 'flex';
            } else {
                // console.error('Loading screen element not found!');
            }        },
            
        hideLoadingScreen() {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) {
                loadingScreen.style.display = 'none';
            } else {
                // console.error('Loading screen element not found!');
            }        
        },

        async onload(){
            this.showLoadingScreen();
            var username= sessionStorage.getItem('username');
            // console.log(username);
            axios
            .get(`../../backend/api/get_recipes.php?username=${username}`)
            .then((response) =>{
                
                for(recipeIndex in response.data.data) {
                    
                    this.recipes = response.data.data[recipeIndex]
                    this.loop.push({food:this.recipes.recipeName, imgurl:this.recipes.imgURL,serving:this.recipes.servingSize, cookingtime:this.recipes.estCookingTime,fullrecipe:this.recipes.recipeURL})
                }
                // console.log(response.data.data)
                // console.log(this.loop);
            
                // Hide loading screen here after recipes are populated
                this.hideLoadingScreen();
            }).catch((error) => {
                // console.log(error);
                // console.log("Hiding loading screen...");
                this.hideLoadingScreen();
                // console.log("Loading screen should be hidden now");
            });
 
        },
        
    },
    beforeMount(){
        this.onload();

    }
})

app.mount("#saved_recipes")

