import { getOrder } from "./requests.js";
import {makeWiggle, dropWiggle} from "./makeItWiggle.js";
let freeSeats = [];
let numberClient = 1;

$(document).on("click", ".accept", function () {
    // console.log($(this));
    // console.log($(this).parents(".take-my-order").children(".order-balloon").html());
    $("#orders").append($(this).parents(".take-my-order").children(".order-balloon").html());
    $(this).parents(".take-my-order").remove();

    $(".order").draggable({
        // Garante que seja arrastável
        cursor: "grabbing",
        /* cursorAt: {
            top: Math.floor($(".order").height() / 9),
            left: Math.floor($(".order").width() / 2)
        }, */
        revert: "invalid",
        revert: true,
        drag: function(){
            makeWiggle(this);
        },
        stop: function (){
            dropWiggle(this);
        }
    });
    // getOrder($(this).parents(".take-my-order").next()[0].id);
    // $(this).parents(".take-my-order").remove();
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
    let div = $(
        `<img id=${numberClient} src='../images/Pedido/client-${client}-seat.png' />`
    );
    item.append(div[0]);
    setTimeout(() => {
        /* <img src='../images/Pedido/pedido-branco.svg' /> */
        div = $(`<div class='take-my-order'>
                            <div class="order-balloon"></div> 
                            <div class="accept-decline"></div
                        </div>`);
        setTimeout(() => {
            // $(".order-balloon").load("../images/Pedido/pedido-branco.svg");
            getOrder();
            // getOrder($(this).parents(".take-my-order").next()[0].id);
            $(this).parents(".take-my-order").remove();
            $(".accept-decline").html(`
                <button class="accept"></button>
                <button class="decline"></button>
            `);
            numberClient++;
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

export { clientOrder };
