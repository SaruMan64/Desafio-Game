import { setTimer, clearOneTimer } from "./timer.js";
import { dishMade } from "../script.js";

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
        if ($("#order-drop")[0].innerHTML == "") {
            $(ui.draggable).appendTo($crrOrder).position({
                of: this,
                my: "center center",
                at: "center center",
            });
        }
    },
});

$orders.droppable({
    accept: "#order-drop > div",
    drop: function (event, ui) {
        let of, my, at;
        if ($("#orders")[0].innerHTML == "") {
            of = $("#orders");
            my = "left center";
            at = "left center";
        } else {
            of = $("#orders")[0].lastElementChild;
            my = "left center";
            at = "right center";
        }
        $(ui.draggable).appendTo($orders).position({
            of: of,
            my: my,
            at: at,
        });
    },
});

//Aba de cozimento
$noddle.draggable({
    // Retirar macarrão da caixa
    cursor: "grabbing",
    cancel: "a.ui-icon",
    revert: true,
    containment: "#table2",
    helper: function (event) {
        // Muda a saída para macarrão do invés da caixa
        return $(`<div style="width: 80px; height: 120px">
                    <img style="width: 100%; height: 100%" class="foods" src="./images/foods/${event.target.id}.png">
                </div>`);
    },
    start: function (event, ui) {
        $(this).draggable("instance").offset.click = {
            left: Math.floor(ui.helper.width() / 2),
            top: Math.floor(ui.helper.height() / 2),
        };
    },
});

$stove.droppable({
    accept: "#noddle1",
    drop: function (event, ui) {
        if ($(this)[0].innerHTML == "") {
            // Se vazio pode adicionar macarrão para cozimento

            $(this).append(
                $(`<div class="itemNoddle"></div>`)
            );

            $(this).css("background", "var(--pan-noddle-1)")

            let reference = $(this);
            let referenceValue = reference[0].getAttribute("value");
            setTimer(referenceValue);

            setTimeout(function () {
                console.log(reference[0]);
                
                // 10 segundos para cozimento
                $(reference).css("background", "var(--pan-noddle-2)")
                $(".itemNoddle")
                    .removeClass("ui-draggable")
                    .draggable({
                        // Garante que seja arrastável
                        cursor: "grabbing",
                        containment: "#table2",
                        revert: "invalid",
                        start: function (event, ui) {
                            $(this).html(`<img class="foods" src="./images/foods/noddle3.png">`)
                            $(this).parent().css("background", "var(--pan-off)")
                            // Stop the stove timer
                            let father = this.parentNode.getAttribute("value");
                            dishMade.cookingTime = parseInt(
                                clearOneTimer(Number(father))
                            );
                        },
                    });
            }, 1000);
        }
    },
});

$ready.droppable({
    // Quando cozido o macarrão pode ser colocado aqui
    accept: ".itemNoddle",
    revert: "invalid",
    drop: function (event, ui) {
        if ($(this).children().length == 0) {
            $(ui.draggable).appendTo($(this));
            $(ui.draggable).position({
                of: this,
                collision: "fit",
            });
            $(ui.draggable).draggable("disable");
            $(this).droppable("disable");
        }
    },
});

//Aba de molho
$("li", $broth).draggable({
    // Garante que seja arrastável cada ítem dentro da lista
    cursor: "grabbing",
    cancel: "a.ui-icon",
    revert: true,
    containment: "#table3",
});

$pot.droppable({
    // Muda cor do fundo para a id setada "id=color"
    accept: "#broth > li",
    drop: function (event, ui) {
        console.log(ui.draggable[0].id);
        if ($("#pot").css("background") === "var(--broth-noddle)") {
            $("#outer-pot").css("background", `var(--broth-noddle)`);
        } else {
            $("#outer-pot").css("background", `var(--${ui.draggable[0].id})`);
        }
        $("#pot").css("background", "");
    }
});

//Aba de ingredientes
$("li", $ingredients).draggable({ // Garante que seja arrastável cada ítem dentro da lista
    cursor: "grabbing",
    cancel: "a.ui-icon",
    revert: "invalid",
    containment: "#table4",
    /* cursorAt: {
        top: Math.floor($(this).height() / 2),
        left: Math.floor($(this).width() / 2),
    }, */
    helper: function (event) {
        // Muda saída para o ingrediente ao invés do pote
        let deg = Math.floor(Math.random() * 360);
        return $(`<div style="width: 80px; height: 80px;"  id="${event.target.id}">
                    <img class="foods" style="transform: rotate(${deg}deg)" src="./images/foods/${event.target.id}.png">
                </div>`);
    },
    start: function (event, ui) {
        $(this).draggable("instance").offset.click = {
            left: Math.floor(ui.helper.width() / 2),
            top: Math.floor(ui.helper.height() / 2),
        };
    },
});

$ingredients.droppable({
    // Ingredientes podem ser devolvidos
    accept: ".itemIngredients",
    revert: "invalid",
    drop: function (event, ui) {
        console.log("Foi");
        $(ui.helper).remove();
    },
});

$plate.droppable({
    // Cria um clone dos ingredientes arrastados até a caixa
    accept: "#ingredients > li",
    drop: function (event, ui) {
        $(this).append($(ui.helper).clone());
        $("#droppable div").addClass("itemIngredients");
        $(".itemIngredients")
            .removeClass("ui-draggable")
            .draggable({
                // Garante que seja arrastável
                cursor: "grabbing",
                containment: "#table4",
                stop: function (event, ui) {
                    console.log("Foi nesse");
                    let plateOffset = $("#droppable").offset();
                    let $this = $(this).offset();
                    console.log(plateOffset, $this);
                    if ($this.left < 0.95 * plateOffset.left) {
                        $(this).remove();
                    } else if (
                        $this.left >
                        0.95 * (plateOffset.left + $("#droppable").outerWidth())
                    ) {
                        $(this).remove();
                    } else if ($this.top < 0.92 * plateOffset.top) {
                        $(this).remove();
                    } else if (
                        $this.top >
                        0.9 * (plateOffset.top + $("#droppable").outerHeight())
                    ) {
                        $(this).remove();
                    }
                },
            });
    },
});

export {
    $ingredients,
    $plate,
    $broth,
    $pot,
    $noddle,
    $stove,
    $ready,
    $orders,
    $crrOrder,
};
