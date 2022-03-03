import {getOrder} from "./requests.js";

function clientOrder(){
    let whatClientIsComming = Math.floor(Math.random() * 6) + 1;
    $("#all-clients > div").each(function(i,item){
        let act = item.children[0].src.split("/");
        if(act[act.length -1] == "banquin.png"){
            item.innerHTML = "";
            let div = $(`<div style="height: 100px; width: 150px;" id='take-my-order'>
                            <img src='../images/Pedido/pedido.png' />
                            <div id="accept-decline">
                                <div id="accept"></div>
                                <div id="decline"></div>
                            </div
                        </div>`);
            item.append(div[0]);
            div = $(`<img src='../images/Pedido/client-${whatClientIsComming}-seat.png' />`);
            item.append(div[0]);
            $("#accept").click(function() {
                getOrder();
            });
            $("#decline").click(function() {
                item.innerHTML = "";
                item.append(`<img src="../images/Pedido/banquin.png" />`);
            });
            return false;
        }
    });
}

export {clientOrder};