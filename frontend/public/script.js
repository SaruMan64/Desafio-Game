$(function () {
    $("#game").tabs();

    let $ingredients = $("#ingredients"),
        $plate = $("#droppable"),
        // $trash = $("#trash"),
        $broth = $("#broth"),
        $pot = $("#pot"),
        $noddle = $("#noddle1");

    $noddle.draggable({
        cursor: "grabbing",
        cancel: "a.ui-icon",
        revert: "valid",
        containment: "#table2",
        helper: function (event) {
            return $(`<div><img class="foods" src="./images/${event.target.id}.png"></div>`);
        }
    });

    $("li", $broth).draggable({
        cursor: "grabbing",
        cancel: "a.ui-icon",
        revert: "valid",
        containment: "#table2"
    });

    $pot.droppable({
        accept: "#broth > li",
        drop: function (event, ui) {
            console.log(ui.helper[0].id);
            $(this).css("background-color", ui.helper[0].id);
        }
    });

    $pot.droppable({
        accept: "#noddle1"
    });

    $("li", $ingredients).draggable({
        cursor: "grabbing",
        cancel: "a.ui-icon",
        revert: "invalid",
        containment: "#table3",
        helper: function (event) {
            let deg = Math.floor(Math.random() * (360));
            return $(`<div><img class="foods" style="transform: rotate(${deg}deg)" src="./images/${event.target.id}.png"></div>`);
        }
    });

    $ingredients.droppable({
        revert: "invalid",
        drop: function (event, ui) {
            $(ui.helper).remove();
        }
    });

    $plate.droppable({
        accept: "#ingredients > li",
        drop: function (event, ui) {
            $(this).append($(ui.helper).clone());
            $("#droppable div").addClass("item");
            $(".item").removeClass("ui-draggable")
                .draggable({
                    containment: '#table3'
                });
        }
    });
});