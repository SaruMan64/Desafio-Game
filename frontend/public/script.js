$(function () {
    $("#game").tabs().addClass( "ui-tabs-vertical ui-helper-clearfix" );
    $( "#game>li" ).removeClass( "ui-corner-top" ).addClass( "ui-corner-right" );
    $("#game").on("click", "li", function(){
        $(this).css("background-color", "light-blue");
    });
    let $ingredients = $("#ingredients"),
        $plate = $("#droppable");

    $("li", $ingredients).draggable({
        cancel: "a.ui-icon",
        revert: "invalid",
        containment: "document",
        helper: function (event) {
            let deg = Math.floor(Math.random() * (360));
            return $(`<div><img class="foods" style="transform: rotate(${deg}deg)" src="./images/${event.target.id}.png"></div>`);
        },
    })

    $plate.droppable({
        accept: "#ingredients > li",
        drop: function (event, ui) {
            $(this).append($(ui.helper).clone());
            $("#droppable div").addClass("item");
            $(".item").removeClass("ui-draggable product");
            $(".item").draggable({
                containment: 'parent'
            });
        }
    })
});