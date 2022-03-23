import { sound } from "./audio.js";
import { updateRanking } from "./requests.js";

const closeButton = $(`<button class="close-modal"></button>`);

function showConfigurationModal() {
    console.log("modal");
    if ($("body").find("#configuration-modal").length == 0) {
    let div = $(`<div id="configuration-modal" style="position: fixed;">
                    <h1>${$("#configuration").attr("local")}</h1>
                    <button class="close-modal"></button>
                    <div>
                        <button id="change-sound" class="volume" level="1"></button>
                        <button id="exit-game"></button>
                        <button id="instructions"></button>
                        <button id="ranking"></button>
                        <button id="credits"></button>
                    </div>
                </div>`);
        console.log(div[0]);
        $("body").append(div[0]);
    }
}

function showInstructionModal() {
    let div = $(`<div id="instructions-modal" class="modal" style="position: fixed;">Instruções<button class="close-modal"></button></div>`);
    $("body").append(div[0]);
}

function showRankingModal() {
    let div = $(`<div id="ranking-modal" class="modal" style="position: fixed;"></div>`);
    $("body").append(div[0]);
    updateRanking();
    setTimeout(() => {
        $("#ranking-modal").append(closeButton[0]);
    }, 100);
}

function showCreditsModal() {
    let div = $(`<div id="credits-modal" class="modal" style="position: fixed;">Créditos<button class="close-modal"></button></div>`);
    $("body").append(div[0]);
}

function closeThisModal(target) {
    let reference = $(target).parent();
    reference.remove();
}

$(document).on("click", "#change-sound", function () {
    let level = $(this).attr("level");
    switch(level){
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
    level == 4 ? $(this).attr("level", "1") : $(this).attr("level", String(Number(level) + 1));
});

$(document).on("click", "#exit-game", function () {
    // Para onde vamos?
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

export { showConfigurationModal };
