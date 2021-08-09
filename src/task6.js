import {toggleError} from "../main.js";

const dom = {
    input: document.getElementById('t6-input'),
    status: document.getElementById('t6-status'),
    reason: document.getElementById('t6-reason'),
    output: document.getElementById('numbers'),
}

export const task6 = ()=>{
    const string = dom.input.value;
    numberSeries(string);
}

const numberSeries = (string) => {
    const {app, length, minSquare} = parseInput(string);
    if (app.status === 'ok') {

        const array = [];
        const min = Math.round(minSquare ** (1 / 2));

        for (let i = min; i <= (length + min); i++) {
            if (i ** 2 >= minSquare) {
                array.push(i);
            }
        }

        if (array.length>length){
            array.pop();
        }

        dom.output.textContent = array.join(', ');
        toggleError(dom);
    }else{
        toggleError(dom, app);
    }
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

    const parsed = string.split(/,\w*/).map(el => parseInt(el));
    if (isNaN(parsed[0])  || isNaN(parsed[1])){
        app.fail(`Couldn't parse a number`);
        return {app};
    }

    const length = parsed.length;
    if (length !== 2) {
        app.fail(`You must enter two arguments`);
        return {app};
    }

    if (parsed[0] < 0 || parsed[1] < 1) {
        app.fail(`Your arguments must be natural`);
        return {app};
    }

    dom.input.value = parsed.join(', ')
    return {app, length: parsed[0], minSquare: parsed[1]};
}
