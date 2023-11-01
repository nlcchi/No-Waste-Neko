
const main = Vue.createApp({
    // Data Properties
    data() {
        return {
            ingredients: [],
            filter: 'all',
            selectedFilter: 'all', // Default value
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
            // console.log(expiryDate, diffInDays);
            return diffInDays;
        },

        getCardClass(ingredient) {
        // Logic to return the appropriate class based on ingredient's expiry date
            if (this.getDaysTillExpiry(ingredient.expiryDate) <= 0) {
                return 'bg-danger-subtle';
            } else if (this.getDaysTillExpiry(ingredient.expiryDate) <= 7) {
                return 'bg-warning-subtle';
            }
            return '';
        },

        getDaysStyle(ingredient) {
        // Logic to return the appropriate style based on ingredient's expiry date
            if (this.getDaysTillExpiry(ingredient.expiryDate) <= 7) {
                return 'color: red;';
            }
            return '';
        },

        getDaysText(ingredient) {
        // Logic to return the appropriate text based on ingredient's expiry date
            if (this.getDaysTillExpiry(ingredient.expiryDate) <= 0) {
                return 'Expired!';
            } else {
                return this.getDaysTillExpiry(ingredient.expiryDate);
            }
        },

        removeItem(ingredient) {
        // Logic to remove the item
        console.log('Removing item:', ingredient);
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
    },

    // Lifecycle Hook
    mounted() {
        var user = sessionStorage.getItem("username");
        let url = "../../backend/get_fridge.php?username="+user;
        // console.log(url);
        axios.get(url).then(response => {
            var data = response.data;
            //    console.log(data.data);
            this.ingredients = data.data;
            // console.log(this.ingredients);
            
            this.sortIngredients();
            // console.log(this.filter);
            this.displayItems(this.filter);
        }).catch(error => {
            console.log(error);
        });
        // console.log(this.ingredients, this.filter);
    },
})

main.mount('#foodtracker');