import { sound } from "./audio.js";
import { updateRanking } from "./requests.js";

function showConfigurationModal() {
    console.log("modal");
    let div = $(`<div id="configuration-modal" style="position: fixed;">
                    <button id="change-sound" class="1"></button>
                    <button id="exit-game"></button>
                    <button id="instructions"></button>
                    <button id="ranking"></button>
                    <button id="credits"></button>
                </div>`);
    console.log(div[0]);
    $("body").append(div[0]);
}

function showInstructionModal() {
    let div = $(`<div id="instructions-modal" style="position: fixed;"></div>`);
    $("body").append(div[0]);
}

function showRankingModal() {
    let div = $(`<div id="ranking-modal" style="position: fixed;"></div>`);
    $("body").append(div[0]);
    updateRanking();
}

function showCreditsModal() {
    let div = $(`<div id="credits-modal" style="position: fixed;"></div>`);
    $("body").append(div[0]);
}

$(document).on("click", "#change-sound", function () {
    let level = $(this).attr("class");
    switch(level){
        case 1:
            sound.volumeAll(0.33);
            break;
        case 2:
            sound.volumeAll(0.66);
            break;
        case 3:
            sound.volumeAll(1);
            break;
        case 4:
            sound.mutedAll();
            break;
    }
    level == 4 ? $(this).attr("class", "1") : $(this).attr("class", String(level + 1));
});

$(document).on("click", "#exit-game", function () {
    // Para onde vamos?
});

$(document).on("click", "#instructions", function () {
    showInstructionModal()
});

$(document).on("click", "#ranking", function () {
    showRankingModal()
});

$(document).on("click", "#credits", function () {
    showCreditsModal()
});

export {showConfigurationModal};