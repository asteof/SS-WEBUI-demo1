import {toggleError} from "../main.js";

const dom = {
    input: document.getElementById('t7-input'),
    status: document.getElementById('t7-status'),
    reason: document.getElementById('t7-reason'),
    output: document.getElementById('fibonacci'),
};

// function order not changed

export const task7 = () => {
    const input = dom.input.value;
    displayFibonacci(input);
}

const displayFibonacci = (string) => {
    const {app, parsed, domInputText} = parseInput(string);
    if (app.status === 'ok') {
        dom.input.value = domInputText;
        const outputString = calculateFibonacci(parsed)
        toggleError(dom);
        dom.output.textContent = outputString;
    } else {
        toggleError(dom, app);
    }
}

export const calculateFibonacci = (parsed) => {
    let fib;
    if (parsed.min && parsed.max) {
        fib = fibonacciSequenceMax(parsed.min, parsed.max)
    } else if (parsed.length) {
        fib = fibonacciSequenceLength(parsed.length);
    }
    return fib.join(', ');
}

export const fibonacciSequenceLength = (length) => {
    let a = 1;
    let fib = 0;
    let next = 0;
    const sequence = [];

    for (let i = 0; a.toString().length <= length; i++) {
        if (a.toString().length === length) {
            sequence.push(a);
        }
        next = a;
        a = a + fib;
        fib = next;
    }
    return sequence;
}

export const fibonacciSequenceMax = (min, max) => {
    let a = 1;
    let fib = 0;
    let next = 0;
    const sequence = [];

    while (fib < max) {
        next = a;
        a = a + fib;
        if (fib > min) {
            sequence.push(fib);
        }
        fib = next;
    }
    return sequence;
}

export const parseInput = (string) => {
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
    const parsed = {};
    let domInputText = '';

    if (rangeRegEx.test(string)) {
        [parsed.min, parsed.max] = string
            .split(/,\s*/)
            .map(el => parseInt(el))
            .sort((a, b) => a - b);
        domInputText = `${ parsed.min }, ${ parsed.max }`;
    } else if (lengthRegEx.test(string)) {
        const parsedTemp = string.match(/\d+/);
        parsed.length = parseInt(parsedTemp[0]);
        domInputText = `l${ parsed.length }`;
    } else {
        app.fail('Input cannot be parsed');
    }

    for (const el in parsed) {
        const stringEl = el.toString();
        const elName = `${ stringEl[0].toUpperCase() }${ stringEl.slice(1) }`; //charAt(0)???
        const value = parsed[el];

        if (value < 1) {
            app.fail(`${ elName } value cannot be less than 1`);
            return {app};
        }
        if (value > Number.MAX_SAFE_INTEGER) {
            app.fail(`${ elName } value cannot be more than 2^53-1`);
            return {app};
        }
        if (stringEl === 'length' && value > 16) {
            app.fail('Length cannot be more than 16');
            return {app};
        }
    }
    // console.log(app, parsed, domInputText); testing purposes
    return {app, parsed, domInputText};
}