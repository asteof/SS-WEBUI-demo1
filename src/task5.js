import {toggleError} from "../main.js";

const dom = {
    input: document.getElementById('t5-input'),
    status: document.getElementById('t5-status'),
    reason: document.getElementById('t5-reason'),
    output: document.getElementById('tickets'),
}

export const task5 = () => {
    const string = dom.input.value;
    happyTickets(string);
}

const happyTickets = (string) => {
    const {app, context} = parseInput(string);

    if (app.status === 'ok') {
        let countEasy = 0;
        let countHard = 0;

        for (let i = context.min; i < context.max; i += 1) {
            countEasy += checkTicketEasy(i);
            countHard += checkTicketHard(i);
        }

        const winner = countEasy > countHard ? 'easy' : countEasy === countHard ? 'both' : 'hard';
        const result = {
            winner,
            tickets: {countEasy, countHard}
        };

        toggleError(dom);
        dom.output.textContent = JSON.stringify(result);
    } else {
        toggleError(dom, app);
    }
}

const checkTicketEasy = (number) => {
    const digits = [...number.toString()].map(el => parseInt(el));
    const sumReducer = (a, b) => a + b;
    const length = digits.length;
    if (length === 6) {
        const firstHalf = digits.slice(0, length / 2).reduce(sumReducer);
        const secondHalf = digits.slice(length / 2, length).reduce(sumReducer);
        return firstHalf === secondHalf;
    }
    return false;
}

const checkTicketHard = (number) => {
    const digits = [...number.toString()].map(el => parseInt(el));

    const even = digits.reduce((a, b) => b % 2 === 0 ? a + b : a, 0);
    const odd = digits.reduce((a, b) => b % 2 !== 0 ? a + b : a, 0);
    return even === odd;
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

    const context = string.split(/,\s+/).map(el => parseInt(el));


    if (context.length > 2) {
        app.fail(`There can be only two arguments. Inputted ${ context.length }`);
        return {app};
    }

    const [min, max] = context.sort((a, b) => a - b);

    if (isNaN(min) || isNaN(max)){
        app.fail('Couldn\'t parse a number');
        return {app};
    }

     if ((min < 1 || min > 999999) || (max < 1 || max > 999999)) {
        app.fail(`Input does not satisfy condition 1 <= input <= 999999`);
        return {app}
    }

    dom.input.value = `${min}, ${max}`;
    return {app, context: {min, max}};
}
