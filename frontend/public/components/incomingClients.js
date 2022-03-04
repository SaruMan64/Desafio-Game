import {getOrder} from "./requests.js";

function clientOrder(){
    let whatClientIsComming = Math.floor(Math.random() * 6) + 1;
    $("#all-clients > div").each(function(i,item){
        let act = item.children[0].src.split("/");
        if(act[act.length -1] == "seat.png"){
            item.innerHTML = "";
            let div = $(`<div class='take-my-order'>
                            <img src='../images/Pedido/pedido.png' />
                            <div class="accept-decline">
                                <div class="accept"></div>
                                <div class="decline"></div>
                            </div
                        </div>`);
            item.append(div[0]);
            div = $(`<img src='../images/Pedido/client-${whatClientIsComming}-seat.png' />`);
            item.append(div[0]);
            $(".accept").click(function() {
                console.log("OI!");
                getOrder();
            });
            $(".decline").click(function() {
                item.innerHTML = "";
                item.append(`<img src="../images/Pedido/seat.png" />`);
            });
            return false;
        }
    });
}

export {clientOrder};