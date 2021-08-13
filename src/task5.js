import {toggleError} from "../main.js";

const dom = {
    input: document.getElementById('t5-input'),
    status: document.getElementById('t5-status'),
    reason: document.getElementById('t5-reason'),
    output: document.getElementById('tickets'),
}

export const task5 = () => {
    const input = dom.input.value;
    happyTickets(input);
}

const happyTickets = (string) => {
    const {app, context} = parseInput(string);

    if (app.status === 'ok') {
        dom.input.value = `${ context.min }, ${ context.max }`;
        const happyTickets = getHappyTickets(context);
        toggleError(dom);
        dom.output.textContent = JSON.stringify(happyTickets);
    } else {
        toggleError(dom, app);
    }
}

export const getHappyTickets = (context) => {
    let countEasy = 0;
    let countHard = 0;

    for (let i = context.min; i < context.max; i += 1) {
        countEasy += checkTicketEasy(i);
        countHard += checkTicketHard(i);
    }

    let winner;
    if (countEasy > countHard) {
        winner = 'easy';
    } else if (countEasy === countHard) {
        winner = 'both';
    } else {
        winner = 'hard';
    }
    return {winner, tickets: {countEasy, countHard}};
}

export const checkTicketEasy = (number) => {
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

export const checkTicketHard = (number) => {
    const digits = [...number.toString()].map(el => parseInt(el));

    const even = digits.reduce((a, b) => b % 2 === 0 ? a + b : a, 0);
    const odd = digits.reduce((a, b) => b % 2 !== 0 ? a + b : a, 0);
    return even === odd;
}

export const parseInput = (string) => {
    const app = {
        status: 'ok',
        reason: null,
        fail(string) {
            this.status = 'failed';
            this.reason = string;
        }
    };

    const context = string.split(/,\s*/).map(el => parseInt(el));

    if (context.length !== 2) {
        app.fail(`There can be only two arguments`);
        return {app};
    }

    const [min, max] = context.sort((a, b) => a - b);

    if (isNaN(min) || isNaN(max)) {
        app.fail('Couldn\'t parse a number');
        return {app};
    }

    if ((min < 1 || min > 999999) || (max < 1 || max > 999999)) {
        app.fail(`Input does not satisfy condition 1 <= input <= 999999`);
        return {app};
    }

    return {app, context: {min, max}};
}