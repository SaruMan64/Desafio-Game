// import {makeWiggle, dropWiggle} from "./makeItWiggle.js";

const zeroFill = n => {
  return (n < 10) ? ('000' + n) :
    (n < 100) ? ('00' + n) :
      (n < 1000) ? ('0' + n) :
        n;
}

let idOrder = 1;


// COMEÇAR A PARTIR DO "RETURN DIV"

function makeOrder(response) { 
  // console.log(`MakeOrder: ${JSON.stringify(response)}`);
  let div = $(`<div id=${JSON.stringify(response)} class="order"></div>`);
  div.load("./images/Pedido/pedido.svg");
  let ingredients = Object.entries(response.ingredients);
  setTimeout(() => {
    $(".order-balloon").html(div);
    // let lastOrder = $("#orders div").length;
    let lastOrder = 0;
    console.log(`lastOrder: ${lastOrder}`);
    /* if ($("#order-drop")[0].innerHTML !== "") {
      idOrder = 1;
    } else {
      idOrder = 0;
    } */
    for (let i = 0; i < 4; i++) {
      $(".order-balloon div")
        .eq(lastOrder - 1)
        .find("#ingredient" + (i + 1))
        .attr("href", `./images/foods/${ingredients[i][0]}.png`);
      $(".order-balloon div")
        .eq(lastOrder - 1)
        .find("#num" + (i + 1))
        .text(`${ingredients[i][1]}`);
    }
    $(".order-balloon div")
      .eq(lastOrder - 1)
      .find("#broth")
      .attr("href", `./images/broth/${response.broth}-broth.png`);
    $(".order-balloon div")
      .eq(lastOrder - 1)
      .find("#cook")
      .attr("href", `./images/foods/noddle2.png`);
    $(".order-balloon div")
      .eq(lastOrder - 1)
      .find("#cookTime")
      .text(`${response.cookingTime}`);
    $(".order-balloon div")
      .eq(lastOrder - 1)
      .find("#orderNum")
      .text(zeroFill(idOrder));
      idOrder++;
    // $(".order").draggable({
    //   // Garante que seja arrastável
    //   cursor: "grabbing",
    //   /* cursorAt: {
    //     top: Math.floor($(".order").height() / 9),
    //     left: Math.floor($(".order").width() / 2)
    //   }, */
    //   revert: "invalid",
    //   revert: true,
    //   drag: function(){
    //     makeWiggle(this);
    //   },
    //   stop: function (){
    //     dropWiggle(this);
    //   }
    // });
    
    // $("#make-order").prop("disabled", false);
    return div
  }, 500);

}

export { makeOrder };
