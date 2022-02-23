$(document).ready(function () {
    const apiUrl = 'http://localhost:4444';
    $("#game").tabs();

    const zeroFill = n => {
        return (n < 10) ? ('000' + n) :
            (n < 100) ? ('00' + n) :
            (n < 1000) ? ('0' + n) :
            n;
    }

    let $ingredients = $("#ingredients"),
        $orderList = $("#order-list"),
        $plate = $("#droppable"),
        $broth = $("#broth"),
        $pot = $("#pot"),
        $noddle = $("#noddle1"),
        $stove = $(".stove"),
        $ready = $("#ready"),
        $orders = $("#orders"),
        $crrOrder = $("#order-drop");

    // Aba de pedidos
    $("#pedido-holder").click(function () {
        if ($("#orders div").length <= 3) {
            $(this).prop("disabled", true);
            $.ajax({
                    method: "GET",
                    url: apiUrl + "/order"
                })
                .done(function (response) {
                    console.log(response); // Montagem div com pedido
                    /* let div = `<div id=${JSON.stringify(response)} style="width: 250px; height: 450px;" class="order" style="margin: 10px">
                                    <div id="res-broth">Caldo: ${response.broth}</div>
                                    <div id="res-cooking-time">Tempo de cozimento: ${response.cookingTime}</div>
                                    <div id="res-ingredients">Ingredientes: ${
                                        Object.keys(response.ingredients)
                                        .reduce((acc, item) => {
                                            return acc += `<div>
                                                <img src="./images/foods/${item}.png" style="width: 30%; height: 30%;"></img>
                                                : ${response.ingredients[item]}
                                            </div>`
                                        }, "")
                                    }</div>
                                </div>`;
                    $orders.append(div); */ //Adiciona novo pedido a lista
                    let div = $(`<div style="width: 235px; height: 400px;" id=${JSON.stringify(response)} class="order"></div>`);
                    div.load("./images/Pedido/pedido.svg");
                    let ingredients = Object.entries(response.ingredients)
                    setTimeout(() => {
                        $("#orders").append(div);
                        let lastOrder = $("#orders div").length;
                        // if($("#order-drop")[0].innerHTML != "") { lastOrder++; }
                        for (let i = 0; i < 4; i++) {
                            $("#orders div").eq(lastOrder - 1).find("#ingredient" + (i + 1)).attr("href", `./images/foods/${ingredients[i][0]}.png`);
                            $("#orders div").eq(lastOrder - 1).find("#num" + (i + 1)).text(`${ingredients[i][1]}`);
                        }
                        $("#orders div").eq(lastOrder - 1).find("#broth").attr("href", `./images/broth/${response.broth}broth.png`);
                        $("#orders div").eq(lastOrder - 1).find("#cook").attr("href", `./images/foods/noddle2.png`);
                        $("#orders div").eq(lastOrder - 1).find(".score").text(zeroFill(lastOrder));
                        $(".order").draggable({ // Garante que seja arrastável
                            cursor: "grabbing",
                            revert: "invalid",
                        });
                        $("#pedido-holder").prop("disabled", false);
                    }, 500);
                    /* cursorAt: {
                        top: 50,
                        left: 50
                    }, */
                    /* drag: function (event, ui) {
                        $(this).css({
                            "width": "50px",
                            "height": "80px",
                            "font-size": "0px"
                        }) */
                    // $(".order").toggleClass("small-class");
                    // },
                    /* stop: function (event, ui) {
                        $(this).css({
                            "width": "250px",
                            "height": "450px",
                            "font-size": "16px"
                        });
                    } */
                    // });
                    /* $(".order").css({
                        "width": "250px",
                        "height": "450px"
                    }); */
                });
        }
    });

    /* $($orderList).droppable({
        revert: "invalid",
        drop: function (event, ui) {
            alert("dropado");
            $(ui.draggable).appendTo($(this));
            $(ui.draggable).position({
                of: this,
                my: "left center",
                at: "left center",
                colision: "fit"
            });
        }
    }); */

    $orders.droppable({ //Possibilidade de retono de pedido a div de todos os pedidos
        accept: ".order",
        revert: "invalid",
        drop: function (event, ui) {
            $(ui.draggable).appendTo($(this));
            /* $(".order").css({
                "width": "250px",
                "height": "450px",
                "font-size": "16px"
            }); */
            $(ui.draggable).position({
                of: this,
                /* 
                                my: "left center",
                                at: "left center" */
            });
        }
    });

    $crrOrder.droppable({ // Drop para visualização pedido atual
        accept: ".order",
        revert: "invalid",
        drop: function (event, ui) {
            console.log($(this)[0].innerHTML);
            if ($(this)[0].innerHTML == "") { // Se pedido atual vazio apenas adiciona
                $(ui.draggable).appendTo($(this));
                $(ui.draggable).position({
                    of: this,
                    my: "center top",
                    at: "center top"
                });
            } else { // Se possuir pedido o retorna a lista e adiciona o novo que foi arrastado
                if (ui.draggable[0].id == $("#order-drop")[0].children[0].id) { // Se for o mesmo elemento não o modifica
                    console.log("iguais");
                } else {
                    let holder = $(this)[0].innerHTML;
                    $(this)[0].innerHTML = "";
                    $orders.append(holder);
                    $(ui.draggable).appendTo($(this));
                    $(ui.draggable).position({
                        of: this,
                        my: "center top",
                        at: "center top"
                    });
                    $(".order").draggable({
                        cursor: "grabbing",
                        revert: true
                    });
                }
            }
            /* $(".order").css({
                "width": "250px",
                "height": "500px",
                "font-size": "16px"
            }); */
        }
    });

    //Aba de cozimento
    $noddle.draggable({ // Retirar macarrão da caixa
        cursor: "grabbing",
        cancel: "a.ui-icon",
        revert: "invalid",
        containment: "#table2",
        helper: function (event) { // Muda a saída para macarrão do invés da caixa
            return $(`<div>
                        <img class="foods" src="./images/foods/${event.target.id}.png">
                    </div>`);
        }
    });

    $stove.droppable({ // DIMINUÍ O TEMPO PARA TESTAR MAIS RÁPIDO
        accept: "#noddle1",
        drop: function (event, ui) {
            if ($(this)[0].innerHTML == "") { // Se vazio pode adicionar macarrão para cozimento
                $(this).append($(ui.draggable).clone());
                $(this).css({
                    "display": "flex",
                    "align-itens": "center",
                    "justify-content": "center"
                })
                setTimeout(function () { // 10 segundos para cozimento
                    event.target.innerHTML = "";
                    event.target.innerHTML = `<img style="width: 100px; height: 100px;" src="./images/foods/noddle2.png" ></img>`;
                    $(".stove img").addClass("item");
                    $(".item").removeClass("ui-draggable")
                        .draggable({ // Garante que seja arrastável
                            cursor: "grabbing",
                            containment: '#table2',
                            revert: "invalid"
                        });
                }, 500);
            }
        }
    });

    $ready.droppable({ // Quando cozido o macarrão pode ser colocado aqui
        accept: ".item",
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
        $pot.css("background-image",`url(${$("#ready")[0].children[0].src})`);
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
        accept: ".item",
        revert: "invalid",
        drop: function (event, ui) {
            $(ui.helper).remove();
        }
    });

    $plate.droppable({ // Cria um clone dos ingredientes arrastados até a caixa
        accept: "#ingredients > li",
        drop: function (event, ui) {
            $(this).append($(ui.helper).clone());
            $("#droppable div").addClass("item");
            $(".item").removeClass("ui-draggable")
                .draggable({ // Garante que seja arrastável
                    cursor: "grabbing",
                    containment: '#table4',
                    stop: function (event, ui) {
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

    $("#end-order").click(function () { // Confere se os ingredientes estão de acordo com o pedido
        let holder = JSON.parse($("#order-drop")[0].children[0].id || "{}");
        // let ing = holder.ingredients;
        // console.log(Object.entries(ing));
        // Object.entries(ing)
        //     .forEach((item) => {
        //         let quant = 0;
        //         for (let i = 0; i < $("#droppable div").length; i++) {
        //             if (item[0] == $("#droppable div")[i].id) {
        //                 quant++;
        //             }
        //         }
        //         if (quant != item[1]) {
        //             //points--; potuação a definir;
        //             console.log(item[0], "está incorreto");
        //         } else {
        //             console.log(item[0], "está correto");
        //         }
        //     });
        dishMade.broth = $plate.css("background-color");
        pointing(holder, dishMade);

        $(".popup-overlay, .popup-content").addClass("active");
        $("#cooking-score").html(`Cozimento: ${cookingScore} pontos`);
        $("#broth-score").html(`Caldo: ${brothScore} pontos`);
        $("#ingredientes-score").html(`Ingredientes: ${ingredientsScore} pontos`);
        $("#order-score").html(`Pontuação do pedido: ${orderScore} pontos`);
        $("#total-score").html(`Pontuação total: ${totalScore} pontos`);
        $(document).ready(function () {
            $("#person-modal").load("./images/Pedido/person.svg");
            setTimeout(() => {
                if(orderScore > 150) {
                    $("#eyes").attr("href", "./images/Pedido/olho-normal.svg");
                    $("#mouth").attr("href", "./images/Pedido/boca-aberta.svg");
                } else if(orderScore < 50) {
                    $("#eyes").attr("href", "./images/Pedido/olho-bravo.svg");
                    $("#mouth").attr("href", "./images/Pedido/boca-brava.svg");
                } else {
                    $("#eyes").attr("href", "./images/Pedido/olho-normal.svg");
                    $("#mouth").attr("href", "./images/Pedido/boca-normal.svg");
                }
            }, 10)
        })
    });

    $("#next-order, .popup-overlay").on("click", function () { // Close the modal and continue to the next order
        $(".popup-overlay, .popup-content").removeClass("active");
        clearKitchen();
        $('#game').tabs({
            active: 0
        });
    });
    
    $("#end-game, .popup-overlay").on("click", function () { // Close the modal and end the game
        $(".popup-overlay, .popup-content").removeClass("active");
        $.ajax({
            type: "GET",
            url: `http://localhost:4444/score?Rick=${totalScore}`,  // ARRUMAR ROTA
            success: function (response) {
                console.log(response);
            },
            error: function (error) {
                console.log(error);
            }
        });
    });
});

let dishMade = {
    broth: "",
    cookingTime: 0,
    quantIngredients: 0,
    ingredients: {
        carrot: 0,
        chashu: 0,
        chicken: 0,
        egg: 0,
        mnema: 0,
        moyashi: 0,
        naruto: 0,
        nori: 0,
        porkrib: 0,
        radish: 0,
        shitake: 0,
        tofu: 0
    }
}

let cookingScore = 0;
let brothScore = 0;
let ingredientsScore = 0;
let orderScore = 0;
let totalScore = 0;

function pointing(dishOrdered, dishMade) {
    dishMade.quantIngredients = $("#droppable div").length;
    cookingScore = 0;
    brothScore = 0;
    ingredientsScore = 0;
    orderScore = 0;

    switch (dishMade.broth) { // Increases broth score
        case "rgb(255, 255, 255)":
            (dishOrdered.broth === "fish") ? brothScore += 50 : brothScore -= 50;
            break;
        case "rgb(255, 255, 0)":
            (dishOrdered.broth === "chicken") ? brothScore += 50 : brothScore -= 50;
            break;
        case "rgb(255, 0, 0)":
            (dishOrdered.broth === "meat") ? brothScore += 50 : brothScore -= 50;
            break;
        case "rgb(255, 192, 203)":
            (dishOrdered.broth === "pork") ? brothScore += 50 : brothScore -= 50;
            break;
        case "rgb(0, 0, 0)":
            (dishOrdered.broth === "shoyu") ? brothScore += 50 : brothScore -= 50;
            break;

    }

    for (let i = 0; i < $("#droppable div").length; i++) { // Count ingredients used
        switch ($("#droppable div")[i].id) {
            case "carrot":
                dishMade.ingredients.carrot++;
                break;
            case "chashu":
                dishMade.ingredients.chashu++;
                break;
            case "chicken":
                dishMade.ingredients.chicken++;
                break;
            case "egg":
                dishMade.ingredients.egg++;
                break;
            case "mnema":
                dishMade.ingredients.mnema++;
                break;
            case "moyashi":
                dishMade.ingredients.moyashi++;
                break;
            case "naruto":
                dishMade.ingredients.naruto++;
                break;
            case "nori":
                dishMade.ingredients.nori++;
                break;
            case "porkrib":
                dishMade.ingredients.porkrib++;
                break;
            case "radish":
                dishMade.ingredients.radish++;
                break;
            case "shitake":
                dishMade.ingredients.shitake++;
                break;
            case "tofu":
                dishMade.ingredients.tofu++;
                break;
            default:
                console.log(`Erro: não encontramos o ingrediente.`);
        }
    }

    const ingredientsDishOrdered = Object.entries(dishOrdered.ingredients);
    const ingredientsDishMade = Object.entries(dishMade.ingredients);
    let counterIngredientsDishMade = 0;
    for(let i = 0; i < 4; i++) { // Increases ingredients score
        for(let j = 0; j < 12; j++) {
            if(ingredientsDishOrdered[i][0] === ingredientsDishMade[j][0]) {
                if(ingredientsDishOrdered[i][1] - ingredientsDishMade[j][1] === 0) {
                    ingredientsScore += 10 * ingredientsDishOrdered[i][1];
                } else {
                    if(ingredientsDishOrdered[i][1] > ingredientsDishMade[j][1]) {
                        ingredientsScore -= 10 * Math.abs(ingredientsDishOrdered[i][1] - ingredientsDishMade[j][1]);
                    } else {
                        ingredientsScore += 10 * ingredientsDishOrdered[i][1];
                        ingredientsScore -= 10 * Math.abs(ingredientsDishOrdered[i][1] - ingredientsDishMade[j][1]);
                    }
                }
                counterIngredientsDishMade += ingredientsDishMade[j][1];
            }
        }
    }
    ingredientsScore -= 10 * (dishMade.quantIngredients - counterIngredientsDishMade);
    orderScore = cookingScore + brothScore + ingredientsScore;
    totalScore += orderScore;
}

function clearKitchen() { // Remove the dish made and the current order
    $("#droppable").html("");
    $("#droppable").css("background-color", "");
    $("#droppable").css("background-image", "");
    $("#order-drop").html("");
}

// $("#end-order").on("click", function () {
//     $(".popup-overlay, .popup-content").addClass("active");
//     $("#cooking-score").html(`Cozimento: ${cookingScore} pontos`);
//     $("#broth-score").html(`Caldo: ${brothScore} pontos`);
//     $("#ingredientes-score").html(`Ingredientes: ${ingredientsScore} pontos`);
//     $("#order-score").html(`Pontuação do pedido: ${orderScore} pontos`);
//     $("#total-score").html(`Pontuação total: ${totalScore} pontos`);
// });

// $("#next-order, .popup-overlay").on("click", function () {
//     $(".popup-overlay, .popup-content").removeClass("active");
// });

// $("#end-game, .popup-overlay").on("click", function () {
//     $(".popup-overlay, .popup-content").removeClass("active");
// });

// $("body").append(`<ul id="pointing">
//     <li>Pontuação: ${pointing}</li>
//     <li>Prato Pedido: ${JSON.stringify(dishOrdered)}</li>
//     <li>Prato Feito${JSON.stringify(dishMade)}}</li>
// </ul>`)