

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
            // username="user"
            console.log(recipeName,recipeURL);

            axios
            .delete(`../../backend/del_recipe.php?username=${username}&recipeName=${recipeName}&recipeURL=${recipeURL}`)
            .then((response) =>{
            let updateLoop = this.loop.filter((el) => el.food !== recipeName);
            this.loop = updateLoop
            console.log(this.loop)
            }).catch((error) => {
                console.log(error);
            });

        },

        async onload(){
            var username= sessionStorage.getItem('username');
            // username = "user"
            console.log(username);
            axios
            .get(`../../backend/get_recipes.php?username=${username}`)
            .then((response) =>{
                
                for(recipeIndex in response.data.data) {
                    
                    this.recipes = response.data.data[recipeIndex]
                    this.loop.push({food:this.recipes.recipeName, imgurl:this.recipes.imgURL,serving:this.recipes.servingSize, cookingtime:this.recipes.estCookingTime,fullrecipe:this.recipes.recipeURL})
                }
                console.log(response.data.data)
                
                
            }).catch((error) => {
                console.log(error);
            });
 
        },
        
    },
    beforeMount(){
        
        this.onload();
    }
})

app.mount("#front-row")

