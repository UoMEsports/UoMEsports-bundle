import * as nodecgApiContext from './util/nodecg-api-context';

const nodecg = nodecgApiContext.get();

const NanoTimer = require('nanotimer');
const TimeObject = require('../shared/lib/vendor/time-object');

const timer = new NanoTimer();
const timerRep = nodecg.Replicant('timer', {
    defaultValue: (function () {
        const to = new TimeObject(300);
        to.running = false;
        to.hidden = false;
        to.text = 'UP NEXT';
        return to;
    })()
});

// Load the existing time and start the timerRep at that.
if (timerRep.value.running) {
    start();
}

nodecg.listenFor('startTimer', start);
nodecg.listenFor('stopTimer', stop);
nodecg.listenFor('resetTimer', reset);
nodecg.listenFor('setTimer', setDuration);
nodecg.listenFor('setTimerEnd', setEnd);
nodecg.listenFor('showHideTimer', showHide);
nodecg.listenFor('setTimerText', setText);

/**
 * Starts the timer.
 * @returns {undefined}
 */
function start(): void {
    timer.clearInterval();
    if (timerRep.value.raw <= 0) {
        timerRep.value.running = false;
        return;
    }
    timerRep.value.running = true;
    timer.setInterval(tick, '', '1s');
}

/**
 * Decrements the timer by one second.
 * @returns {undefined}
 */
function tick(): void {
    TimeObject.decrement(timerRep.value);
    if (timerRep.value.raw < 1) {
        stop();
    }
}

/**
 * Stops the timer.
 * @returns {undefined}
 */
function stop(): void {
    timer.clearInterval();
    timerRep.value.running = false;
}

/**
 * Stops and resets the timer
 * @returns {undefined}
 */
function reset(): void {
    stop();
    TimeObject.setSeconds(timerRep.value, 0);
}

/**
 * Sets the timer to end at a specific timestamp
 * @param {number} ts - Unix timestamp at which to end timer
 * @returns {undefined}
 */
function setEnd(ts: number): void {
    const timeDiff = Math.max(ts - ((new Date).getTime() / 1000), 0);
    if (timeDiff < 1) {
        stop();
    }

    TimeObject.setSeconds(timerRep.value, timeDiff);
}

/**
 * Sets the timer to end at a specific timestamp
 * @param {number} time - Number of seconds to set the timer to
 * @returns {undefined}
 */
function setDuration(time: number): void {
    if (time < 1) {
        stop();
    }
    TimeObject.setSeconds(timerRep.value, time);
}

function showHide(): void {
    timerRep.value.hidden = !timerRep.value.hidden;
}

function setText(text: string): void {
    timerRep.value.text = text;
}
