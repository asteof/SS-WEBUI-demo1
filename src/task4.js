import {toggleError} from "../main.js";

const dom = {
    input: document.getElementById('t4-input'),
    status: document.getElementById('t4-status'),
    reason: document.getElementById('t4-reason'),
    output: document.getElementById('palindrome'),
};

export const task4 = () => {
    const input = dom.input.value;
    checkPalindrome(input);
}

export const checkPalindrome = (string) => {
    const {app, parsed} = parseInput(string);

    if (app.status === 'ok') {
        dom.input.value = parsed;
        dom.output.textContent = getLongestPalindrome(parsed);
        toggleError(dom);
    } else {
        toggleError(dom, app);
    }
}

export const getLongestPalindrome = (string) => {
    const palindromes = [];
    let stringCopy = string;

    for (let i = 0; i < string.length; i++) {
        for (let j = 0; j < stringCopy.length; j++) {
            const p = string.slice(i, j + i + 1);
            const pReverse = [...p].reverse().join('');

            if (p === pReverse && p.length > 1) {
                palindromes.push(p);
            }
        }
        stringCopy = stringCopy.slice(1);
    }

    if (palindromes.length === 0) {
        return '0';
    }

    const longestPalindrome = palindromes.reduce((a, b) => {
        const aLen = a.length;
        const bLen = b.length
        if (aLen > bLen || aLen === bLen) {
            return a;
        } else {
            return b;
        }
    });
    return longestPalindrome;
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

    const parsed = parseInt(string, 10);
    if (isNaN(parsed)) {
        app.fail(`Input must include only digits. "${ string }" is not a number`);
        return {app};
    }

    if (parsed < 10 || parsed > Number.MAX_SAFE_INTEGER) {
        app.fail(`Your number does not satisfy the condition 10 <= x <= 9007199254740991`);
        return {app};
    }
    return {app, parsed: parsed.toString()};
}
