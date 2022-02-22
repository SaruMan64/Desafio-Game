$(document).ready(function () {
    const apiUrl = 'http://localhost:4444';
    $("#game").tabs();

    let $ingredients = $("#ingredients"),
        $plate = $("#droppable"),
        $broth = $("#broth"),
        $pot = $("#pot"),
        $noddle = $("#noddle1"),
        $stove = $(".stove"),
        $ready = $("#ready"),
        $orders = $("#orders"),
        $crrOrder = $("#curent-order");

    let dishMade = {
        id: 0,
        broth: "",
        cookingTime: 0,
        quantIngredients: 0,
        ingredients: {
            "carrot": 0,
            "chashu": 0,
            "chicken": 0,
            "egg": 0,
            "mnema": 0,
            "moyashi": 0,
            "naruto": 0,
            "nori": 0,
            "porkrib": 0,
            "radish": 0,
            "shitake": 0,
            "tofu": 0
        }
    }

    // Aba de pedidos
    $("#pedido-holder").click(function () {
        $.ajax({
                method: "GET",
                url: apiUrl + "/order"
            })
            .done(function (response) {
                console.log(response); // Montagem div com pedido
                let div = `<div id=${JSON.stringify(response)} class="order" style="margin: 10px">
                                <div id="res-broth">Caldo: ${response.broth}</div>
                                <div id="res-cooking-time">Tempo de cozimento: ${response.cookingTime}</div>
                                <div id="res-ingredients">Ingredientes: ${
                                    Object.keys(response.ingredients)
                                    .reduce((acc, item) => {
                                        return acc += `<div>
                                            <img src="./images/${item}.png" style="width: 100px; height: 100px;"></img>
                                            : ${response.ingredients[item]}
                                        </div>`
                                    }, "")
                                }</div>
                            </div>`;
                $orders.append(div); //Adiciona novo pedido a lista
                $(".order").draggable({ // Garante que seja arrastável
                    cursor: "grabbing",
                    revert: true
                });
            });
    });

    $orders.droppable({ //Possibilidade de retono de pedido a div de todos os pedidos
        accept: ".order",
        drop: function (event, ui) {
            $(ui.draggable).appendTo($(this));
            $(ui.draggable).position({
                of: this,
                collision: "fit"
            });
        }
    })

    $crrOrder.droppable({ // Drop para visualização pedido atual
        accept: ".order",
        revert: "invalid",
        drop: function (event, ui) {
            if ($(this)[0].innerHTML == "") { // Se pedido atual vazio apenas adiciona
                $(ui.draggable).appendTo($(this));
                $(ui.draggable).position({
                    of: this,
                    collision: "fit"
                });
            } else { // Se possuir pedido o retorna a lista e adiciona o novo que foi arrastado
                if (ui.draggable[0].id == $("#curent-order")[0].children[0].id) { // Se for o mesmo elemento não o modifica
                    console.log("iguais");
                } else {
                    let holder = $(this)[0].innerHTML;
                    $(this)[0].innerHTML = "";
                    $orders.append(holder);
                    $(ui.draggable).appendTo($(this));
                    $(ui.draggable).position({
                        of: this,
                        collision: "fit"
                    });
                    $(".order").draggable({
                        cursor: "grabbing",
                        revert: true
                    });
                }
            }
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
                        <img class="foods" src="./images/${event.target.id}.png">
                    </div>`);
        }
    });

    $stove.droppable({ // DIMINUÍ O TEMPO PARA TESTAR MAIS RÁPIDO
        accept: "#noddle1",
        drop: function (event, ui) {
            if ($(this)[0].innerHTML == "") { // Se vazio pode adicionar macarrão para cozimento
                $(this).append($(ui.draggable).clone());
                setTimeout(function () { // 10 segundos para cozimento
                    event.target.innerHTML = "";
                    event.target.innerHTML = `<img style="width: 100px; height: 100px;" src="./images/noddle2.png" ></img>`;
                    $(".stove img").addClass("item");
                    $(".item").removeClass("ui-draggable")
                        .draggable({ // Garante que seja arrastável
                            cursor: "grabbing",
                            containment: '#table2',
                            revert: "invalid"
                        });
                }, 100);
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
        let holder = $ready[0].innerHTML;
        $ready[0].innerHTML = "";
        $pot[0].innerHTML = holder;
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
        drop: function (event, ui) {
            console.log(ui.draggable[0].id);
            $(this).css("background-color", ui.draggable[0].id);
        }
    });

    $("#pan-to-ingredients").click(function () { // Transfere macarão com molho para tela com ingredientes
        $plate.css("background-color", $pot.css("background-color"));
        $plate.css("background-image", `url(${$("#pot")[0].children[0].src})`);
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
                        <img class="foods" style="transform: rotate(${deg}deg)" src="./images/${event.target.id}.png">
                    </div>`);
        }
    });

    $ingredients.droppable({ // Ingredientes podem ser devolvidos
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
                    containment: '#table4'
                });
        }
    });

    $("#end-order").click(function () { // Confere se os ingredientes estão de acordo com o pedido
        let holder = JSON.parse($("#curent-order")[0].children[0].id || "{}");
        let ing = holder.ingredients;
        console.log(Object.entries(ing));
        Object.entries(ing)
            .forEach((item) => {
                let quant = 0;
                for (let i = 0; i < $("#droppable div").length; i++) {
                    if (item[0] == $("#droppable div")[i].id) {
                        quant++;
                    }
                }
                if (quant != item[1]) {
                    //points--; potuação a definir;
                    console.log(item[0], "está incorreto");
                } else {
                    console.log(item[0], "está correto");
                }
            });
        dishMade.broth = $plate.css("background-color");
        pointing(holder, dishMade);
    });

});

function pointing(dishOrdered, dishMade) {
    let pointing = 0;
    const ingredientsDishMade = $("#droppable div");

    for(let i = 0; i < ingredientsDishMade.length; i++) {
        switch(ingredientsDishMade[i].id) {
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
                console.log(`Erro: não encontramos ${ingredientsDishMade[i].id}`);
        }
    }

    $("body").append(`<ul id="pointing">
        <li>Pontuação: ${pointing}</li>
        <li>Prato Pedido: ${JSON.stringify(dishOrdered)}</li>
        <li>Prato Feito${JSON.stringify(dishMade)}}</li>
    </ul>`)
}