import {Time} from '../types/time';

/**
 * TimeObject class.
 * @property {Number} raw
 * @property {Number} hours
 * @property {Number} minutes
 * @property {Number} seconds
 * @property {String} formatted
 * @property {Number} timestamp
 */
class TimeObject implements Time {

    public hours: number;
    public minutes: number;
    public seconds: number;
    public formatted: string;
    public raw: number;
    public timestamp: number;

    /**
     * Constructs a new TimeObject with the provided number of seconds.
     * @param {Number} [seconds = 0] - The value to instantiate this TimeObject with, in seconds.
     */
    public constructor(seconds: number = 0) {
        this.setSeconds(seconds);
    }

    /**
     * Increments a TimeObject by one second.
     */
    public increment(): void {
        this.raw++;

        const hms = TimeObject.secondsToHMS(this.raw);
        this.hours = hms.h;
        this.minutes = hms.m;
        this.seconds = hms.s;
        this.formatted = TimeObject.formatHMS(hms);
        this.timestamp = Date.now();
    }

    /**
     * Decrements a TimeObject by one second.
     */
    public decrement(): void {
        this.raw--;

        const hms = TimeObject.secondsToHMS(this.raw);
        this.hours = hms.h;
        this.minutes = hms.m;
        this.seconds = hms.s;
        this.formatted = TimeObject.formatHMS(hms);
        this.timestamp = Date.now();
    }

    /**
     * Sets the value of a TimeObject.
     * @param {Number} seconds - The value to set to (in seconds).
     */
    public setSeconds(seconds: number): void {
        const hms = TimeObject.secondsToHMS(seconds);
        this.hours = hms.h;
        this.minutes = hms.m;
        this.seconds = hms.s;
        this.formatted = TimeObject.formatHMS(hms);
        this.raw = seconds;
        this.timestamp = Date.now();
    }

    /**
     * Formats an HMS object into a string ([hh:]mm:ss).
     * @param {{h: number, m: number, s: number}} hms - The HMS object to format.
     * @returns {string} - The formatted time string.
     */
    public static formatHMS(hms: {h: number; m: number; s: number}): string {
        let str = '';
        if (hms.h) {
            str += `${hms.h}:`;
        }

        str += `${(hms.m < 10 ? `0${hms.m}` : hms.m)}:${(hms.s < 10 ? `0${hms.s}` : hms.s)}`;
        return str;
    }

    /**
     * Formats a number of seconds into a string ([hh:]mm:ss).
     * @param {number} seconds - The number of seconds to format.
     * @returns {string} - The formatted time sting.
     */
    public static formatSeconds(seconds: number): string {
        const hms = TimeObject.secondsToHMS(seconds);
        return TimeObject.formatHMS(hms);
    }

    /**
     * Parses a number of seconds into an HMS object.
     * @param {number} seconds - A number of seconds.
     * @returns {{h: number, m: number, s: number}} - An HMS object.
     */
    public static secondsToHMS(seconds: number): {h: number; m: number; s: number} {
        return {
            h: Math.floor(seconds / 3600),
            m: Math.floor(seconds % 3600 / 60),
            s: Math.floor(seconds % 3600 % 60)
        };
    }

    /**
     * Parses a formatted time string into an integer of seconds.
     * @param {string} timeString - The formatted time string to parse (hh:mm:ss or mm:ss).
     * @returns {number} - The parsed time string represented as seconds.
     */
    public static parseSeconds(timeString: string): number {
        const timeParts = timeString.split(':');
        if (timeParts.length === 3) {
            return (parseInt(timeParts[0], 10) * 3600) + (parseInt(timeParts[1], 10) * 60) + parseInt(timeParts[2], 10);
        }

        if (timeParts.length === 2) {
            return (parseInt(timeParts[0], 10) * 60) + parseInt(timeParts[1], 10);
        }

        if (timeParts.length === 1) {
            return parseInt(timeParts[0], 10);
        }

        throw new Error(`Unexpected format of timeString argument: ${timeString}`);
    }
}

if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = TimeObject;
}