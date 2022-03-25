import { sound } from "../script.js";
import { updateRanking } from "./requests.js";
import { addCarrousel } from "./carrousel.js";

const closeButton = $(`<button class="close-modal"></button>`);
let level = 1;

function showConfigurationModal() {
    if ($("body").find(".popup-overlay").length == 0) {
        let div = $(`<div class="popup-overlay">
                        <div id="configuration-modal" class="modal-menu">
                            <div id="close-menu" class="line-head">
                                <h1>${$("#configuration").attr("local")}</h1>
                                <button class="close-modal"></button>
                            </div>
                            <div>
                                <button id="change-sound" class="volume" level="2"></button>
                                <button id="exit-game"></button>
                                <button id="instructions"></button>
                                <button id="ranking"></button>
                                <button id="credits"></button>
                            </div>
                        </div>
                    </div>`);
        $("body").append(div[0]);
    }
}

function showEndOrder() {
    if ($("body").find(".popup-overlay").length == 0) {
        let div = $(`<div class="popup-overlay">
        <div id="configuration-modal" class="modal-bigger"  style="position: fixed;">
        <div id="close-menu" class="line-head">
            <h1>Fim do Pedido</h1>
            <button class="close-modal"></button>
        </div>
        <div>
        <div id="person-modal"></div>
        <div id="info-score">
            <h2>Pontuação</h2>
            <div>
                <p id="cooking-score"></p>
                <p id="broth-score"></p>
                <p id="ingredients-score"></p>
                <p id="order-score"></p>
                <p id="total-score"></p>
            </div>
            <div class="btn-modal">
                <button id="next-order">Próximo pedido</button>
                <button id="end-game">Finalizar jogo</button>
            </div>
        </div>
        </div>
    </div>
                    </div>`);
        $("body").append(div[0]);
    }
}

function showInstructionModal() {
    addCarrousel();
}

function showExitGame() {
    let div = $(
        `<div id="configuration-modal" class="modal-menu"  style="position: fixed;">
            <div>
                <h1>SAIR</h1>
            </div>
            <div class="line-head">
                <p>VOCÊ GOSTARIA DE SAIR DO JOGO?</p>
                <button id="exit-yes">SIM</button>
                <button id="exit-no">NÃO</button>
            </div>
        </div>`
    );
    $(".popup-overlay").append(div[0]);
}

function showRankingModal() {
    let div = $(
        `<div class="modal-bigger menu-ranking" style="position: fixed;">
        <div class="line-head">
            <h1>Ranking</h1>
            <button class="close-modal"></button>
        </div>
        <div id="ranking-modal" >
        </div>
        </div>`
    );
    $(".popup-overlay").append(div[0]);
    updateRanking();
    setTimeout(() => {
        $("#ranking-modal > div:last-child").append(closeButton[0]);
    }, 100);
}
/* 
function showCreditsModal() {
    let div = $(
        `<div id="credits-modal" class="modal" style="position: fixed;">
            <div>
                <h1>Créditos</h1>
                <button class="close-modal"></button>
            </div>
            <div id="all-creators">
                <div id="creators-text">
                    Agradecemos a todos por jogar nosso jogo!
                </div>
                <div id="images-of-creators">
                    <img src="../images/order/client-9-front.png" />
                    <img src="../images/order/client-5-front.png" />
                    <img src="../images/order/client-6-front.png" />
                    <img src="../images/order/client-7-front.png" />
                    <img src="../images/order/client-8-front.png" />
                    <img src="../images/order/chef-3.png" />
                </div>
            </div>
        </div>`
    );
    $(".popup-overlay").append(div[0]);
}
 */
