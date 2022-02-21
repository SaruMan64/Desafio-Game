const allIngredients = require("../ingredientsDataBase.json");
const typesOfIngredients = 4;
const minimum = 5;
const maximum = 10;

function aleatory(base, quantity) {
    let ingredients = [];
    for (let i = 0; i < typesOfIngredients; i++) {
        ingredients.push(base[i]);
    }
    for (let i = typesOfIngredients; i < quantity; i++) {
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
    let has = true;
    let holder = base[Math.floor(Math.random() * base.length)];
    ingredients.push(holder);
    for (let i = 0; i < quantity - 1; i++) {
        while(has){
            if(ingredients.find(item => item == holder)){
                holder = base[Math.floor(Math.random() * base.length)];
            } else {
                has = false;
            }
        }
        has = true;
        ingredients.push(holder);
    }
    return ingredients;
}

function getOrder(value) {
    const quantity = (Math.floor(Math.random() * (maximum - minimum)) + minimum);
    const used = selectIngredients(allIngredients.ingredients, typesOfIngredients);
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