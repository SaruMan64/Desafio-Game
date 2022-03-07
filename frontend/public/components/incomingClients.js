import { getOrder } from "./requests.js";
import { makeOrder } from "./makeOrder.js";

function clientOrder() {
    let whatClientIsComming = Math.floor(Math.random() * 6) + 1;
    $("#all-clients > div").each(function (i, item) {
        let act = item.children;
        let hold = act[act.length - 1].src.split("/");
        if (hold[hold.length - 1] == "seat.png") {
            item.innerHTML = "";
            let div = $(
                `<img src='../images/Pedido/client-${whatClientIsComming}-seat.png' />`
            );
            item.append(div[0]);
            setTimeout(() => {
                // div = $(`<div class='take-my-order'>
                //             <img src='../images/Pedido/pedido.png' />
                //             <div class="accept-decline">
                //                 <div class="accept"></div>
                //                 <div class="decline"></div>
                //             </div
                //         </div>`);
                div = $(`<div class="popup-overlay-order">
                            <div class="popup-content-order">
                                <img src='../images/Pedido/pedido.png' style="margin: 3%" width="90%"/>
                                <div class="btn-modal">
                                    <button class="accept-order" style="background-color: green">Aceitar</button>
                                    <button class="reject-order" style="background-color: red">Rejeitar</button>
                                </div>
                            </div>
                        </div>`);
            item.prepend(div[0]);
            $(".popup-overlay-order, .popup-content-order").addClass("active");
            $(".accept-order").click(function () {
                $(".popup-overlay-order, .popup-content-order").removeClass("active");
                console.log("OI!");
                makeOrder();
                // getOrder();
            });
            /* $(".decline").click(function () {
                item.innerHTML = "";
                div = $(`<img src="../images/Pedido/seat.png" />`);
                item.append(div[0]);
            }); */
            $(".reject-order").each(function(){
                $(this).click(function(){
                    $(".popup-overlay-order, .popup-content-order").removeClass("active");
                    div = $(`<img src="../images/Pedido/seat.png" />`);
                    $(this).parent().parent().parent()[0].innerHTML = "";
                    $(this).parent().parent().parent()[0].append(div[0]);
                });
            });
            }, 500);
            return false;
        }
    });
}

export { clientOrder };
