class Sounds {

    constructor() {
        this.soundsObj = {
            "openingDoor": {
                "flag": false,
                "isMuted": false,
                "isInLoop": false,
                "file": new Audio("./sounds/Sound-Button-Effect-Sliding.wav")
            },
            "sakuya": {
                "flag": false,
                "isMuted": false,
                "isInLoop": false,
                "file": new Audio("./sounds/Sakuya-Background-Sound.wav")
            },
            "change": {
                "flag": false,
                "isMuted": false,
                "isInLoop": false,
                "file": new Audio("./sounds/change.wav")
            }
        }
    }

    playMusic(_sound) {
        if (!this.soundsObj[_sound].flag) {
            this.soundsObj[_sound].flag = true;
            if (!this.soundsObj[_sound].isInLoop) {
                setTimeout(() => {
                    this.soundsObj[_sound].flag = false;
                }, parseInt((this.soundsObj[_sound].file.duration - this.soundsObj[_sound].file.currentTime) * 1000))
            }
            this.soundsObj[_sound].file.play();
            //console.log(this.soundsObj[_sound].file.currentTime);
        }
    }
    pausedMusic(_sound) {
        if (this.soundsObj[_sound].flag) {
            //console.log("pausa");
            this.soundsObj[_sound].file.pause();
            this.soundsObj[_sound].flag = false;
            // console.log(this.soundsObj[_sound].file.currentTime);
        }
    }
    mutedAll() {
        Object.keys(this.soundsObj).forEach(el => {
            if (this.soundsObj[el].flag) {
                if (this.soundsObj[el].isMuted) {
                    this.soundsObj[el].file.muted = false;
                    this.soundsObj[el].isMuted = false;
                    //console.log(this.soundsObj[el].file.currentTime);
                } else if (!this.soundsObj[el].isMuted) {
                    this.soundsObj[el].file.muted = true;
                    this.soundsObj[el].isMuted = true;
                    //console.log(this.soundsObj[el].file.currentTime);
                }
            }
        });
    }
    loopMusic(_sound) {
        if (this.soundsObj[_sound].isInLoop) {
            this.soundsObj[_sound].file.loop = false;
            this.soundsObj[_sound].isInLoop = false;
            //console.log(this.soundsObj[_sound].isInLoop, this.soundsObj[_sound].file.loop);
        } else if (!this.soundsObj[_sound].isInLoop) {
            this.soundsObj[_sound].file.loop = true;
            this.soundsObj[_sound].isInLoop = true;
            //console.log(this.soundsObj[_sound].isInLoop, this.soundsObj[_sound].file.loop);
        }
    }

}

