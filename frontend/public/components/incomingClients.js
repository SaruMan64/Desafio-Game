import { getOrder } from "./requests.js";
import { factory } from "./timer.js";

let freeSeats = [];

function timeOrder() {
    let startTime = Date.now();
    let factoryVar = factory();
    let time = Math.floor(Math.random() * (30 - 5 + 5) + 1);
    console.log("O novo pedido virá em " + time + " segundos.");
    let cod = factoryVar.setCorrectingInterval(function () {
        let x = Date.now() - startTime;
        console.log(x + 'ms elapsed');
        if (x > time) {
            newClient(0);
            factoryVar.clearCorrectingInterval(cod);
        }
    }, 1000);
}

function newClient(time) {
    let startTime = Date.now();
    let factoryVar = factory();
    let cod = factoryVar.setCorrectingInterval(function () {
        let x = Date.now() - startTime;
        console.log(x + 'ms elapsed');
        if (x >= (time * 1000)) {
            clientOrder();
            factoryVar.clearCorrectingInterval(cod);
        }
    }, 1000);
  }

$(document).on("click", ".accept", function () {
    console.log($(this));
    $(this).parents(".take-my-order").remove();
    getOrder();
});

$(document).on("click", ".decline", function () {
    let div = $(`<img src="../images/Pedido/seat.png" />`);
    let reference = $(this).parents(".seat");
    reference.html("");
    reference.append(div[0]);
});

function incomeClient(seat, client) {
    let allSeats = $("#all-clients > div");
    let item = allSeats[seat];
    item.innerHTML = "";
    let div = $(`<img src='../images/Pedido/client-${client}-seat.png' />`);
    item.append(div[0]);
    setTimeout(() => {
        /* <img src='../images/Pedido/pedido-branco.svg' /> */
        div = $(`<div class='take-my-order'>
                            <div class="order-balloon"></div> 
                            <div class="accept-decline"></div
                        </div>`);
        setTimeout(() => {
            $(".order-balloon").load("../images/Pedido/pedido-branco.svg");
            $(".accept-decline").html(`
                <button class="accept"></button>
                <button class="decline"></button>
            `)
        }, 500);
        item.prepend(div[0]);
    }, 500);
}

function clientOrder() {
    $("#all-clients > div").each(function (i, item) {
        let act = item.children;
        let hold = act[act.length - 1].src.split("/");
        if (hold[hold.length - 1] == "seat.png") {
            freeSeats.push(i);
        }
    });
    if (freeSeats.length !== 0) {
        let whatClientIsComming = Math.floor(Math.random() * 6) + 1;
        let whatSeatToSeat =
            freeSeats[Math.floor(Math.random() * freeSeats.length)];
        console.log(whatClientIsComming, whatSeatToSeat);
        incomeClient(whatSeatToSeat, whatClientIsComming);
        freeSeats = [];
    } else {
        console.log("Sem bancos disponíveis");
    }
}

export { clientOrder, newClient };
