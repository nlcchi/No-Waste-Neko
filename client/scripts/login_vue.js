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
        showLoadingScreen() {
            document.getElementById('loading-screen').style.display = 'flex';
        },
            
        hideLoadingScreen() {
            document.getElementById('loading-screen').style.display = 'none';
        },

        validate_form() {
            console.log("=== [START] validate_form() ===")
            this.showLoadingScreen();
            // console.log("form submitted", this.form);

            let api_endpoint_url = "../../backend/process_login.php?username=" + this.form.username + "&password=" + this.form.password

            axios.get(api_endpoint_url)
                .then(response => {
                    console.log(response)
                    window.location.href = "../view/homepage.html"
                    sessionStorage.setItem("username", this.form.username);
                    this.hideLoadingScreen();
                    exit()
                })

                .catch(error => {
                    // ERROR
                    // Something went wrong
                    console.log(error.message)
                })

            console.log("=== [END] validate_form() ===")
        },
        
    },

    // Lifecycle Hook
    mounted() {
        this.hideLoadingScreen();
    },
})

main.mount('#main');