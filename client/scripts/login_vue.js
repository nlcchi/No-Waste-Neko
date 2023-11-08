const main = Vue.createApp({
    // Data Properties
    data() {
        return {
            form: {
                username: '',
                password: '',
            },
        };
    },

    // Methods
    methods: {
        funfact() {
            let funfacts = ["Applesauce was the first food eaten in space.", "Pistachios aren’t nuts—they are actually fruits.", "The world’s most expensive spice is saffron.", "Broccoli contains more protein than steak!", "The most stolen food in the world is cheese.", "The most popular fruit in the world is the tomato.", "The most popular spice in the world is pepper.", "The most popular vegetable in the world is the potato.", "The most popular nut in the world is the almond.", "The most popular grain in the world is rice.", "The most popular meat in the world is pork.", "The most popular seafood in the world is shrimp.", "The most popular fish in the world is herring.", "The most popular beverage in the world is water.", "The most popular cheese in the world is mozzarella.", "The most popular herb in the world is basil.", "The most popular spice blend in the world is curry powder.", "The most popular condiment in the world is soy sauce.", "The most popular sauce in the world is salsa."];

            let random = Math.floor(Math.random() * funfacts.length);
            let funfact = funfacts[random];
            // console.log(funfact);
            document.getElementById("funfact").innerText += funfact;
        },

        showLoadingScreen() {
            document.getElementById('loading-screen').style.display = 'flex';
        },
            
        hideLoadingScreen() {
            document.getElementById('loading-screen').style.display = 'none';
        },

        validate_form() {
            // console.log("=== [START] validate_form() ===")
            this.showLoadingScreen();
            // console.log("form submitted", this.form);

            let api_endpoint_url = "../../backend/api/process_login.php?username=" + this.form.username + "&password=" + this.form.password

            axios.get(api_endpoint_url)
                .then(response => {
                    // console.log(response)
                    window.location.href = "../view/homepage.html"
                    sessionStorage.setItem("username", this.form.username);
                    this.hideLoadingScreen();
                    exit()
                })

                .catch(error => {
                    // ERROR
                    // console.log(error.message)
                })

            // console.log("=== [END] validate_form() ===")
        },
        
    },

    // Lifecycle Hook
    mounted() {
        this.funfact();
        this.hideLoadingScreen();
    },
})

main.mount('#main');