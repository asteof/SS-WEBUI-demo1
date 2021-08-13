import {toggleError} from "../main.js";

const dom = {
    length: document.getElementById('t1-length'),
    width: document.getElementById('t1-width'),
    symbol: document.getElementById('t1-symbol'),
    output: document.getElementById('chessBoard'),
    status: document.getElementById('t1-status'),
    reason: document.getElementById('t1-reason'),
}

export const parseInput = (length, width, symbol) => {
    const app = {
        status: 'ok',
        reason: null,
        fail(string) {
            this.status = 'failed';
            this.reason = string;
        }
    }

    length = parseInt(length);
    width = parseInt(width);

    if (isNaN(length) || isNaN(width)) {
        app.fail('Type error: \nLength and width must be numbers');
        return {app};
    }

    if (typeof symbol !== 'string') {
        app.fail('Type error: \nSymbol must be string');
        return {app};
    }

    if ((length <= 0 || length > 20) ||
        (width <= 0 || width > 20)) {
        app.fail('Out of boundaries: \nLength and width must be between 0 and 20');
        return {app};
    }

    if (symbol.length !== 1) {
        app.fail('Out of boundaries: \nSymbol\'s length must be 1');
        return {app};
    }

    return {app, parsed: {length, width, symbol}};
}

export const generateString = (length, width, symbol) => {
    const amountOfSymbols = length * width;
    let output = '';

    let row = 1;
    for (let i = 1; i < amountOfSymbols + 1; i += 1) {
        if (i % width === 0) {
            if (row % 2 === 0) {
                output += symbol + '\n';
            } else {
                output += symbol + '\n ';
            }
            row += 1;
        } else {
            output += symbol + ' ';
        }
    }
    return output;
}

const createBoard = (length, width, symbol) => {
    const {app, parsed: p} = parseInput(length, width, symbol);
    if (app.status === 'ok') {
        const output = generateString(p.length, p.width, p.symbol);// inline??
        dom.output.textContent = output;
        toggleError(dom);
    } else {
        toggleError(dom, app);
    }
}

export const task1 = () => {
    const length = dom.length.value;
    const width = dom.width.value;
    const symbol = dom.symbol.value;
    createBoard(length, width, symbol);
}

