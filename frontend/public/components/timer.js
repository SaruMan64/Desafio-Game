let cods = new Array(5);
const timers = new Array(5);

function printTimer(stove, time) { // Show the timer on the stove
    let string = time.toString();

    if (time >= 10) {
        string = `${time}`;
    } else {
        string = `0${time}`;
    }

    /* if (time >= 60) {
        string = `--`;
        //clearTimeout(cod);
    } */

    let splittedString = string.split("");
    let i = 0;
    $(stove).children().each(function () {
        $(this).text(splittedString[i]);
        i++;
    });
}

const setCorrectingInterval = function (func, cod, i, delay) {
	var instance = {};

	function tick(func, delay) {
		if (!instance.started) {
			instance.func = func;
			instance.delay = delay;
			instance.startTime = new Date().valueOf();
			instance.target = delay;
			instance.started = true;

			cod[i] = setTimeout(tick, delay);
		} else {
			let elapsed = new Date().valueOf() - instance.startTime;
            let adjust = instance.target - elapsed;

			instance.func();
			instance.target += instance.delay;

			cod[i] = setTimeout(tick, instance.delay + adjust);
		}
	}

	return tick(func, delay);
};


function setTimer(index) { // Start the stove timer
    const interval = 1000;
    const aux = $(`[value=${index}]`).siblings(".clock")[index - 1]; // aqui havia um .next(); no lugar do siblings

    let startTime = Date.now();
    setCorrectingInterval(function () {
        let time = Math.trunc((Date.now() - startTime) / 1000);
        timers[index - 1] = time;
        printTimer(aux, time);
    }, cods, index, interval);
}

function clearOneTimer(num) {
    clearTimeout(cods[num]);
    const stove = $(`[value=${num}]`).siblings(".clock")[num - 1]; // aqui tbm
    $(stove).children().each(function () {
        $(this).text("");
    });
    return timers[num - 1];
}

export {setTimer, clearOneTimer};