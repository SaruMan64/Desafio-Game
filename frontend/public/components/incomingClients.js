import {makeOrder} from "./makeOrder.js";

function clientOrder(response){
    console.log(response);
    let whatClientIsComming = Math.floor(Math.random() * 6) + 1;
    for(let i = 0; i < 6; i++){
        if($("#allClients > div")[i].innerHTML == ""){
            
        }
    }
    makeOrder(response);
}

export {clientOrder};