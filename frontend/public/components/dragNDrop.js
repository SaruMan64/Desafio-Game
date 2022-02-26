import {setTimer, clearOneTimer} from "./timer.js";
import {dishMade} from "../script.js";

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
});

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

export {$ingredients, $plate, $broth, $pot, $noddle, $stove, $ready, $orders, $crrOrder};