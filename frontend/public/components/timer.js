let cod1;
let cod2;
let cod3;
let cod4;
let cod5;
const timers = new Array(5);

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

    let splittedString = string.split("");
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
                timers[index - 1] = timer;
                // dishMade.cookingTime = timer;
                printTimer(aux, timer, cod1);
            }, interval);
            break
        case 2:
            cod2 = setInterval(function () {
                timer++;
                timers[index - 1] = timer;
                // dishMade.cookingTime = timer;
                printTimer(aux, timer, cod2);
            }, interval);
            break
        case 3:
            cod3 = setInterval(function () {
                timer++;
                timers[index - 1] = timer;
                // dishMade.cookingTime = timer;
                printTimer(aux, timer, cod3);
            }, interval);
            break
        case 4:
            cod4 = setInterval(function () {
                timer++;
                timers[index - 1] = timer;
                // dishMade.cookingTime = timer;
                printTimer(aux, timer, cod4);
            }, interval);
            break
        case 5:
            cod5 = setInterval(function () {
                timer++;
                timers[index - 1] = timer;
                // dishMade.cookingTime = timer;
                printTimer(aux, timer, cod5);
            }, interval);
            break
    }
}

function clearOneTimer(num) {
    switch (num) {
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
    const stove = $(`[value=${num}]`).next();
    $(stove).children().each(function () {
        $(this).text("");
    });
    return timers[num - 1];
}

export {setTimer, clearOneTimer};