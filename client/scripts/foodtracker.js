// to be changed after creating API and db
var ingredients = [{"Name": "chicken", "Category": "Meat", "Exp": "2023-10-23"}, {"Name": "carrot", "Category": "Vegetable", "Exp": "2023-10-26"}, {"Name": "tomato", "Category": "Vegetable", "Exp": "2023-10-15"}, {"Name": "cabbage", "Category": "Vegetable", "Exp": "2023-10-10"}];

var displayIngre = document.getElementById("front-row");
for (ingredient of ingredients) {
    // console.log(ingredient.Exp);
    var exp = (ingredient.Exp).split('-');
    var year = exp[0];
    var month = exp[1] - 1;
    var day = exp[2];
    let ExpDate = new Date(year, month, day);
    // console.log(ExpDate, typeof(ExpDate));
    var tdy = new Date();
    // console.log(ExpDate.getTime(), tdy.getTime());
    var diffInDays = Math.ceil((ExpDate.getTime() - tdy.getTime()) / (1000 * 3600 * 24));
    // console.log(diffInDays)

    if (diffInDays <= 0) {
        displayIngre.innerHTML += `
        <div class="col mb-3">
            <div class="card" >
                <div class="card-body" >
                    <h5 class="card-title text-danger">${ingredient.Name}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">${ingredient.Category}</h6>
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
                <div class="card-body" >
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