const allIngredients = require("../ingredientsDataBase.json");
const quantity = (Math.floor(Math.random() * (10 - 4)) + 4);

function aleatory(base, quantity) {
  let ingredients = [];
  for(let i = 0; i < quantity; i++) {
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

function getOrder(value) {
  const order = {
    "id": value,
    "broth": allIngredients.broth[Math.floor(Math.random() * allIngredients.broth.length)],
    "cookingTime": ((Math.floor(Math.random() * 10) * 5) + 10),
    "ingredients": aleatory(allIngredients.ingredients, quantity),
  }
  return order;
}

module.exports = {
  getOrder
};