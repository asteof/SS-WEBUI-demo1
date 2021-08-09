import {toggleError} from "../main.js";

const dom = {
    input: document.getElementById('t7-input'),
    status: document.getElementById('t7-status'),
    reason: document.getElementById('t7-reason'),
    output: document.getElementById('fibonacci'),
}

export const task7 = () => {
    const string = dom.input.value;
    selectiveFibonacci(string)
}

const selectiveFibonacci = (string) => {
    const {app, parsed} = parseInput(string);
    if (app.status === 'ok') {
        let result;
        if (parsed.min && parsed.max) {
            result = fibonacciSequenceMax(parsed.max).filter(el => el > parsed.min);
        } else if (parsed.length) {
            result = fibonacciSequenceLength(parsed.length)
        }

        toggleError(dom);
        dom.output.textContent = result.join(', ');
    } else {
        toggleError(dom, app);
    }
}


const fibonacciSequenceLength = (length) => {
    let a = 1;
    let fib = 0;
    let next = 0;
    const result = [];

    for (let i = 0; a.toString().length <= length; i++) {
        if (a.toString().length === length) {
            result.push(a);
        }
        next = a;
        a = a + fib;
        fib = next;
    }
    return result;
}


const fibonacciSequenceMax = (number) => {
    let a = 1;
    let fib = 0;
    let next = 0;
    const result = [];

    while (fib < number) {
        next = a;
        a = a + fib;
        result.push(fib);
        fib = next;
    }
    return result;
}

const parseInput = (string) => {
    const app = {
        status: 'ok',
        reason: null,
        fail(string) {
            this.status = 'failed';
            this.reason = string;
        }
    }

    const rangeRegEx = /\d+,\s*\d+/;
    const lengthRegEx = /l\d+/i;
    let parsedTemp = [];
    const parsed = {};

    if (rangeRegEx.test(string)) {
        parsedTemp = string.split(/,\s*/).map(el => parseInt(el)).sort((a, b) => a - b);
        [parsed.min, parsed.max] = parsedTemp;
    } else if (lengthRegEx.test(string)) {
        parsedTemp = string.match(/\d+/);
        parsed.length = parseInt(parsedTemp[0]);
        dom.input.value = `l${ parsed.length }`
    } else {
        app.fail('Input cannot be parsed');
    }

    for (const el in parsed) {
        const elName = el.toString().charAt(0).toUpperCase() + el.toString().slice(1);
        const value = parsed[el];

        if (value < 1) {
            app.fail(`${ elName } value cannot be less than 1`);
            return {app};
        }
        if (value > Number.MAX_SAFE_INTEGER) {
            app.fail(`${ elName } value cannot be more than 2^53-1`);
            return {app};
        }
        if (el.toString() === 'length' && value > 16) {
            app.fail(`Length cannot be more than 16`);
            return {app};
        }
    }

    return {app, parsed};
}