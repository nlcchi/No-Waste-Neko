
const main = Vue.createApp({
    // Data Properties
    data() {
        return {
            ingredients: [],
            filter: 'all',
            selectedFilter: 'all', // Default value
            form: {
                productName: '',
                productCat: '',
                expiryDate: '',
            },
        };
    },
    watch: {
        selectedFilter(newFilter) {
            this.displayItems(newFilter);
        },
    },
    // Computed Properties
    computed: {
      filteredIngredients() {
        return this.ingredients.filter(ingredient => {
          const daysTillExpiry = this.getDaysTillExpiry(ingredient.expiryDate);
          if (this.filter === 'expired') {
            return daysTillExpiry <= 0;
          } else if (this.filter === 'nonExpired') {
            return daysTillExpiry > 0;
          }
          return true; // Show all if filter is 'all' or any other value
        });
      },
    },
    // Methods
    methods: {
        showLoadingScreen() {
            document.getElementById('loading-screen').style.display = 'flex';
        },
            
        hideLoadingScreen() {
            document.getElementById('loading-screen').style.display = 'none';
        },

        updateFilter(filter) {
            // console.log('changing filter to:', filter); 
            this.filter = filter;
        },

        sortIngredients() {
            this.ingredients.sort((a, b) => {
                let daysA = this.getDaysTillExpiry(a.expiryDate);
                let daysB = this.getDaysTillExpiry(b.expiryDate);
            
                if (daysA <= 0 && daysB > 0) return -1;
                if (daysB <= 0 && daysA > 0) return 1;
                if (daysA > 0 && daysA <= 7 && daysB > 7) return -1;
                if (daysB > 0 && daysB <= 7 && daysA > 7) return 1;
            
                return daysA - daysB;
            });
        },

        getDaysTillExpiry(expiryDate) {
            // console.log(expiryDate);
            var exp = expiryDate.split('-');
            var year = exp[0];
            var month = exp[1] - 1;
            var day = exp[2];
            let ExpDate = new Date(year, month, day);
            var tdy = new Date();
            var diffInDays = Math.ceil((ExpDate.getTime() - tdy.getTime()) / (1000 * 3600 * 24));
            return diffInDays;
        },

        getCardClass(ingredient) {
            if (this.getDaysTillExpiry(ingredient.expiryDate) <= 0) {
                return 'bg-danger-subtle';
            } else if (this.getDaysTillExpiry(ingredient.expiryDate) <= 7) {
                return 'bg-warning-subtle';
            }
            return '';
        },

        getDaysStyle(ingredient) {
            if (this.getDaysTillExpiry(ingredient.expiryDate) <= 7) {
                return 'color: red;';
            }
            return '';
        },

        getDaysText(ingredient) {
            if (this.getDaysTillExpiry(ingredient.expiryDate) <= 0) {
                return 'Expired!';
            } else {
                return this.getDaysTillExpiry(ingredient.expiryDate);
            }
        },

        removeItem(ingredient) {
            // console.log('Removing item:', ingredient);
            var user = sessionStorage.getItem("username");
            let url = "../../backend/del_fridge.php?username="+user+"&productName="+ingredient.productName+"&productCat="+ingredient.productCat+"&expiryDate="+ingredient.expiryDate;
            axios.get(url).then(response =>{
                var data = response.data;
                    console.log(data);
                    window.location.reload();
                }).catch(error => {
                    console.log(error);
                });
        },

        handleSubmit() {
            console.log('Form submitted!', this.form);
            var user = sessionStorage.getItem("username");
            let url = "../../backend/add_fridge.php";
            axios.post(url, {
                username: user,
                productName: this.form.productName,
                productCat: this.form.productCat,
                expiryDate: this.form.expiryDate
            }).then(response => {
                var data = response.data;
                console.log(data);
                window.location.reload();
            }).catch(error => {
                console.log(error);
            });
        }
    },

    // Lifecycle Hook
    mounted() {
        this.showLoadingScreen();

        var user = sessionStorage.getItem("username");
        let url = "../../backend/get_fridge.php?username="+user;
        // console.log(url);
        axios.get(url).then(response => {
            var data = response.data;
            //    console.log(data.data);
            this.ingredients = data.data;

            // Hide loading screen when the last ingredient is loaded
            if (this.ingredients.length > 0) {
                this.hideLoadingScreen();
            }
            
            this.sortIngredients();
            this.displayItems(this.filter);
        }).catch(error => {
            console.log(error);
            console.log("Hiding loading screen...");
            this.hideLoadingScreen();
            console.log("Loading screen should be hidden now");
        });
    },
})

main.mount('#foodtracker');