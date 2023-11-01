console.log("in profile_page.js");

const app = Vue.createApp({
    // Data Properties
    data() {
        return {
            dietReq: ['Halal'], // to be changed after DB
            intolerances: [], // to be changed after DB
        };
    },

    // Methods
    methods: {
        saveChanges() {
            console.log("saveChanges");
            const selectedDietary = document.getElementById("dietary").options;
            const newDietReq = [];
            for (let i = 0; i < selectedDietary.length; i++) {
                if (selectedDietary[i].selected) {
                    newDietReq.push(selectedDietary[i].value);
                }
            }
            this.dietReq = newDietReq;

            const selectedIntolerance = document.getElementById("intolerance").options;
            const newIntolerances = [];
            for (let i = 0; i < selectedIntolerance.length; i++) {
                if (selectedIntolerance[i].selected) {
                    newIntolerances.push(selectedIntolerance[i].value);
                }
            }
            this.intolerances = newIntolerances;
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
                    this.dietReq = data.dietReq;
                    this.intolerances = data.intolerances;
                })
                .catch(error => {
                    console.error('Error');
                });
        }
    },

    // Lifecycle Hook
    mounted() {
        this.getUserPreferences();
        this.updateSelectOptions("dietary", this.dietReq);
        this.updateSelectOptions("intolerance", this.intolerances);
    },
}).mount("#main");
