console.log("in profile_page.js");

const app = Vue.createApp({
    // Data Properties
    data() {
        return {
            dietReq: ["Halal", "Vegan"], // to be changed after DB
            intolerances: ["Peanut"], // to be changed after DB
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
    },

    // Lifecycle Hook
    mounted() {
        this.updateSelectOptions("dietary", this.dietReq);
        this.updateSelectOptions("intolerance", this.intolerances);
    },
}).mount("#main");
