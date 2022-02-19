$(function () {
    const apiUrl = 'http://localhost:4444';
    $("#game").tabs();

    let $ingredients = $("#ingredients"),
        $plate = $("#droppable"),
        $broth = $("#broth"),
        $pot = $("#pot"),
        $noddle = $("#noddle1");

    $noddle.draggable({
        cursor: "grabbing",
        cancel: "a.ui-icon",
        revert: "invalid",
        containment: "#table2",
        helper: function (event) {
            return $(`<div>
                        <img class="foods" src="./images/${event.target.id}.png">
                    </div>`);
        }
    });

    $("li", $broth).draggable({
        cursor: "grabbing",
        cancel: "a.ui-icon",
        revert: true,
        containment: "#table2"
    });

    $pot.droppable({
        drop: function (event, ui) {
            console.log(ui.draggable[0].id);
            if (ui.draggable[0].id == "noddle1") {
                $(this).append($(ui.helper).clone());
                $("#droppable div").addClass("nod");
                $(".nod").removeClass("ui-draggable")
                    .draggable({
                        containment: '#table2'
                    });
            } else {
                $(this).css("background-color", ui.draggable[0].id);
            }
        }
    });

    $("li", $ingredients).draggable({
        cursor: "grabbing",
        cancel: "a.ui-icon",
        revert: "invalid",
        containment: "#table4",
        helper: function (event) {
            let deg = Math.floor(Math.random() * (360));
            return $(`<div  id="${event.target.id}">
                        <img class="foods" style="transform: rotate(${deg}deg)" src="./images/${event.target.id}.png">
                    </div>`);
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
                    containment: '#table4'
                });
        }
    });

    var ing = 0;

    $("#pedido-holder").click(function () {
        $.ajax({
                method: "GET",
                url: apiUrl + "/order"
            })
            .done(function (response) {
                ing = response.ingredients;
                console.log(response);
                $("#order").html(`
                    <div id="res-broth">Caldo: ${response.broth}</div>
                    <div id="res-cooking-time">Tempo de cozimento: ${response.cookingTime}</div>
                    <div id="res-ingredients">Ingredientes: ${
                        Object.keys(response.ingredients)
                        .reduce((acc, item) => {
                            return acc += `<div><img src="./images/${item}.png" style="width: 100px; height: 100px;"></img>: ${response.ingredients[item]}</div>`
                        }, "")
                    }</div>
                `)
            });
    });

    $("#end-order").click(function (){
        console.log(Object.entries(ing));
        Object.entries(ing)
        .forEach((item) => {
            let quant = 0;
            for(let i = 0; i < $("#droppable div").length; i++){
                if(item[0] == $("#droppable div")[i].id) {
                    quant++;
                }
            }
            if(quant != item[1]){
                //points--; potuação a definir;
                console.log(item[0], "está incorreto");
            } else {
                console.log(item[0], "está correto");
            }
        })
    });

    let $pans = $("#pans");

    $("#pan-to-broth").click(function () {
        let pan = $("#pot");
        let div = $(`<div>
                        <img src="./images/pan2.png" style="width: 100px; height: 100px; background-color: ${pan.css("background-color")}"></img>
                    </div>`);
        if($("#pot div").length > 0) {
            div.append(`<img style="width: 100px; height: 100px; position: absolute; top: 0px; left: 0px;" src="./images/noddle1.png"></img>`);
        }
        div.draggable({
            cursor: "grabbing",
            cancel: "a.ui-icon",
            revert: "valid",
            containment: "#table3"
        });
        $pans.append(div);
        $('#game').tabs({
            active: 2
        });
    });

});