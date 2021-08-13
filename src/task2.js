import {toggleError} from "../main.js";

const dom = {
    input: document.getElementById('t2-input'),
    status: document.getElementById('t2-status'),
    reason: document.getElementById('t2-reason'),
    output: document.getElementById('envelope'),
}

export const parseInput = (string) => {
    const app = {
        status: 'ok',
        reason: null,
        fail: (string) => {
            app.status = 'failed';
            app.reason = string;
        }
    }

    if (typeof string !== 'string' || string.length < 7) {
        app.fail(`${ string } is not a string or string length is less than 7`);
        return {app};
    }
    const values = string.split(/,\s*/);

    if (values.length < 4) {
        app.fail(`Values must be separated by commas`);
        return {app};
    }

    const parsed = [];
    for (let i = 0; i < values.length; i++) {
        const parsedEl = parseFloat(values[i]);

        if (isNaN(parsedEl)) {
            app.fail(`Type error: ${ values[i] } is not a number!`);
            return {app};
        }

        if (parsedEl <= 0 || parsedEl > 1000000) {
            app.fail(`Out of boundaries: ${ values[i] } dissatisfies 0 < x < 1000000 condition`);
            return {app};
        }
        parsed.push(parsedEl);
    }

    return {app, en1: {l: parsed[0], w: parsed[1]}, en2: {l: parsed[2], w: parsed[3]}}
}

export const calculateAreas = (en1, en2) => {
    const area1 = en1.l * en1.w;
    const area2 = en2.l * en2.w;
    let result;

    if (area1 < area2) {
        result = 1;
    } else if (area1 > area2) {
        result = 2;
    } else {
        result = 0;
    }

    return result;
}

export const envelopes = (string) => {
    const {app, en1, en2} = parseInput(string);

    if (app.status === 'ok') {
        dom.input.value = `${ Object.values(en1).toString() },${ Object.values(en2).toString() }`
        dom.output.textContent = calculateAreas(en1, en2).toString();
        toggleError(dom);
    } else {
        toggleError(dom, app);
        dom.output.textContent = '';
    }
}

export const task2 = () => {
    const input = dom.input.value;
    envelopes(input);
}
