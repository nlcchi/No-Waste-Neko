// to be changed after creating API and db
var ingredients = [{"Name": "chicken", "Category": "Meat", "Exp": "2023-10-23"}, {"Name": "carrot", "Category": "Vegetable", "Exp": "2023-10-26"}, {"Name": "tomato", "Category": "Vegetable", "Exp": "2023-10-15"}, {"Name": "cabbage", "Category": "Vegetable", "Exp": "2023-10-10"}];
var expired = [];
var expiring = [];

for (const ingredient of ingredients) {
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
        if (expiring.includes(ingredient.Name)) {
            expiring.splice(expiring.indexOf(ingredient.Name), 1);
        }
        expired.push(ingredient.Name);
    } else if (diffInDays <= 7) {
        expiring.push(ingredient.Name);
    }
}



if (expired.length > 0) {
    document.getElementById('fridge').innerHTML += `<span class="badge rounded-pill text-bg-danger m-2">Food expired!</span>`;
} else if (expiring.length > 0) {
    document.getElementById('fridge').innerHTML += `<span class="badge rounded-pill text-bg-danger m-2">Food expiring!</span>`;
} else {
    ;
}
