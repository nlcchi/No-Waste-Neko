console.log("in profile_page.js");

const app = Vue.createApp({

    // Data Properties
    data() {
        return {
            dietReq: ["Halal", "Vegan"], //to be changed aft db

            intolerances: ["Peanut"], //to be changed aft db
        }
    },

    // Methods
    methods: {
        // async getDietReq() {
        //     const res = await axios.get('/api/dietary_requirements');
        //     this.dietReq = res.data;
        // },
        // async getIntolerances() {
        //     const res = await axios.get('/api/intolerances');
        //     this.intolerances = res.data;
        // },
    }
    
    // Other stuff

}).mount("#main")