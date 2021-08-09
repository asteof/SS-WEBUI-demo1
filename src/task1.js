import {toggleError} from "../main.js";

const dom = {
    length: document.getElementById('t1-length'),
    width: document.getElementById('t1-width'),
    symbol: document.getElementById('t1-symbol'),
    output: document.getElementById('chessBoard'),
    status: document.getElementById('t1-status'),
    reason: document.getElementById('t1-reason'),
}

export const task1 = () => {
    const length = parseInt(dom.length.value);
    const width = parseInt(dom.width.value);
    const symbol = dom.symbol.value;
    createBoard(length, width, symbol);
}

const createBoard = (length, width, symbol) => {
    const app = parseInput(length, width, symbol);
    if (app.status === 'ok') {
        length = parseInt(length.toFixed());
        width = parseInt(width.toFixed());

        const amountOfSymbols = length * width;
        let string = '';

        let row = 1;
        for (let i = 1; i < amountOfSymbols + 1; i += 1) {
            if (i % width === 0) {
                if (row % 2 === 0) {
                    string += symbol + '\n';
                } else {
                    string += symbol + '\n ';
                }
                row += 1;
            } else {
                string += symbol + ' ';
            }
        }
        dom.output.textContent = string;
        toggleError(dom);
    } else {
        toggleError(dom, app);
    }
}

const parseInput = (length, width, symbol) => {
    const app = {
        status: 'ok',
        reason: null,
        fail(string) {
            this.status = 'failed';
            this.reason = string;
        }
    }

    if ((typeof length !== 'number' || isNaN(length))
        || (typeof width !== 'number' || isNaN(length))
        || typeof symbol !== 'string') {
        app.fail('Type error: \nLength and width must be numbers. Symbol must be string.')
    } else if ((length <= 0 || length > 20)
        || (width <= 0 || width > 20)
        || symbol.length > 1 || symbol.length < 1) {
        app.fail('Out of boundaries: \nLength and width must be between 0 and 20. Symbol\'s length must be 1.');
    }

    return app;
}
