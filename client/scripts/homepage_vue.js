const main = Vue.createApp({
    // Data Properties
    data() {
        return {
            ingredients: [],
        };
    },

    // Methods
    methods: {
        processIngredients() {
            let expired = [];
            let expiring = [];

            for (const ingredient of this.ingredients) {
                // console.log(ingredient.expiryDate);
                var exp = (ingredient.expiryDate).split('-');
                var year = exp[0];
                var month = exp[1] - 1;
                var day = exp[2];
                let ExpDate = new Date(year, month, day);
                // console.log(ExpDate, typeof(ExpDate));
                var tdy = new Date();
                // console.log(ExpDate.getTime(), tdy.getTime());
                var diffInDays = Math.ceil((ExpDate.getTime() - tdy.getTime()) / (1000 * 3600 * 24));
                // console.log(diffInDays)

                if (diffInDays <= 0) {
                    if (expiring.includes(ingredient.Name)) {
                        expiring.splice(expiring.indexOf(ingredient.Name), 1);
                    }
                    expired.push(ingredient.Name);
                } else if (diffInDays <= 7) {
                    expiring.push(ingredient.Name);
                }
            }

            if (expired.length > 0) {
                document.getElementById('fridge').innerHTML += `<span class="badge rounded-pill text-bg-danger m-2">Food expired!</span>`;
            } else if (expiring.length > 0) {
                document.getElementById('fridge').innerHTML += `<span class="badge rounded-pill text-bg-danger m-2">Food expiring!</span>`;
            } else {
                ;
            }
        },
        
        logout(){
            sessionStorage.clear();
            console.log("logged out");
            window.location.href = "landingpage.html";
        },

        redirectToFridge() {
            window.location.href = "foodtracker.html";
        },

        redirectToQuiz() {
            window.location.href = "quiz.html";
        },

        redirectToSaved() {
            window.location.href = "saved_recipes.html";
        }
    },

    // Lifecycle Hook
    mounted() {
        var user = sessionStorage.getItem("username");
        let url = "../../backend/get_fridge.php?username="+user;
        // console.log(url);
        axios.get(url).then(response => {
            var data = response.data;
            //    console.log(data);
            this.ingredients = data.data;
            // Now process the ingredients
            this.processIngredients();
        }).catch(error => {
            console.log(error);
        });

        document.getElementById("user").innerText = user;

        var funfact = ["Every day in Singapore, we throw away more than 2,000 tonnes — that’s 2 million kilograms — of food.", "Singapore is a country that has to import over 90% of our food supply and yet food waste is one of our biggest waste streams", "Food waste makes up about half of the average 1.5kg of daily waste from each household here. Half of that food waste —mostly rice, noodles, and bread — could have been prevented, and only about 16% is recycled.", "How to tackle so much food wastage in our nation? by developing a spectrum of initiatives: from turning food waste into fertilisers at HDB estates, to legislating on-site food waste treatment in public sector buildings, to reducing food wastage by having many food rescue operations across the nation.", "When more food is wasted, more food has to be imported to meet the food demand which affects our nation’s food security. We can all play our part by not over-buying food, supporting food rescue groups and donating excess food via organisations such as the Food Bank, Food from the Heart, Fei Yue Community Services, and Willing Hearts.", "In 2021, we wasted 817 million kilograms of food from F&B premises, hawker centres, schools, households, hotels, malls, markets, and food manufacturers.", "When eating out, order only what you can finish. Ask for less rice/noodles if you can’t finish them and say ‘No’ to side dishes you won’t eat.", "24% of households often threw away spoilt or rotten food because they either bought too much food or did not realise that they had food hidden at the back of their fridge.", "Before going grocery shopping, make a shopping list of things you need so you won’t overbuy. Don’t forget to check your fridge and cabinet so you don’t end up buying things you already have. Not only will this minimise food waste, you won’t overspend too.", "Find out who’s coming home for dinner and plan how much food to cook accordingly. If you plan on cooking a variety of dishes for your family, downsize the portions to avoid wasting food.", "Instead of throwing away your leftovers, turn them into tasty new dishes. Learn how to cook up a storm using common leftover ingredients!"];

        var i = Math.floor(Math.random() * (funfact.length - 0) + 0) ;
        document.getElementById("funfact").innerText += funfact[i];
    },
})

main.mount('#main');