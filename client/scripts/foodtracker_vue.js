
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

        displayItems(filter) {
            let displayIngre = document.getElementById("front-row");
            displayIngre.innerHTML = ''; // Clear current items
            for (var ingredient of this.ingredients) {
                // console.log(ingredient);
                var diffInDays = this.getDaysTillExpiry(ingredient.expiryDate);
                
                if (filter === 'expired' && diffInDays <= 0) {
                    // ... (display expired items)displayIngre.innerHTML += this.getExpiredCard(ingredient);
                    displayIngre.innerHTML += this.getExpiredCard(ingredient);
                } else if (filter === 'nonExpired' && diffInDays > 0) {
                    // ... (display non-expired items)
                    if (diffInDays <= 7) {
                        displayIngre.innerHTML += this.getExpiringCard(diffInDays, ingredient);
                    }
                     else {
                        displayIngre.innerHTML += this.getNormalCard(diffInDays,  ingredient);
                    }
                } else if (filter === 'all') {
                    // ... (display all items)
                    if (diffInDays <= 0) {
                        displayIngre.innerHTML += this.getExpiredCard(ingredient);
                    } else if (diffInDays <= 7) {
                        displayIngre.innerHTML += this.getExpiringCard(diffInDays, ingredient);
                    }
                     else {
                        displayIngre.innerHTML += this.getNormalCard(diffInDays, ingredient);
                    }
                }
            }
        },

        getExpiredCard(ingredient) {
            // console.log(ingredient);
            return `
            <div class="col mb-3">
                <div class="card" >
                    <div class="card-body bg-danger-subtle" >
                        <h5 class="card-title"><span style="color: red;">${ingredient.productName}</span></h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">${ingredient.productCat}</h6>
                        <ul>
                            <li>Expiration Date: ${ingredient.expiryDate}</li>
                            <li>Days Till Expiry: <span style="color: red;">Expired!</span></li>
                        </ul>
        
                        <!-- Remove button -->
                        <div class="d-flex justify-content-center">
                            <button type="button" class="btn btn-light">Remove</button>
                        </div>
                    </div>
        
                </div>
                </div>
            `;
        },

        getExpiringCard(diffInDays, ingredient) {
            return `
            <div class="col mb-3">
                <div class="card">
                    <div class="card-body bg-warning-subtle">
                        <h5 class="card-title">${ingredient.productName}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">${ingredient.productCat}</h6>
                        <ul>
                            <li>Expiration Date: ${ingredient.expiryDate}</li>
                            <li>Days Till Expiry: <span style="color: red;">${diffInDays}</span></li>
                        </ul>
        
                        <!-- Remove button -->
                        <div class="d-flex justify-content-center">
                            <button type="button" class="btn btn-light">Remove</button>
                        </div>
                    </div>
        
                </div>
                </div>
            `;
        },

        getNormalCard(diffInDays, ingredient) {
            return `
           <div class="col mb-3">
                 <div class="card" >
                     <div class="card-body" >
                         <h5 class="card-title">${ingredient.productName}</h5>
                         <h6 class="card-subtitle mb-2 text-body-secondary">${ingredient.productCat}</h6>
                         <ul>
                             <li>Expiration Date: ${ingredient.expiryDate}</li>
                             <li>Days Till Expiry: ${diffInDays}</li>
                         </ul>
       
                         <!-- Remove button -->
                         <div class="d-flex justify-content-center">
                             <button type="button" class="btn btn-light">Remove</button>
                         </div>
                     </div>
       
                 </div>
               </div>
           `;
       },
    },

    // Lifecycle Hook
    mounted() {
        var user = sessionStorage.getItem("username");
        let url = "../../backend/get_fridge.php?username="+user;
        console.log(url);
        axios.get(url).then(response => {
            var data = response.data;
            //    console.log(data.data);
            this.ingredients = data.data;
            // console.log(this.ingredients);
            
            this.sortIngredients();
            console.log(this.filter);
            this.displayItems(this.filter);
        }).catch(error => {
            console.log(error);
        });
        // console.log(this.ingredients, this.filter);
    },
})

main.mount('#foodtracker');