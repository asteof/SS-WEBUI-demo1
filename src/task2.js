import {toggleError} from "../main.js";

const dom = {
    input: document.getElementById('t2-input'),
    status: document.getElementById('t2-status'),
    reason: document.getElementById('t2-reason'),
    output: document.getElementById('envelope'),
}

export const task2 = () => {
    const string = dom.input.value;
    envelopes(string);
}

const envelopes = (string) => {
    const {app, en1, en2} = parseInput(string);
    if (app.status === 'ok') {
        const area1 = en1.l * en1.w;
        const area2 = en2.l * en2.w;
        let result;

        if (area1 < area2) {
            result = 'envelope 1';
        } else if (area1 > area2) {
            result = 'envelope 2';
        } else {
            result = 0;
        }

        dom.output.textContent = result.toString();
        toggleError(dom);
    } else {
        toggleError(dom, app);
        dom.output.textContent = '';
    }

}

const parseInput = (string) => {
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

    const parsed = values.map(el => {
        const parsedEl = parseFloat(el)
        if (isNaN(parsedEl)) {
            app.fail(`Type error: ${ el } is not a number!`);
        }
        if (parsedEl <= 0 || parsedEl > 1000000) {
            app.fail(`Out of boundaries: ${ el } dissatisfies 0 < x < 1000000 condition.`);
        }

        return parsedEl;
    })

    return {app, en1: {l: parsed[0], w: parsed[1]}, en2: {l: parsed[2], w: parsed[3]}}
}
