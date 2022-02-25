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
            if (this.soundsObj[el].isMuted) {
                this.soundsObj[el].file.muted = false;
                this.soundsObj[el].isMuted = false;
                //console.log(this.soundsObj[el].file.currentTime);
            } else if (!this.soundsObj[el].isMuted) {
                this.soundsObj[el].file.muted = true;
                this.soundsObj[el].isMuted = true;
                //console.log(this.soundsObj[el].file.currentTime);
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

    let $name;
    // Opening
    openingHTML();
    $('#btn').click(function () {
        $name = $("#inputName").val();
        openingAJAX()
    });

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

    let cod1;
    let cod2;
    let cod3;
    let cod4;
    let cod5;

    // let timer1;
    // let timer2;
    // let timer3;
    // let timer4;
    // let timer5;

    function printTimer(stove, timer, cod) { // Show the timer on the stove
        let string = timer.toString();

        if (timer >= 10) {
            string = `${timer}`;
        } else {
            string = `0${timer}`;
        }

        if (timer >= 60) {
            string = `--`;
            clearInterval(cod);
        }

        splittedString = string.split("");
        let i = 0;
        $(stove).children().each(function () {
            $(this).text(splittedString[i]);
            i++;
        });
    }

    function setTimer(index) { // Start the stove timer
        let timer = 0;
        const interval = 1000;
        const aux = $(`[value=${index}]`).next();

        switch (Number(index)) {
            case 1:
                cod1 = setInterval(function () {
                    timer++;
                    dishMade.cookingTime = timer;
                    printTimer(aux, timer, cod1);
                }, interval);
                break
            case 2:
                cod2 = setInterval(function () {
                    timer++;
                    dishMade.cookingTime = timer;
                    printTimer(aux, timer, cod2);
                }, interval);
                break
            case 3:
                cod3 = setInterval(function () {
                    timer++;
                    dishMade.cookingTime = timer;
                    printTimer(aux, timer, cod3);
                }, interval);
                break
            case 4:
                cod4 = setInterval(function () {
                    timer++;
                    dishMade.cookingTime = timer;
                    printTimer(aux, timer, cod4);
                }, interval);
                break
            case 5:
                cod5 = setInterval(function () {
                    timer++;
                    dishMade.cookingTime = timer;
                    printTimer(aux, timer, cod5);
                }, interval);
                break
        }
    }

    $stove.droppable({
        accept: "#noddle1",
        drop: function (event, ui) {
            if ($(this)[0].innerHTML == "") { // Se vazio pode adicionar macarrão para cozimento
                $(this).append($(ui.helper).clone());

                let reference = $(this);
                let referenceValue = reference[0].getAttribute("value");
                setTimer(referenceValue);

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
                                switch (Number(pai)) {
                                    case 1:
                                        clearInterval(cod1);
                                        break
                                    case 2:
                                        clearInterval(cod2);
                                        break
                                    case 3:
                                        clearInterval(cod3);
                                        break
                                    case 4:
                                        clearInterval(cod4);
                                        break
                                    case 5:
                                        clearInterval(cod5);
                                        break
                                    default:
                                        console.log("clear default");
                                }
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
        pointing(holder, dishMade);

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

    function pointing(dishOrdered, dishMade) { // Calculate the score
        dishMade.quantIngredients = $("#droppable div").length;
        cookingScore = 0;
        brothScore = 0;
        ingredientsScore = 0;
        orderScore = 0;

        if (dishOrdered.cookingTime === dishMade.cookingTime) { // Calculate cooking score
            cookingScore = 50;
        } else if (Math.abs(dishOrdered.cookingTime - dishMade.cookingTime) <= 2) {
            cookingScore = 50 - (3 * (Math.abs(dishOrdered.cookingTime - dishMade.cookingTime)));
        } else {
            cookingScore = 50 - (5 * (Math.abs(dishOrdered.cookingTime - dishMade.cookingTime)));
        }

        switch (dishMade.broth) { // Calculate broth score
            case "#e5d8ac":
                (dishOrdered.broth === "fish") ? brothScore += 50 : brothScore -= 50;
                break;
            case "#ebcf6c":
                (dishOrdered.broth === "chicken") ? brothScore += 50 : brothScore -= 50;
                break;
            case "#a5361a":
                (dishOrdered.broth === "meat") ? brothScore += 50 : brothScore -= 50;
                break;
            case "#573519":
                (dishOrdered.broth === "pork") ? brothScore += 50 : brothScore -= 50;
                break;
            case "#2f2412":
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
        for (let i = 0; i < 4; i++) { // Calculate ingredients score
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
        $("#pot").css("background-image", "");
    }

    function showRanking(players) { // Create the ranking in html
        console.log(players);
        console.log(JSON.stringify(players));
        $("#ranking").html("");
        $("#ranking").append(`<table>
        <tr>
            <th>Posição</th>
            <th>Usuário</th>
            <th>Pontuação</th>
        </tr>
    </table>`);
        let numberPlayersRanking;
        (players.length <= 10) ? numberPlayersRanking = players.length : numberPlayersRanking = 10;

        for (let i = 0; i < numberPlayersRanking; i++) {
            $("table").append(`<tr>
            <td>${i + 1}</td>
            <td>${players[i].name}</td>
            <td>${players[i].score.final}</td>
        </tr>`);
        }
    }

    $("#btn-tabs li").click(function () {
        sound.playMusic("change");
    });

    $("#mute-all").click(function () {
        $(this).toggleClass("imMuted");
        sound.mutedAll();
    })

});



/* Functions */
//opening
//Prepend HTML in to body
function openingHTML() {
    $("body").prepend(`
      <section id="doors">
        <div id="frontopening">
          <form id="register" onsubmit="return false">
            <input id="inputName" type="text" placeholder="Insira seu nome..." minlength="1" maxlength="15" pattern="^[a-zA-Zà-ýÀ-Ý0-9]{0,15}" required />
          </form>
          <button type="submit" form="register" id="btn">INICIAR</button>
        </div>
        <div id="backDoor">
          <img
            class="door L"
            src="./images/opening/Door.svg"
            alt=""
            srcset="./images/opening/Door.svg"
          />
          <img
            class="door R"
            src="./images/opening/Door.svg"
            alt=""
            srcset="./images/opening/Door.svg"
          />
        </div>
      </section>
    `);
}

//Animation body opening
function openingAnimationDoors() {
    $(this).prop('disabled', true);

    setTimeout(() => {
        $("#frontopening").html("");
        //sound.playMusic('openingDoor')
        let soundOP = new Audio("./sounds/Sound-Button-Effect-Sliding.wav");
        soundOP.play();
        const animationDoor = " 2800ms cubic-bezier(1,0,.5,1)"
        const animationBrownser = ["-webkit-animation", "-moz-animation", "-o-animation", "animation"]
        animationBrownser.forEach(el => {
            $(".L").css(el, "doorL" + animationDoor);
            $(".R").css(el, "doorR" + animationDoor);
            $("#doors").css(el, "zoomFadeOut 3s cubic-bezier(.64,0,.4,.39)");
        });

    }, 500)

    setTimeout(() => {
        $(".L").css("left", "-50%")
        $(".R").css("left", "100%")
        $("#doors").remove();
    }, 2800);
}

//AJAX opening
function openingAJAX() {
    if (document.getElementById("register").checkValidity()) {
        $.ajax({
            type: "GET",
            url: `http://localhost:4444/register?nickname=${$("#inputName").val()}`,
            success: function (response) {
                if (response === true) {
                    //$name = $("#inputName").val();
                    openingAnimationDoors();
                } else {
                    alert(response);
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    }
}