$(document).ready(function () {
    let idOrder = 0;
    let sound = new Sounds();
    //sound.playMusic("sakuya");
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
                        lastOrder = $("#orders div").length;
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
                        $("#orders div").eq(lastOrder - 1).find("#orderNum").text(zeroFill(lastOrder + idOrder));
                        $(".order").draggable({ // Garante que seja arrastável
                            cursor: "grabbing",
                            revert: "invalid",
                        });
                        $("#pedido-holder").prop("disabled", false);
                    }, 500);
                });
        }
    });

    $crrOrder.droppable({
        accept: ".order",
        drop: function (event, ui) {
            $(ui.draggable).appendTo($crrOrder)
            .position({
                of: this,
                my: "center center",
                at: "center center"
            });
        }
    });
    

    $orders.droppable({
        accept: "#order-drop > div",
        drop: function (event, ui) {
            let of, my, at;
            if($("#orders")[0].innerHTML == ''){
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

    
    function printTimer(stove, timer, cod) {
        if (timer >= 12) {
            clearInterval(cod);
            console.log("Time finished");
        }
        let string = timer.toString();
        if (timer >= 10) {
            string = `${timer}`;
        } else {
            string = `0${timer}`;
        }
        splittedString = string.split("");
        let i = 0;
        $(stove).children().each(function () {
            $(this).text(splittedString[i]);
            i++;
        });
    }

    let cod;

    function startTimer(stove, timer) {
        const interval = 1000;
        printTimer(stove, "00", cod);
        cod = setInterval(() => {
            timer++;
            // dishMade.cookingTime = timer;
            printTimer(stove, timer, cod);
            dishMade.cookingTime = timer;
            return timer;
        }, interval);
    }

    $stove.droppable({ // DIMINUÍ O TEMPO PARA TESTAR MAIS RÁPIDO
        accept: "#noddle1",
        drop: function (event, ui) {
            
            if ($(this)[0].innerHTML == "") { // Se vazio pode adicionar macarrão para cozimento
                $(this).append($(ui.draggable).clone());
                
                let initialTimer = 0;
                let reference = $(this).next();
                startTimer(reference, initialTimer);
                
                $(this).css({
                    "display": "flex",
                    "align-itens": "center",
                    "justify-content": "center"
                })
                setTimeout(function () { // 10 segundos para cozimento
                    event.target.innerHTML = "";
                    event.target.innerHTML = `<img style="width: 100px; height: 100px;" src="./images/foods/noddle2.png" ></img>`;
                    $(".stove img").addClass("itemNoddle");
                    $(".itemNoddle").removeClass("ui-draggable")
                        .draggable({ // Garante que seja arrastável
                            cursor: "grabbing",
                            containment: '#table2',
                            revert: "invalid",
                            start: function(event, ui) {
                                clearInterval(cod);
                            }
                        });
                }, 500);
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

        $(".popup-overlay, .popup-content").addClass("active"); // Open the scoring modal
        $("#cooking-score").html(`Cozimento: ${cookingScore} pontos`);
        $("#broth-score").html(`Caldo: ${brothScore} pontos`);
        $("#ingredientes-score").html(`Ingredientes: ${ingredientsScore} pontos`);
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
            }, 10)
        })
    });

    $("#next-order, .popup-overlay").on("click", function () { // Close the scoring modal and continue to the next order
        $(".popup-overlay, .popup-content").removeClass("active");
        clearKitchen();
        $('#game').tabs({
            active: 0
        });
    });

    $("#end-game, .popup-overlay").on("click", function () { // Close the scoring modal and open ranking modal
        $(".popup-overlay, .popup-content").removeClass("active");
        $.ajax({ // Update the score
            type: "GET",
            url: `http://localhost:4444/score?Rick=${totalScore}`, // ARRUMAR ROTA
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
            url: `http://localhost:4444/ranking`,
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
<<<<<<< HEAD
=======
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

    let orderTime = dishOrdered.cookingTime;
    let elapsedTime = dishMade.cookingTime;
    let x;
    let y;
    let z;
    console.log(orderTime);
    console.log(elapsedTime);
    if (elapsedTime < orderTime) {
        y = elapsedTime * 100;
        x = y / orderTime;
    } else {
        z = elapsedTime * 100;
        y = y / orderTime;
        x = (y - 100) * -1;
    }

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
>>>>>>> 082c4d92cdba13dbcb43741037c9affcad86729b

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
                (dishOrdered.broth === "fish") ? brothScore += 50: brothScore -= 50;
                break;
            case "rgb(255, 255, 0)":
                (dishOrdered.broth === "chicken") ? brothScore += 50: brothScore -= 50;
                break;
            case "rgb(255, 0, 0)":
                (dishOrdered.broth === "meat") ? brothScore += 50: brothScore -= 50;
                break;
            case "rgb(255, 192, 203)":
                (dishOrdered.broth === "pork") ? brothScore += 50: brothScore -= 50;
                break;
            case "rgb(0, 0, 0)":
                (dishOrdered.broth === "shoyu") ? brothScore += 50: brothScore -= 50;
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
        for (let i = 0; i < 4; i++) { // Increases ingredients score
            for (let j = 0; j < 12; j++) {
                if (ingredientsDishOrdered[i][0] === ingredientsDishMade[j][0]) {
                    if (ingredientsDishOrdered[i][1] - ingredientsDishMade[j][1] === 0) {
                        ingredientsScore += 10 * ingredientsDishOrdered[i][1];
                    } else {
                        if (ingredientsDishOrdered[i][1] > ingredientsDishMade[j][1]) {
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

    function showRanking(players) { // Create the ranking in html
        $("#ranking").html("");
        $("#ranking").append(`<table>
        <tr>
            <th>Posição</th>
            <th>Usuário</th>
            <th>Pontuação</th>
        </tr>
    </table>`);
        for (let i = 0; i < 10; i++) {
            $("table").append(`<tr>
            <td>${i+1}</td>
            <td>${players[i].name}</td>
            <td>${players[i].score.final}</td>
        </tr>`);
        }
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
    $("#btn-tabs li").click(function () {
        console.log(this);
        sound.playMusic("change");
    })

});