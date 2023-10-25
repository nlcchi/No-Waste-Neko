// to be changed after creating API and db
var ingredients = [{"Name": "chicken", "Category": "Meat", "Exp": "2023-10-23"}, {"Name": "carrot", "Category": "Vegetable", "Exp": "2023-10-26"}, {"Name": "tomato", "Category": "Vegetable", "Exp": "2023-10-15"}, {"Name": "cabbage", "Category": "Vegetable", "Exp": "2023-11-30"}];

// Helper function to calculate days till expiry
function getDaysTillExpiry(expiryDate) {
    var exp = expiryDate.split('-');
    var year = exp[0];
    var month = exp[1] - 1;
    var day = exp[2];
    let ExpDate = new Date(year, month, day);
    var tdy = new Date();
    var diffInDays = Math.ceil((ExpDate.getTime() - tdy.getTime()) / (1000 * 3600 * 24));
    return diffInDays;
}

// Custom sort function
ingredients.sort((a, b) => {
    let daysA = getDaysTillExpiry(a.Exp);
    let daysB = getDaysTillExpiry(b.Exp);

    if (daysA <= 0 && daysB > 0) return -1;
    if (daysB <= 0 && daysA > 0) return 1;
    if (daysA > 0 && daysA <= 7 && daysB > 7) return -1;
    if (daysB > 0 && daysB <= 7 && daysA > 7) return 1;

    return daysA - daysB;
});


var displayIngre = document.getElementById("front-row");
for (ingredient of ingredients) {
    var diffInDays = getDaysTillExpiry(ingredient.Exp);

    if (diffInDays <= 0) {
        displayIngre.innerHTML += `
        <div class="col mb-3">
            <div class="card" >
                <div class="card-body bg-danger-subtle" >
                    <h5 class="card-title"><span style="color: red;">${ingredient.Name}</span></h5>
                    <h6 class="card-subtitle mb-2">${ingredient.Category}</h6>
                    <ul>
                        <li>Expiration Date: ${ingredient.Exp}</li>
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
    } else if (diffInDays <= 7) {
        displayIngre.innerHTML += `
        <div class="col mb-3">
            <div class="card" >
                <div class="card-body bg-warning-subtle" >
                    <h5 class="card-title">${ingredient.Name}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">${ingredient.Category}</h6>
                    <ul>
                        <li>Expiration Date: ${ingredient.Exp}</li>
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
    }
     else {
        displayIngre.innerHTML += `
    <div class="col mb-3">
          <div class="card" >
              <div class="card-body" >
                  <h5 class="card-title">${ingredient.Name}</h5>
                  <h6 class="card-subtitle mb-2 text-body-secondary">${ingredient.Category}</h6>
                  <ul>
                      <li>Expiration Date: ${ingredient.Exp}</li>
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
    }
}