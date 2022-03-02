import {makeOrder} from "./makeOrder.js";

function clientOrder(response){
    console.log(response);
    let whatClientIsComming = Math.floor(Math.random() * 6) + 1;
    for(let i = 0; i < 6; i++){
        if($("#allClients > div")[i].innerHTML == ""){
            $("#allClients > div")[i].attr("href", `../images/Pedido/client-${whatClientIsComming}-seat.png`);
        }
    }
    makeOrder(response);
}

export {clientOrder};