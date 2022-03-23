import { sound } from "./components/audio.js";
import { openingHTML, openingAJAX } from "./components/opening.js";
import { dishMadeMold, pointing, clearKitchen } from "./components/score.js";
import { getOrder, updateScore, updateRanking } from "./components/requests.js";
import { $plate, $pot, $ready } from "./components/dragNDrop.js";
import { clientOrder, newClient, services } from "./components/incomingClients.js";
import { aleatoryChance } from "./components/aleatoryEvents.js";
import { showConfigurationModal } from "./components/configurationModal.js";

let dishMade = dishMadeMold; // Não existe função de limpar o pedido feito?
let score;

$(document).ready(function () {
    let $name;
    // Opening
    // openingHTML();
    // $('#btn').click(function () {
    // sound.playMusic("sakuya");
    //     $name = $("#inputName").val();
    //     openingAJAX();
    // });

    $("#game").tabs();

    // background kitchen
    $("#btn-tabs > li > a").click(() => {
        if ($("#btn-select-order").parent("li").attr("aria-expanded") === "true") {
            $("#game").css("background", "var(--order)");
        } else {
            $("#game").css("background", "var(--no-order)");
        }
    })

    newClient(0);

    // Aba de pedidos

    $("#make-order").click(function () {
        $("#game").tabs({
            active: 0,
        });
        if ($("#orders > div").length < 6) {
            // $(this).prop("disabled", true);
            // getOrder(); // Montagem div com pedido
            clientOrder();
        }
    });

    // Aba cozimento

    $("#pan-to-noodles-and-broth").click(function () { // Transfere macarão cozido para tela com molho
        // $("#outer-pot").css("background", "var(--broth-noddle)");
        $("#outer-pot").css("background-image", "url(./images/others/bowl.png)");
        try {
            $("#pot").css("background", `url(${$("#ready")[0].children[0].children[0].src}) no-repeat center`);
        } catch (e) {
            console.log("vazio");
        }
        $("#pot").css("background-size", "80%");
        $("#ready").droppable("enable");
        $("#ready")[0].innerHTML = "";
        $('#game').tabs({
            active: 2
        });
    });

    // Aba molho

    $("#pan-to-ingredients").click(function () { // Transfere macarão com molho para tela com ingredientes
        $("#box").css("background", $("#outer-pot").css("background"));
        $("#droppable").css("background", `${$("#pot").css("background-image")} no-repeat center`);
        $("#droppable").css("background-size", "80%");
        $("#outer-pot").css("background-image", "url(./images/others/bowl.png");
        $("#pot").css("background", "");
        $('#game').tabs({
            active: 3
        });
    });

    // Aba ingredientes 

    $("#end-order").click(function () { // End the order, calculate score and open the scoring modal
        console.log(services[0]);
        console.log(services[1]);
        console.log(services[2]);
        console.log(services[3]);
        console.log(services[4]);
        console.log(services[5]);

        if (!$("#box").css("background-image").includes("noddle") && !$("#droppable").css("background-image").includes("noddle")) { // If there is no pasta on the plate
            alert("A entrega não pôde ser concluída. Adicione o macarrão.");
            $('#game').tabs({ active: 1 });
        } else if (!$("#box").css("background-image").includes("broth")) { // If there is no broth on the plate
            alert("A entrega não pôde ser concluída. Adicione o caldo.");
            $('#game').tabs({ active: 2 });
        } else if ($("#droppable div").length < 5) { // If there are not enough ingredients
            alert(`A entrega não pôde ser concluída. Adicione pelo menos ${5 - $("#droppable div").length} ingredientes`);
        } else if ($("#order-completed").html() === "") { // If an order was not selected
            alert("A entrega não pôde ser concluída. Especifique o pedido.");
            if ($("#order-drop").html() === "") {
                $('#game').tabs({ active: 0 });
            }
        } else { // If everything is ok with the previous steps

            let holder = JSON.parse($("#order-completed")[0].children[0].id || "{}");
            dishMade.broth = $("#box").css("background-image");
            let { cookingScore, brothScore, ingredientsScore, orderScore, totalScore } = pointing(holder, dishMade);
            score = totalScore;

            const orderNumber = Number($("#order-completed").find("#orderNum").html());
            $("#all-clients > div").each(function (i, item) { // Fill the scoring modal and removes the client from the seat
                try {
                    if (Number(item.children[0].id) === orderNumber) {
                        console.log(Number(item.children[0].id), orderNumber);
                        const clientNumber = (item.children[0].getAttribute("src")).split("-")[1];
                        $("#person-modal").html("");
                        $("#person-modal").append(`<img src="./images/order/client-${clientNumber}-front.png" />`);
                        $("#cooking-score").html(`Cozimento: ${cookingScore} pontos`);
                        $("#broth-score").html(`Caldo: ${brothScore} pontos`);
                        $("#ingredients-score").html(`Ingredientes: ${ingredientsScore} pontos`);
                        $("#order-score").html(`Pontuação do pedido: ${orderScore} pontos`);
                        $("#total-score").html(`Pontuação total: ${totalScore} pontos`);
                        console.log(item.children[0]);
                        item.children[0].remove();

                        $(".seat-top-view").each(function (index) {
                            let img = $(this).children()[5 - i]
                            console.log(img);
                            $(img).attr("src", "../images/others/seat-top-view.svg");
                        });

                        let div = $(`<img src="../images/order/seat.png" />`);
                        item.append(div[0]);
                    }
                } catch (e) {
                    console.log("Existe não");
                }
            });


            $(".popup-overlay, .popup-content").addClass("active"); // Open the scoring modal
            clearKitchen();
        }
    });

    $("#next-order").on("click", function () { // Close the scoring modal and continue to the next order
        $(".popup-overlay, .popup-content").removeClass("active");
        $('#game').tabs({
            active: 0
        });
    });

    $("#end-game").on("click", function () { // Close the scoring modal and open ranking modal
        $(".popup-overlay, .popup-content").removeClass("active");
        updateScore();

        $(".popup-overlay-ranking, .popup-content-ranking").addClass("active"); // Open the ranking modal
        updateRanking();

        $("#play-again").on("click", function () { // Close the ranking modal               // PRECISA LIMPAR OS ASSENTOS E LEVAR PARA A OPENING
            $(".popup-overlay-ranking, .popup-content-ranking").removeClass("active");
            $('#game').tabs({
                active: 0
            });
        });
    });

    $("#btn-tabs li").click(function () {
        sound.playMusic("change");
    });

    $("#configuration").click(function () {
        showConfigurationModal();
    });

    $(document).on("click", function () {
        console.log("arainha");
        aleatoryChance(5);
    });

});

export { dishMade };