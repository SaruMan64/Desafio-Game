const zeroFill = (n) => {
    return n < 10 ? "000" + n
    : n < 100 ? "00" + n
    : n < 1000 ? "0" + n
    : n;
};

function makeOrder(response, numberClient) { 
  let div = $(`<div id=${JSON.stringify(response)} class="order"></div>`);
  div.load("./images/Pedido/pedido.svg");
  let ingredients = Object.entries(response.ingredients);
  setTimeout(() => {
    $(`#order-${numberClient} .order-balloon`).html(div);
    // let lastOrder = 0;
    for (let i = 0; i < 4; i++) {
      $(`#order-${numberClient} .order-balloon div`)
        // .eq(lastOrder - 1)
        .find("#ingredient" + (i + 1))
        .attr("href", `./images/foods/${ingredients[i][0]}.png`);
      $(`#order-${numberClient} .order-balloon div`)
        // .eq(lastOrder - 1)
        .find("#num" + (i + 1))
        .text(`${ingredients[i][1]}`);
    }
    $(`#order-${numberClient} .order-balloon div`)
      // .eq(lastOrder - 1)
      .find("#broth")
      .attr("href", `./images/broth/${response.broth}-broth.png`);
    $(`#order-${numberClient} .order-balloon div`)
      // .eq(lastOrder - 1)
      .find("#cook")
      .attr("href", `./images/foods/noddle2.png`);
    $(`#order-${numberClient} .order-balloon div`)
      // .eq(lastOrder - 1)
      .find("#cookTime")
      .text(`${response.cookingTime}`);
    $(`#order-${numberClient} .order-balloon div`)
      // .eq(lastOrder - 1)
      .find("#orderNum")
      .text(zeroFill(numberClient));
  }, 500);

}

export { makeOrder };
