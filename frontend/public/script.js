import {sound} from "./components/audio.js";
import {openingHTML, openingAJAX} from "./components/opening.js";
import {dishMadeMold, pointing, clearKitchen} from "./components/score.js";
import {getOrder, updateScore, updateRanking} from "./components/requests.js";
import {$plate, $pot, $ready} from "./components/dragNDrop.js";

let dishMade = dishMadeMold; // Não existe função de limpar o pedido feito?

$(document).ready(function () {
    let $name;
    // Opening
    // openingHTML();
    // sound.playMusic("sakuya");
    $('#btn').click(function () {
        $name = $("#inputName").val();
        openingAJAX();
    });

    $("#game").tabs();
    
    // Aba de pedidos

    $("#make-order").click(function () {
        $("#game").tabs({
          active: 0,
        });
        if ($("#orders > div").length < 7) {
          $(this).prop("disabled", true);
          getOrder(); // Montagem div com pedido
        }
    });

    // Aba cozimento

    $("#pan-to-noodles-and-broth").click(function () { // Transfere macarão cozido para tela com molho
        console.log($("#ready")[0].children[0].src);
        $pot.css("background-image", `url(${$("#ready")[0].children[0].src})`);
        $ready[0].innerHTML = "";
        $('#game').tabs({
            active: 2
        });
    });

    // Aba molho

    $("#pan-to-ingredients").click(function () { // Transfere macarão com molho para tela com ingredientes
        $plate.css("background-color", $pot.css("background-color"));
        $plate.css("background-image", $("#pot").css("background-image"));
        $pot[0].innerHTML = "";
        $pot.css("background-color", "#add8e6");
        $('#game').tabs({
            active: 3
        });
    });

    // Aba ingredientes 

    $("#end-order").click(function () { // End the order, calculate score and open the scoring modal
        let holder = JSON.parse($("#order-drop")[0].children[0].id || "{}");
        dishMade.broth = $plate.css("background-color");
        let {cookingScore, brothScore, ingredientsScore, orderScore, totalScore} = pointing(holder, dishMade);

        $(".popup-overlay, .popup-content").addClass("active"); // Open the scoring modal
        $("#cooking-score").html(`Cozimento: ${cookingScore} pontos`);
        $("#broth-score").html(`Caldo: ${brothScore} pontos`);
        $("#ingredients-score").html(`Ingredientes: ${ingredientsScore} pontos`);
        $("#order-score").html(`Pontuação do pedido: ${orderScore} pontos`);
        $("#total-score").html(`Pontuação total: ${totalScore} pontos`);

        $(document).ready(function () { // Show the person
            $("#person-modal").load("./images/Pedido/person.svg");
            $("#person-modal svg").attr("height", "400px");
            setTimeout(() => {
                if (orderScore > 150) {
                    $("#eyes").attr("href", "./images/Pedido/olho-normal.svg");
                    $("#mouth").attr("href", "./images/Pedido/boca-aberta.svg");
                } else if (orderScore < 50) {
                    $("#eyes").attr("href", "./images/Pedido/olho-bravo.svg");
                    $("#mouth").attr("href", "./images/Pedido/boca-brava.svg");
                } else {
                    $("#eyes").attr("href", "./images/Pedido/olho-normal.svg");
                    $("#mouth").attr("href", "./images/Pedido/boca-normal.svg");
                }
            }, 500)
        })
    });

    $("#next-order").on("click", function () { // Close the scoring modal and continue to the next order
        $(".popup-overlay, .popup-content").removeClass("active");
        clearKitchen();
        $('#game').tabs({
            active: 0
        });
    });

    $("#end-game").on("click", function () { // Close the scoring modal and open ranking modal
        $(".popup-overlay, .popup-content").removeClass("active");
        updateScore();

        $(".popup-overlay-ranking, .popup-content-ranking").addClass("active"); // Open the ranking modal
        updateRanking();

        $("#play-again").on("click", function () { // Close the ranking modal
            $(".popup-overlay-ranking, .popup-content-ranking").removeClass("active");
        });
    });

    $("#btn-tabs li").click(function () {
        sound.playMusic("change");
    });

    $("#mute-all").click(function () {
        $(this).toggleClass("imMuted");
        sound.mutedAll();
    })

});

export {dishMade};