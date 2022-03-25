import { sound } from "./components/audio.js";
import { openingHTML, openingAJAX } from "./components/opening.js";
import { dishMadeMold, pointing, clearKitchen, acceptancePointing, spidersPointing } from "./components/score.js";
import { getOrder, updateScore, updateRanking } from "./components/requests.js";
import { $plate, $pot, $ready } from "./components/dragNDrop.js";
import { clientOrder, newClient, services, stopTimers } from "./components/incomingClients.js";
import { aleatoryChance } from "./components/aleatoryEvents.js";
import { showConfigurationModal, showEndOrderModal, showEndGameModal } from "./components/configurationModal.js";
import { factory, printGeneralTimer, clearOneTimer } from "./components/timer.js";

let dishMade = dishMadeMold; // Não existe função de limpar o pedido feito?
let auxTotalOrderScore = 0;
let ordersAccepted = 0;
let ordersDeclined = 0;
let spidersCaught = 0;
const apiUrl = "http://localhost:4444";

const zeroFill = (n) => {
    return n < 10 ? "000" + n : n < 100 ? "00" + n : n < 1000 ? "0" + n : n;
};

const generalTime = factory();
generalTime.limit = 90;
let score;

/* function setCorrectingInterval(func, delay) {
    var instance = {};
    let cod;
    function tick(func, delay) {
        if (!instance.started) {
            instance.func = func;
            instance.delay = delay;
            instance.startTime = new Date().valueOf();
            instance.target = delay;
            instance.started = true;

            cod = setTimeout(tick, delay);
        } else {
            let elapsed = new Date().valueOf() - instance.startTime
            let adjust = instance.target - elapsed;

            instance.func();
            instance.target += instance.delay;

            cod = setTimeout(tick, instance.delay + adjust);
        }
    }

    return tick(func, delay);
}; */

function endGame() {
    generalTime.clearCorrectingInterval(generalTime.cod);
    stopTimers();
    showEndGameModal();
    console.log(`Jogo terminou`);
}