function showEndOrderModal(clientNumber, scoreGeral) {
    if ($("body").find(".popup-overlay").length == 0) {
        let facialExpression;
        if(scoreGeral.totalScore >= 150 ) {
            facialExpression = "front";
        } else {
            facialExpression = "sad";
        }
        let div = $(`<div class="popup-overlay">
                        <div class="modal-bigger end-order" style="position: fixed;">
                            <div id="close-menu" class="line-head">
                                <h1>Fim do Pedido</h1>
                                <button class="close-modal"></button>
                            </div>
                            <div>
                                <div id="person-modal">
                                    <img src="./images/order/client-${clientNumber}-${facialExpression}.png" />
                                </div>
                                <div id="info-score">
                                    <h2>Pontuação</h2>
                                    <div>
                                        <p id="cooking-score">Cozimento: ${scoreGeral.cookingScore} pontos</p>
                                        <p id="broth-score">Caldo: ${scoreGeral.brothScore} pontos</p>
                                        <p id="ingredients-score">Ingredientes: ${scoreGeral.ingredientsScore} pontos</p>
                                        <p id="order-score">Pontuação do pedido: ${scoreGeral.orderScore} pontos</p>
                                        <p id="total-score">Pontuação total: ${scoreGeral.totalScore} pontos</p>
                                    </div>
                                    <div class="line-head">
                                        <button id="next-order">Próximo pedido</button>
                                        <button id="end-game">Finalizar jogo</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`);
        $("body").append(div[0]);
    }
}

function showEndGameModal(totalOrderScore, acceptancePointing, spidersPointing) {
    const finalScore = totalOrderScore + acceptancePointing + spidersPointing;
    let div = $(`<div class="popup-overlay">
                    <div class="modal-bigger end-order" style="position: fixed;">
                        <div id="close-menu" class="line-head">
                            <h1>Fim do Jogo</h1>
                            <button class="close-modal"></button>
                        </div>
                        <div>
                            <div id="info-score">
                                <h2>Pontuação</h2>
                                <div>
                                    <p id="total-score-order">Pontuação dos pedidos: ${totalOrderScore} pontos</p>
                                    <p id="acceptance-pointing">Bônus de pedidos aceitos: ${acceptancePointing} pontos</p>
                                    <p id="spider-score">Bônus das aranhas: ${spidersPointing} pontos</p>
                                    <p id="final-score">Pontuação final: ${finalScore} pontos</p>
                                </div>
                                <div class="btn-modal">
                                    <button id="see-ranking">Ver Ranking</button>
                                    <button id="leave-game">Sair</button>
                                </div>
                            </div>
                            <div id="person-modal">
                                <img src="./images/order/chef-2.png" />
                            </div>
                        </div>
                    </div>
                </div>`);
    $(".popup-overlay").append(div[0]);
}

function closeThisModal(target) {
    let reference = $(target).parent();
    if (reference.attr("class") == "line-head") {
        if (reference.attr("id") == "close-menu") {
            reference = $(reference).parents(".popup-overlay");
        } else {
            reference = $(reference).parent();
        }
    }
    reference.remove();
}

$(document).on("click", "#change-sound", function () {
    level = Number($(this).attr("level"));
    switch (level) {
        case 1:
            sound.volumeAll(0.60);
            console.log("volume 60%");
            break;
        case 2:
            sound.volumeAll(0.20);
            console.log("volume 20%");
            break;
        case 3:
            sound.mutedAll();
            console.log("volume mudo");
            break;
        case 4:
            sound.volumeAll(1);
            console.log("volume 100%");
            break;
    }
    level++;
    level == 5
        ? $(this).attr("level", "1")
        : $(this).attr("level", String(Number(level)));
});

$(document).on("click", "#exit-game", function () {
    showExitGame();
});

$(document).on("click", "#instructions", function () {
    showInstructionModal();
});

$(document).on("click", "#ranking", function () {
    showRankingModal();
});

$(document).on("click", "#credits", function () {
    showCreditsModal(2, {"cookingScore": 1, "brothScore": 1, "ingredientsScore": 1,
    "orderScore": 1, "totalScore": 140});
});

$(document).on("click", ".close-modal", function (event) {
    closeThisModal(event.target);
});

$(document).on("click", "#exit-no", function (event) {
    closeThisModal(event.target);
});

$(document).on("click", "#next-order", function (event) {
    console.log("ihuu");
    closeThisModal(event.target);
    $("#game").tabs({
        active: 0,
    });
});

export { showConfigurationModal, showEndOrderModal, showEndGameModal, closeThisModal };