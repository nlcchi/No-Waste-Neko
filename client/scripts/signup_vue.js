const main = Vue.createApp({
    // Data Properties
    data() {
        return {
            form: {
                username: '',
                password: '',
                c_password: '',
            },
        };
    },

    // Methods
    methods: {
        add_user() {
            console.log("=== [START] add_user() ===")
        
        
            let api_endpoint_url = "../../backend/api/process_signup.php"
        
            axios.post(api_endpoint_url, {
                username: this.form.username,
                password: this.form.password,
                c_password: this.form.c_password,
            })
            .then((response) => {
                console.log('Signup successful:', response.data);
                window.location.href = "../view/loginpage.html";
    
            }).catch((error) => {
                // ERROR
                // Something went wrong
                console.log(error.response ? error.response.data : error);
            })
        
            console.log("=== [END] add_user() ===")
        
        }
    },

    // Lifecycle Hook
    mounted() {
    },
})

main.mount('#main');