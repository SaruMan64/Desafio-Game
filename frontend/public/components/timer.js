const cods = new Array(5);
const timers = new Array(5);
const stoves = new Array(5);

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

/* const setCorrectingInterval = function (func, cod, i, delay) {
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
}; */

function setTimer(index) { // Start the stove timer
  const interval = 1000;
  const aux = $(`[value=${index}]`).next();

  let startTime = Date.now();
  stoves[index] = new factory();
  cods[index] = stoves[index].setCorrectingInterval(function () {
      let time = Math.trunc((Date.now() - startTime) / 1000);
      timers[index - 1] = time;
      printTimer(aux, time);
  }, interval);
  console.log(cods[index]);
}

function factory() {
    // Track running intervals
    let numIntervals = 0;
    let intervals = {};
  
    // Polyfill Date.now
    let now = Date.now || function() {
      return new Date().valueOf();
    };
  
    let setCorrectingInterval = function(func, delay) {
        let id = numIntervals++;
        let planned = now() + delay;
  
      // Normalize func as function
      switch (typeof func) {
        case 'function':
          break;
        case 'string':
          var sFunc = func;
          func = function() {
            eval(sFunc);
          };
          break;
        default:
          func = function() { };
      }
  
      function tick() {
        func();
  
        // Only re-register if clearCorrectingInterval was not called during function
        if (intervals[id]) {
          planned += delay;
          intervals[id] = setTimeout(tick, planned - now());
        }
      }
  
      intervals[id] = setTimeout(tick, delay);
      return id;
    };
  
    let clearCorrectingInterval = function(id) {
      clearTimeout(intervals[id]);
      delete intervals[id];
    };
  
    return {
      setCorrectingInterval: setCorrectingInterval,
      clearCorrectingInterval: clearCorrectingInterval
    };
}

function clearOneTimer(num) {
    stoves[num].clearCorrectingInterval(cods[num]);
    const stove = $(`[value=${num}]`).next();
    $(stove).children().each(function () {
        $(this).text("");
    });
    console.log(timers[num - 1]);
    return timers[num - 1];
}

export {setTimer, clearOneTimer, factory};