import { getOrder } from "./requests.js";

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
                div = $(`<div class='take-my-order'>
                            <img src='../images/Pedido/pedido.png' />
                            <div class="accept-decline">
                                <div class="accept"></div>
                                <div class="decline"></div>
                            </div
                        </div>`);
            item.prepend(div[0]);
            $(".accept").click(function () {
                console.log("OI!");
                getOrder();
            });
            $(".decline").click(function () {
                /* item.innerHTML = "";
                div = $(`<img src="../images/Pedido/seat.png" />`);
                item.append(div[0]); */
            });
            }, 500);
            return false;
        }
    });
}

export { clientOrder };
