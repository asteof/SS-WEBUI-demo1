import {toggleError} from "../main.js";

const dom = {
    input: document.getElementById('t4-input'),
    status: document.getElementById('t4-status'),
    reason: document.getElementById('t4-reason'),
    output: document.getElementById('palindrome'),
}

export const task4 = () => {
    const string = dom.input.value;
    checkPalindrome(string);
}

export const checkPalindrome = (string) => {
    const {app, parsed} = validateInput(string);
    string = parsed;

    if (app.status === 'ok') {
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

        if (palindromes.length !== 0) {
            const longestPalindrome = palindromes.reduce((a, b) => {
                if (a.length > b.length) {
                    return a;
                } else if (a.length === b.length) {
                    return a;
                } else return b
            });
            dom.output.textContent = longestPalindrome.toString();
        } else {
            dom.output.textContent = '0';
        }

        toggleError(dom);
    } else {
        toggleError(dom, app)
    }
}

const validateInput = (string) => {
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
        app.fail(`Input must include only digits. "${ string }" contains non digits`);
        return {app};
    }

    if (parsed < 10 || parsed > Number.MAX_SAFE_INTEGER) {
        app.fail(`Your number does not satisfy the condition 10 <= x <= 9007199254740991`);
        return {app};
    }
    dom.input.value = parsed.toString();
    return {app, parsed: parsed.toString()};
}
