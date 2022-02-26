import {Sounds, sound} from "./components/audio.js";
import {openingHTML, openingAJAX, openingAnimationDoors} from "./components/opening.js";
import {printTimer, setTimer, clearOneTimer} from "./components/timer.js";
import {dishMadeMold, pointing, clearKitchen, showRanking} from "./components/score.js";

const apiUrl = 'http://localhost:4444';
const zeroFill = n => {
    return (n < 10) ? ('000' + n) :
        (n < 100) ? ('00' + n) :
            (n < 1000) ? ('0' + n) :
                n;
}

let dishMade = dishMadeMold; // Não existe função de limpar o pedido feito?

$(document).ready(function () {
    let $name;
    let idOrder = 0;
    // Opening
    // openingHTML();
    // sound.playMusic("sakuya");
    $('#btn').click(function () {
        $name = $("#inputName").val();
        openingAJAX();
    });

    $("#game").tabs();


    let $ingredients = $("#ingredients"),
        // $orderList = $("#order-list"),
        $plate = $("#droppable"),
        $broth = $("#broth"),
        $pot = $("#pot"),
        $noddle = $("#noddle1"),
        $stove = $(".stove"),
        $ready = $("#ready"),
        $orders = $("#orders"),
        $crrOrder = $("#order-drop");

    // Aba de pedidos
    $("#make-order").click(function () {
        $('#game').tabs({
            active: 0
        });
        if ($("#orders > div").length < 6) {
            $(this).prop("disabled", true);
            $.ajax({
                method: "GET",
                url: apiUrl + "/order"
            })
                .done(function (response) {
                    console.log(response); // Montagem div com pedido
                    let div = $(`<div id=${JSON.stringify(response)} class="order"></div>`);
                    div.load("./images/Pedido/pedido.svg");
                    let ingredients = Object.entries(response.ingredients);
                    console.log(ingredients);
                    setTimeout(() => {
                        $("#orders").append(div);
                        let lastOrder = $("#orders div").length;
                        console.log(lastOrder);
                        if ($("#order-drop")[0].innerHTML !== "") {
                            idOrder = 1;
                        } else {
                            idOrder = 0;
                        }
                        for (let i = 0; i < 4; i++) {
                            $("#orders div").eq(lastOrder - 1).find("#ingredient" + (i + 1)).attr("href", `./images/foods/${ingredients[i][0]}.png`);
                            $("#orders div").eq(lastOrder - 1).find("#num" + (i + 1)).text(`${ingredients[i][1]}`);
                        }
                        $("#orders div").eq(lastOrder - 1).find("#broth").attr("href", `./images/broth/${response.broth}broth.png`);
                        $("#orders div").eq(lastOrder - 1).find("#cook").attr("href", `./images/foods/noddle2.png`);
                        $("#orders div").eq(lastOrder - 1).find("#cookTime").text(`${response.cookingTime}`);
                        $("#orders div").eq(lastOrder - 1).find("#orderNum").text(zeroFill(lastOrder + idOrder));
                        $(".order").draggable({ // Garante que seja arrastável
                            cursor: "grabbing",
                            revert: "invalid",
                            revert: true,
                        });
                        $("#make-order").prop("disabled", false);
                    }, 500);
                });
        }
    });

    $crrOrder.droppable({
        accept: ".order",
        drop: function (event, ui) {
            if ($("#order-drop")[0].innerHTML == '') {
                $(ui.draggable).appendTo($crrOrder)
                    .position({
                        of: this,
                        my: "center center",
                        at: "center center"
                    });
            }
        }
    });


    $orders.droppable({
        accept: "#order-drop > div",
        drop: function (event, ui) {
            let of, my, at;
            if ($("#orders")[0].innerHTML == '') {
                of = $("#orders")
                my = "left center";
                at = "left center";
            } else {
                of = $("#orders")[0].lastElementChild;
                my = "left center";
                at = "right center";
            }
            $(ui.draggable).appendTo($orders)
                .position({
                    of: of,
                    my: my,
                    at: at
                });
        }
    })

    //Aba de cozimento
    $noddle.draggable({ // Retirar macarrão da caixa
        cursor: "grabbing",
        cancel: "a.ui-icon",
        revert: true,
        containment: "#table2",
        helper: function (event) { // Muda a saída para macarrão do invés da caixa
            return $(`<div>
                        <img class="foods" src="./images/foods/${event.target.id}.png">
                    </div>`);
        }
    });

    $stove.droppable({
        accept: "#noddle1",
        drop: function (event, ui) {
            if ($(this)[0].innerHTML == "") { // Se vazio pode adicionar macarrão para cozimento
                $(this).append($(ui.helper).clone());

                let reference = $(this);
                let referenceValue = reference[0].getAttribute("value");
                dishMade.cookingTime = setTimer(referenceValue);

                $(this).css({
                    "display": "flex",
                    "align-itens": "center",
                    "justify-content": "center"
                })
                setTimeout(function () { // 10 segundos para cozimento
                    event.target.innerHTML = "";
                    event.target.innerHTML = `<img src="./images/foods/noddle2.png" ></img>`;
                    $(".stove img").addClass("itemNoddle");
                    $(".itemNoddle").removeClass("ui-draggable")
                        .draggable({ // Garante que seja arrastável
                            cursor: "grabbing",
                            containment: '#table2',
                            revert: "invalid",
                            start: function (event, ui) { // Stop the stove timer
                                let pai = this.parentNode.getAttribute("value");
                                clearOneTimer(Number(pai));
                            }
                        });
                }, 10000);
            }
        }
    });

    $ready.droppable({ // Quando cozido o macarrão pode ser colocado aqui
        accept: ".itemNoddle",
        revert: "invalid",
        drop: function (event, ui) {
            $(ui.draggable).appendTo($(this));
            $(ui.draggable).position({
                of: this,
                collision: "fit"
            });
        }
    });

    $("#pan-to-noodles-and-broth").click(function () { // Transfere macarão cozido para tela com molho
        console.log($("#ready")[0].children[0].src);
        $pot.css("background-image", `url(${$("#ready")[0].children[0].src})`);
        $ready[0].innerHTML = "";
        $('#game').tabs({
            active: 2
        });
    });

    //Aba de molho
    $("li", $broth).draggable({ // Garante que seja arrastável cada ítem dentro da lista
        cursor: "grabbing",
        cancel: "a.ui-icon",
        revert: true,
        containment: "#table3"
    });

    $pot.droppable({ // Muda cor do fundo para a id setada "id=color"
        accept: "#broth > li",
        drop: function (event, ui) {
            console.log(ui.draggable[0].id);
            $(this).css("background-color", ui.draggable[0].id);
        }
    });

    $("#pan-to-ingredients").click(function () { // Transfere macarão com molho para tela com ingredientes
        $plate.css("background-color", $pot.css("background-color"));
        $plate.css("background-image", $("#pot").css("background-image"));
        $pot[0].innerHTML = "";
        $pot.css("background-color", "#add8e6");
        $('#game').tabs({
            active: 3
        });
    });

    //Aba de ingredientes
    $("li", $ingredients).draggable({ // Garante que seja arrastável cada ítem dentro da lista
        cursor: "grabbing",
        cancel: "a.ui-icon",
        revert: "invalid",
        containment: "#table4",
        helper: function (event) { // Muda saída para o ingrediente ao invés do pote  
            let deg = Math.floor(Math.random() * (360));
            return $(`<div  id="${event.target.id}">
                        <img class="foods" style="transform: rotate(${deg}deg)" src="./images/foods/${event.target.id}.png">
                    </div>`);
        }
    });

    $ingredients.droppable({ // Ingredientes podem ser devolvidos
        accept: ".itemIngredients",
        revert: "invalid",
        drop: function (event, ui) {
            console.log("Foi");
            $(ui.helper).remove();
        }
    });

    $plate.droppable({ // Cria um clone dos ingredientes arrastados até a caixa
        accept: "#ingredients > li",
        drop: function (event, ui) {
            $(this).append($(ui.helper).clone());
            $("#droppable div").addClass("itemIngredients");
            $(".itemIngredients").removeClass("ui-draggable")
                .draggable({ // Garante que seja arrastável
                    cursor: "grabbing",
                    containment: '#table4',
                    stop: function (event, ui) {
                        console.log("Foi nesse");
                        let plateOffset = $("#droppable").offset();
                        let $this = $(this).offset();
                        console.log(plateOffset, $this);
                        if ($this.left < (0.95 * plateOffset.left)) {
                            $(this).remove();
                        } else if ($this.left > (0.95 * (plateOffset.left + $("#droppable").outerWidth()))) {
                            $(this).remove();
                        } else if ($this.top < (0.92 * plateOffset.top)) {
                            $(this).remove();
                        } else if ($this.top > (0.90 * (plateOffset.top + $("#droppable").outerHeight()))) {
                            $(this).remove();
                        }
                    }
                });
        }
    });

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
        $.ajax({ // Update the score
            type: "GET",
            url: `${apiUrl}/score?${$name}=${totalScore}`, // ARRUMAR ROTA
            success: function (response) {
                console.log(response);
            },
            error: function (error) {
                console.log(error);
            }
        });

        $(".popup-overlay-ranking, .popup-content-ranking").addClass("active"); // Open the ranking modal
        $.ajax({
            type: "GET",
            url: `${apiUrl}/ranking`,
            success: function (response) {
                showRanking(response);
            },
            error: function (error) {
                console.log(error);
            }
        })

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