import { sound } from "../script.js";
import { updateRanking } from "./requests.js";
import { addCarrousel } from "./carrousel.js";

const closeButton = $(`<button class="close-modal"></button>`);

function showConfigurationModal() {
    if ($("body").find(".popup-overlay").length == 0) {
        let div = $(`<div class="popup-overlay">
                        <div id="configuration-modal" class="modal-menu">
                            <div id="close-menu" class="line-head">
                                <h1>${$("#configuration").attr("local")}</h1>
                                <button class="close-modal"></button>
                            </div>
                            <div>
                                <button id="change-sound" class="volume" level="1"></button>
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

function showCreditsModal() {
    let div = $(
        `<div id="credits-modal" class="modal" style="position: fixed;">Créditos<button class="close-modal"></button></div>`
    );
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
    let level = $(this).attr("level");
    switch (level) {
        case 1:
            sound.volumeAll(1);
            break;
        case 2:
            sound.volumeAll(0.66);
            break;
        case 3:
            sound.volumeAll(0.33);
            break;
        case 4:
            sound.mutedAll();
            break;
    }
    level == 4
        ? $(this).attr("level", "1")
        : $(this).attr("level", String(Number(level) + 1));
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
    showCreditsModal();
});

$(document).on("click", ".close-modal", function (event) {
    closeThisModal(event.target);
});

$(document).on("click", "#exit-no", function (event) {
    closeThisModal(event.target);
});

export { showConfigurationModal };