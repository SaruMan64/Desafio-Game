import { getOrder } from "./requests.js";
import { factory } from "./timer.js";
import { makeWiggle, dropWiggle } from "./makeItWiggle.js";
let freeSeats = [];
let numberClient = 1;
let services = new Array(6);

function timeOrder(i) {
    let startTime = Date.now();
    services[i] = factory();
    let time = Math.floor(Math.random() * (30 - 5 + 5) + 5);
    console.log("O novo pedido virá em " + time + " segundos.");
    let cod = services[i].setCorrectingInterval(function () {
        let x = Date.now() - startTime;
        //console.log(`Tempo atendimento ${i + 1}: ${x}ms elapsed`);
    }, 1000);
    newClient(time);
}

function newClient(time) {
    let startTime = Date.now();
    let timer = factory();
    let cod = timer.setCorrectingInterval(function () {
        let x = Date.now() - startTime;
        //console.log('New client: ' + x + 'ms elapsed');
        if (x >= (time * 1000)) {
            clientOrder();
            timer.clearCorrectingInterval(cod);
        }
    }, 1000);
}


$(document).on("click", ".accept", function () {
    let string = $(this).parents().parents()[1].id;
    let seat = parseInt(string.substr(6)) - 1;
    timeOrder(seat);

    $(this).parents(".take-my-order").children().children().children().attr("viewBox", "0 0 400 723");
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
        drag: function () {
            makeWiggle(this);
        },
        stop: function () {
            dropWiggle(this);
        }
    });
});

$(document).on("click", ".decline", function () {
    let div = $(`<img src="../images/Pedido/seat.png" />`);
    let reference = $(this).parents(".seat");
    reference.html("");
    reference.append(div[0]);
    console.log($(this).parents());
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
        div = $(`<div id='order-${numberClient}' class='take-my-order'>
                            <div class="order-balloon"></div> 
                            <div class="accept-decline"></div
                        </div>`);
        setTimeout(() => {
            getOrder(numberClient);
            $(".accept-decline").html(`
                <button class="accept"></button>
                <button class="decline"></button>
            `);
            numberClient++;
        }, 500);
        item.prepend(div[0]);
    }, 100);
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
