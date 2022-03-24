import { getOrder } from "./requests.js";
import { factory } from "./timer.js";
import { makeWiggle, dropWiggle } from "./makeItWiggle.js";
let freeSeats = [];
let clientsIn = [];
let numberClient = 1;
let services = new Array(6);

function timeOrder(i) {
    let startTime = Date.now();
    services[i] = factory();
    let time = Math.floor(Math.random() * (30 - 15 + 15) + 15);
    console.log("O novo pedido virá em " + time + " segundos.");
    let cod = services[i].setCorrectingInterval(function () {
        let x = Date.now() - startTime;
        //console.log(`Tempo atendimento ${i + 1}: ${x}ms elapsed`);
        services[i].time = x;
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
    /* let string = $(this).parents().parents()[1].id;
    let seat = parseInt(string.substr(6)) - 1;
    timeOrder(seat); */

    $(this).parents(".take-my-order").children().children().children().attr("viewBox", "0 0 400 723");
    $("#orders").append($(this).parents(".take-my-order").children(".order-balloon").html());
    $(this).parents(".take-my-order").remove();

    $(".order").draggable({
        // Garante que seja arrastável
        cursor: "grabbing",
        // containment: "main",
        revert: "invalid",
        revert: true,
        start: function (event, ui) {
            $(this).draggable("instance").offset.click = {
                left: Math.floor(ui.helper.width() / 2),
                top: Math.floor(ui.helper.height() / 2),
            };
        },
        drag: function () {
            makeWiggle(this);
        },
        stop: function () {
            dropWiggle(this);
        }
    });
});

$(document).on("click", ".decline", function () {
    let div = $(`<img src="../images/order/seat.png" />`);
    let reference = $(this).parents(".seat");
    reference.html("");
    let seat = reference.attr("id").split("").pop();

    $(".seat-top-view").each(function(index){
        let img = $(this).children()[5 - seat]
        $(img).attr("src", "../images/others/seat-top-view.svg");
    });

    reference.append(div[0]);
});

function incomeClient(seat, client) {
    let allSeats = $("#all-clients > div");
    let item = allSeats[seat];
    item.innerHTML = "";
    let div = $(
        `<img id=${numberClient} src='../images/order/client-${client}-seat.png' />`
    );
    item.append(div[0]);
    setTimeout(() => {
        div = $(`<div id='order-${numberClient}' class='take-my-order'>
                            <div class="order-balloon"></div> 
                            <div class="accept-decline"></div
                        </div>`);
        setTimeout(() => {
            getOrder(numberClient, seat);
            $(".accept-decline").html(`
                <button class="accept"></button>
                <button class="decline"></button>
            `);
            numberClient++;
        }, 500);
        item.prepend(div[0]);
    }, 100);
}

function copyClient(seat, client) {
    $(".seat-top-view").each(function(index){
        let img = $(this).children()[5 - seat]
        $(img).attr("src", `../images/order/client-${client}-topview.png`);
    });
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
        let whatClientIsComming = Math.floor(Math.random() * 9) + 1;
        while(clientsIn.includes(whatClientIsComming)) {
            whatClientIsComming = Math.floor(Math.random() * 9) + 1;
        }
        clientsIn.push(whatClientIsComming);
        let whatSeatToSeat =
            freeSeats[Math.floor(Math.random() * freeSeats.length)];
        timeOrder(whatSeatToSeat);
        incomeClient(whatSeatToSeat, whatClientIsComming);
        copyClient(whatSeatToSeat, whatClientIsComming);
        freeSeats = [];
    } else {
        console.log("Sem bancos disponíveis");
    }
}

export { clientOrder, newClient, services };