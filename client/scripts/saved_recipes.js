

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
            // var username="<?php echo $_SESSION['username']; ?>";
            username="user"
            console.log(recipeName,recipeURL);

            axios
            .get(`http://localhost/is216/No-Waste-Neko/backend/del_recipe.php?username=${username}&recipeName=${recipeName}&recipeURL=${recipeURL}`)
            .then((response) =>{
            let updateLoop = this.loop.filter((el) => el.food !== recipeName);
            this.loop = updateLoop
            console.log(this.loop)
            }).catch((error) => {
                console.log(error);
            });

        },

        async onload(){
            // var username="<?php echo $_SESSION['username']; ?>";
            username = "user"
            console.log("loaded");
            axios
            .get(`http://localhost/is216/No-Waste-Neko/backend/get_recipes.php?username=${username}`)
            .then((response) =>{
                
                for(recipeIndex in response.data.data) {
                    
                    this.recipes = response.data.data[recipeIndex]
                    this.loop.push({food:this.recipes.recipeName, imgurl:this.recipes.imgURL,serving:this.recipes.servingSize, cookingtime:this.recipes.estCookingTime,fullrecipe:this.recipes.recipeURL})
                }
                
                
            }).catch((error) => {
                console.log(error);
            });
 
        },
        delete(){
            console.log("delete");
        },
        
    },
    beforeMount(){
        
        this.onload();
    }
})

app.mount("#front-row")

