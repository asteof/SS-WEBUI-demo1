import {toggleError} from "../main.js";

const dom = {
    input: document.getElementById('t6-input'),
    status: document.getElementById('t6-status'),
    reason: document.getElementById('t6-reason'),
    output: document.getElementById('numbers'),
}

export const task6 = () => {
    const input = dom.input.value;
    displayNumberSeries(input);
}

const displayNumberSeries = (string) => {
    const {app, length, minSquare} = parseInput(string);
    if (app.status === 'ok') {
        dom.input.value = `${ length }, ${ minSquare }`;
        const numbers = getNumberSeries(length, minSquare);
        dom.output.textContent = numbers.join(', ');
        toggleError(dom);
    } else {
        toggleError(dom, app);
    }
}

export const getNumberSeries = (length, minSquare) => {
    const numbers = [];
    const min = Math.round(Math.sqrt(minSquare));

    for (let i = min; i <= (length + min); i++) {
        if (i ** 2 >= minSquare) {
            numbers.push(i);
        }
    }

    if (numbers.length > length) {
        numbers.pop();
    }
    return numbers;
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

    const parsed = string.split(/,\s*/).map(el => parseInt(el));

    if (parsed.length !== 2) {
        app.fail(`You must enter two arguments`);
        return {app};
    }

    if (isNaN(parsed[0]) || isNaN(parsed[1])) {
        app.fail(`Couldn't parse a number`);
        return {app};
    }

    if (parsed[0] < 1 || parsed[1] < 1) {
        app.fail('Your arguments must be natural');
        return {app};
    }

    return {app, length: parsed[0], minSquare: parsed[1]};
}
