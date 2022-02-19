const allIngredients = require("../ingredientsDataBase.json");

function aleatory(base, quantity) {
    let ingredients = [];
    for (let i = 0; i < quantity; i++) {
        ingredients.push(base[Math.floor(Math.random() * base.length)]);
    }
    let resp = {};
    let holder = [...ingredients];
    holder.forEach((el) => {
        if (resp.hasOwnProperty(el)) {
            resp[el] += 1;
        } else {
            resp[el] = 1;
        }
    })
    return resp;
}

function selectIngredients(base, quantity) {
    let ingredients = [];
    let holder = base[Math.floor(Math.random() * base.length)];
    ingredients.push(holder);
    for (let i = 0; i < quantity; i++) {
        let has = true;
        while(has){
            if(ingredients.find(item => item == holder)){
                holder = base[Math.floor(Math.random() * base.length)];
            } else {
                has = false;
            }
        }
        ingredients.push(holder);
    }
    return ingredients;
}

function getOrder(value) {
    const quantity = (Math.floor(Math.random() * 6) + 4);
    const used = selectIngredients(allIngredients.ingredients, 4);
    const order = {
        "id": value,
        "broth": allIngredients.broth[Math.floor(Math.random() * allIngredients.broth.length)],
        "cookingTime": ((Math.floor(Math.random() * 10) * 5) + 10),
        "quantIngredients": quantity,
        "ingredients": aleatory(used, quantity)
    }
    return order;
}

module.exports = {
    getOrder
};