console.log("in profile_page.js");

const app = Vue.createApp({
    // Data Properties
    data() {
        return {
            dietReq: [], // to be changed after DB
            intolerances: [], // to be changed after DB
        };
    },

    // Methods
    methods: {
        saveChanges() {
            // console.log("saveChanges");
            var user = sessionStorage.getItem("username");
            
            // Clear old preferences
            this.dietReq = [];
            this.intolerances = [];
            var newDietReq = this.dietReq;
            var newIntolerances = this.intolerances;

            //add new preferences
            const selectedDietary = document.getElementById("dietary").options;
            for (let i = 0; i < selectedDietary.length; i++) {
                if (selectedDietary[i].selected) {
                    newDietReq.push(selectedDietary[i].value);
                }
            }

            const selectedIntolerance = document.getElementById("intolerance").options;
            for (let i = 0; i < selectedIntolerance.length; i++) {
                if (selectedIntolerance[i].selected) {
                    newIntolerances.push(selectedIntolerance[i].value);
                }
            }
            
            var newData = {
                username: user,
                diet: newDietReq,
                intolerance: newIntolerances
            };

            var url1 = '../../backend/del_preference.php?username=' + user;
            axios.post(url1)
            .then(response => {
                console.log('deleted', response.data);

            })
            .catch(error => {
                console.error('Error removing preferences', error);
            });
            
            var url2 = '../../backend/add_preference.php';
                axios.post(url2, 
                    {
                        username: user,
                        diet: newDietReq,
                        intolerance: newIntolerances
                    },{
                    headers: {
                        'Content-Type': 'application/json'
                }})
                .then(response => {
                    console.log(newData,newDietReq,newIntolerances)
                    this.dietReq = newDietReq;
                    this.intolerances = newIntolerances;
                    console.log('added', response.data);
                })
                .catch(error => {
                    console.error('adding error', error);
                });
        },

        updateSelectOptions(selectId, selectedValues) {
            const select = document.getElementById(selectId);
            const options = select.options;

            for (let i = 0; i < options.length; i++) {
                const option = options[i];
                if (selectedValues.includes(option.value)) {
                    option.selected = true;
                } else {
                    option.selected = false;
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
                    console.log(data)
                    // this.dietReq = data.dietReq;
                    // this.intolerances = data.intolerances;
                    // console.log(this.dietReq[0])
                    this.dietReq = [];
                    this.intolerances = [];

                    // Iterate over the data.diet array and populate this.dietReq
                    for (let i = 0; i < data.diet.length; i++) {
                        this.dietReq.push(data.diet[i]);
                    }

                    // Iterate over the data.intolerance array and populate this.intolerances
                    for (let i = 0; i < data.intolerance.length; i++) {
                        this.intolerances.push(data.intolerance[i]);
                    }
                })
                .catch(error => {
                    console.error('Error');
                });
        }
    },
    //test
    //twdsau
    // Lifecycle Hook
    mounted() {
        this.getUserPreferences();
        this.updateSelectOptions("dietary", this.dietReq);
        this.updateSelectOptions("intolerance", this.intolerances);
    },
}).mount("#main");