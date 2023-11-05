console.log("in profile_page.js");

const app = Vue.createApp({
    // Data Properties
    data() {
        return {
            dietReq: [], // to be changed after DB
            intolerances: [], // to be changed after DB
            isCleared: false,
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

        addNewPreferences(user) {
            console.log("addNewPreferences");
            this.dietReq = [];
            this.intolerances = [];
            
            //add new preferences
            for (i = 0; i < document.getElementById("dietary").options.length; i++) {
                if (document.getElementById("dietary").options[i].selected) {
                    this.dietReq.push(document.getElementById("dietary").options[i].value);
                }
            };
            for (i = 0; i < document.getElementById("intolerance").options.length; i++) {
                if (document.getElementById("intolerance").options[i].selected) {
                    this.intolerances.push(document.getElementById("intolerance").options[i].value);
                }
            };

            console.log(this.dietReq, this.intolerances);
            if (this.dietReq.length > 0) {
            //iterate to add to diet
                for (let i = 0; i < this.dietReq.length; i++) {
                    var dietData = {
                        username: user,
                        diet: this.dietReq[i],
                        intolerance: ''
                    };
                    var url2 = '../../backend/add_preference.php';
                        axios.post(url2, dietData,{
                            headers: {
                                'Content-Type': 'application/json'
                        }})
                        .then(response => {
                            console.log('added diet', response.data);
                        })
                        .catch(error => {
                            console.error('adding error', error);
                        });
                }
            }
        
            if (this.intolerances.length > 0) {
            //iterate to add to intolerances
                for (let i = 0; i < this.intolerances.length; i++) {
                    var intoleranceData = {
                        username: user,
                        diet: '',
                        intolerance: this.intolerances[i]
                    };
                    var url3 = '../../backend/add_preference.php';
                        axios.post(url3, intoleranceData,{
                            headers: {
                                'Content-Type': 'application/json'
                        }})
                        .then(response => {
                            console.log('added intol', response.data);
                        })
                        .catch(error => {
                            console.error('adding error', error);
                        });
                }
            }

        },
        
        saveChanges() {
            console.log("saveChanges");
            var user = sessionStorage.getItem("username");

            //clear db
            var url1 = '../../backend/del_preference.php?username=' + user;
            axios.post(url1)
            .then(response => {
                console.log('deleted', response.data);
                this.isCleared = true;
                this.addNewPreferences(user);
            })
            .catch(error => {
                console.error('Error removing preferences', error);
            });

        },

        updateSelectOptions() {
            // Update selections for dietary preferences
            let dietaryOptions = document.getElementById("dietary").options;
            for (let i = 0; i < dietaryOptions.length; i++) {
                // If the current option's value is in the dietReq array, mark it as selected
                if (this.dietReq.includes(dietaryOptions[i].value)) {
                    dietaryOptions[i].selected = true;
                }
            }
            
            // Update selections for intolerances
            let intoleranceOptions = document.getElementById("intolerance").options;
            for (let i = 0; i < intoleranceOptions.length; i++) {
                // If the current option's value is in the intolerances array, mark it as selected
                if (this.intolerances.includes(intoleranceOptions[i].value)) {
                    intoleranceOptions[i].selected = true;
                }
            }
        },        

        getUserPreferences() {
            var user = sessionStorage.getItem("username");
            var url = '../../backend/get_preference.php?username=' + user;
            axios.get(url)
                .then(response => {
                    // console.log('response',response)
                    var data = response.data.data;
                    // console.log(data)

                    // Iterate over the data.diet array and populate this.dietReq
                    for (let i = 0; i < data.diet.length; i++) {
                        // console.log("diet",typeof data.diet[i], data.diet[i]);
                        this.dietReq.push(data.diet[i]);
                        // console.log(typeof this.dietReq, this.dietReq);
                    }

                    // Iterate over the data.intolerance array and populate this.intolerances
                    for (let i = 0; i < data.intolerance.length; i++) {
                        this.intolerances.push(data.intolerance[i]);
                        // console.log("intol",typeof data.intolerance[i], data.intolerance[i]);
                    }

                    // Update the select options after the next DOM update
                    this.$nextTick(() => {
                        this.hideLoadingScreen();
                        this.updateSelectOptions();
                    });
                })
                .catch(error => {
                    this.hideLoadingScreen();
                    console.error('Error',error);
                });
        }
    },

    // Lifecycle Hook
    mounted() {
        this.showLoadingScreen();
        this.getUserPreferences();
    },
}).mount("#main");