$(document).ready(function () {
    $("#game").hide();
    let $name;
    //Opening
    openingHTML();
    $("#btn").click(function () {
        $name = $("#inputName").val();
        const filterName = /[^a-zA-Zà-ýÀ-Ý0-9]/;
        if (!filterName.test($name)) {
            fetch(apiUrl + "/check?name=" + $name)
                .then((response) => response.json())
                .then((res) => {
                    console.log(res);
                    if (!res) {
                        sound.playMusic("sakuya");
                        $("#name-player").html($name);
                        openingAJAX();
                        let startTime = Date.now();
                        generalTime.time = 0;
                        generalTime.cod = generalTime.setCorrectingInterval(
                            function () {
                                generalTime.time =
                                    (Date.now() - startTime) / 1000;
                                printGeneralTimer(
                                    $(".clock-menu"),
                                    generalTime.time
                                );
                                if (generalTime.time >= generalTime.limit) {
                                    endGame();
                                }
                                //console.log(`Tempo jogo: ${generalTime.time}s elapsed`);
                            },
                            1000
                        );
                        newClient(0);
                    }
                });
        }
    });

    $("#game").tabs();

    $(document).on("click", "#card", function () {
        spidersCaught++;
    })

    $(document).on("click", ".accept", function () {
        ordersAccepted++;
    })
    
    $(document).on("click", ".decline", function () {
        ordersDeclined++;
    })
    // background kitchen
    $("#btn-tabs > li > a").click(() => {
        if (
            $("#btn-select-order").parent("li").attr("aria-expanded") === "true"
        ) {
            $("#game").css("background", "var(--order)");
        } else {
            $("#game").css("background", "var(--no-order)");
        }
    });

    // Aba de pedidos

    $("#make-order").click(function () {
        $("#game").tabs({
            active: 0,
        });
        if ($("#orders > div").length < 6) {
            // $(this).prop("disabled", true);
            // getOrder(); // Montagem div com pedido
            clientOrder();
        }
    });

    // Aba cozimento

    $("#pan-to-noodles-and-broth").click(function () {
        // Transfere macarão cozido para tela com molho
        // $("#outer-pot").css("background", "var(--broth-noddle)");
        $("#outer-pot").css(
            "background-image",
            "url(./images/others/bowl.png)"
        );
        try {
            $("#pot").css(
                "background",
                `url(${$("#ready")[0].children[0].children[0].src
                }) no-repeat center`
            );
        } catch (e) {
            console.log("vazio");
        }
        $("#pot").css("background-size", "80%");
        $("#ready").droppable("enable");
        $("#ready")[0].innerHTML = "";
        $("#game").tabs({
            active: 2,
        });
    });

    // Aba molho

    $("#pan-to-ingredients").click(function () {
        // Transfere macarão com molho para tela com ingredientes
        $("#box").css("background", $("#outer-pot").css("background"));
        $("#droppable").css(
            "background",
            `${$("#pot").css("background-image")} no-repeat center`
        );
        $("#droppable").css("background-size", "80%");
        $("#outer-pot").css("background-image", "url(./images/others/bowl.png");
        $("#pot").css("background", "");
        $("#game").tabs({
            active: 3,
        });
    });

    // Aba ingredientes

    $("#end-order").click(function () {
        // End the order, calculate score and open the scoring modal
        console.log(services[0]);
        console.log(services[1]);
        console.log(services[2]);
        console.log(services[3]);
        console.log(services[4]);
        console.log(services[5]);

        if (
            !$("#box").css("background-image").includes("noddle") &&
            !$("#droppable").css("background-image").includes("noddle")
        ) {
            // If there is no pasta on the plate
            alert("A entrega não pôde ser concluída. Adicione o macarrão.");
            $("#game").tabs({ active: 1 });
        } else if (!$("#box").css("background-image").includes("broth")) {
            // If there is no broth on the plate
            alert("A entrega não pôde ser concluída. Adicione o caldo.");
            $("#game").tabs({ active: 2 });
        } else if ($("#droppable div").length < 5) {
            // If there are not enough ingredients
            alert(
                `A entrega não pôde ser concluída. Adicione pelo menos ${5 - $("#droppable div").length
                } ingredientes`
            );
        } else if ($("#order-completed").html() === "") {
            // If an order was not selected
            alert("A entrega não pôde ser concluída. Especifique o pedido.");
            if ($("#order-drop").html() === "") {
                $("#game").tabs({ active: 0 });
            }
        } else {
            // If everything is ok with the previous steps

            let holder = JSON.parse(
                $("#order-completed")[0].children[0].id || "{}"
            );
            dishMade.broth = $("#box").css("background-image");
            let scoreGeral = pointing(holder, dishMade);
            score = scoreGeral.totalScore;

            const orderNumber = Number(
                $("#order-completed").find("#orderNum").html()
            );
            $("#all-clients > div").each(function (i, item) {
                // Fill the scoring modal and removes the client from the seat
                try {
                    if (Number(item.children[0].id) === orderNumber) {
                        console.log(Number(item.children[0].id), orderNumber);
                        const clientNumber = item.children[0]
                            .getAttribute("src")
                            .split("-")[1];
                        showEndOrderModal(clientNumber, scoreGeral);
                        item.children[0].remove();

                        $(".seat-top-view").each(function (index) {
                            let img = $(this).children()[5 - i];
                            console.log(img);
                            $(img).attr(
                                "src",
                                "../images/others/seat-top-view.svg"
                            );
                        });

                        let div = $(`<img src="../images/order/seat.png" />`);
                        item.append(div[0]);
                    }
                } catch (e) {
                    console.log("Existe não");
                }
            });

            // $(".popup-overlay, .popup-content").addClass("active"); // Open the scoring modal
            clearKitchen();
        }
    });

    // $("#next-order").on("click", function () {
    // $(document).on("click", "#next-order", function (event) {
    //     // Close the scoring modal and continue to the next order
    //     // $(".popup-overlay, .popup-content").removeClass("active");
    //     $("#game").tabs({
    //         active: 0,
    //     });
    //     closeThisModal(event.target);
    // });
    // $("#end-game").on("click", function () {
    $(document).on("click", "#end-game", function () {
        // Close the scoring modal and open ranking modal
        // $(".popup-overlay, .popup-content").removeClass("active");
        const acceptanceScore = acceptancePointing(ordersAccepted, ordersDeclined);
        const spiderScore = spidersPointing(spidersCaught);
        console.log("end-game haha");
        showEndGameModal(score, acceptanceScore, spiderScore);
        updateScore();
        $("#score-game").html(score);

        // $(".popup-overlay-ranking, .popup-content-ranking").addClass("active"); // Open the ranking modal
        updateRanking();

        $("#play-again").on("click", function () {
            // Close the ranking modal               // PRECISA LIMPAR OS ASSENTOS E LEVAR PARA A OPENING
            // $(".popup-overlay-ranking, .popup-content-ranking").removeClass("active");
            $("#game").tabs({
                active: 0,
            });
        });
    });

    // function endGame() {
    //     updateScore();
    //     updateRanking();
    //     showEndGameModal(); // Mostrar mensagem de parabéns, somatório (pontuação dos pedidos, bônus por pedidos aceitos, bônus por aranha), pontuação total, total de clientes atendidos e chefinho feliz, botão de sair e botão de ranking.
    //     clearGame(); // Limpar personagens dos assentos, pedidos do varal, pedido do order-drop, conteúdo das panelas, zerar timer das panelas, limpar tijela do macarrão, limpar tijela do molho, limpar tijela dos ingredientes, limpar pedido da bandeja, limpar teias de aranha.
    //     clearTimer(); // Zerar timer do jogo e deixar pausado.
    // }

    function clearGame() {
        clearSpiderWeb();
        clearClients();
        clearOrders();
        clearOven();
        clearTimerOven();
        clearBowls();
    }

    function clearSpiderWeb() {
        $(".spider-web").each(function () {
            this.remove();
        });
    }

    function clearClients() {
        $("#all-clients > div").each(function () {
            this.innerHTML = `<img src="./images/order/seat.png" />`;
        });
        $(".seat-top-view > img").each(function () {
            this.src = "./images/others/seat-top-view.svg";
        });
    }

    function clearOrders() {
        $("#orders").html("");
        $("#order-drop").html("");
        $("#order-completed").html("");
    }

    function clearOven() {
        $(".stove").each(function () {
            this.style = "background: var(--pan-off);";
            this.innerHTML = "";
        });
    }

    function clearTimerOven() {
        $(".stove").each(function (index) {
            clearOneTimer(index + 1);
        });
    }

    function clearBowls() {
        $("#ready").html("");
        $("#ready").droppable("enable");
        $("#outer-pot").css("background-image", "");
        $("#box").css("background-image", "");
        $("#box").html("");
    }

    $("#btn-tabs li").click(function () {
        sound.playMusic("change");
    });

    $('#configuration[local="CONFIGURAÇÃO"]').click(function () {
        showConfigurationModal();
        $("#exit-game").remove();
    });

    $('#configuration[local="PAUSE"]').click(function () {
        showConfigurationModal();
    });

    $(document).on("click", function () {
        if ($("body").find(".modal-menu").length == 0) {
            console.log("arainha");
            aleatoryChance(1);
        }
    });
});

export { dishMade, sound, generalTime, zeroFill };
