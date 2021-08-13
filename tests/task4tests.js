import {getLongestPalindrome, parseInput} from "../src/task4.js";

const assert = chai.assert;

describe('TASK4', () => {
    const palindrome1 = '1237557226886';
    const palindrome2 = '149658856941';
    const palindrome3 = '4224312521125';
    const palindrome4 = '1117199229917111'

    describe('parseInput', () => {

        it('should return app object with ok status. Parsed values omitted', () => {
            const {app} = parseInput(palindrome1);
            delete app.fail;
            assert.deepEqual(app, {
                status: 'ok',
                reason: null
            });
        });

        it('should return app object and values parsed from string. App object is not tested', () => {
            const {parsed} = parseInput(palindrome1);
            assert.equal(parsed, '1237557226886');
        });

        it('should return app object and values parsed from string. App object is not tested', () => {
            const {parsed} = parseInput(palindrome2);
            assert.equal(parsed, '149658856941');
        });

        it('should raise error, input is NaN', () => {
            const {app} = parseInput('NaN');
            delete app.fail;
            assert.deepEqual(app, {
                status: 'failed',
                reason: `Input must include only digits. "NaN" is not a number`
            });
        });

        it('should raise error, input is whitespace', () => {
            const {app} = parseInput(' ');
            delete app.fail;
            assert.deepEqual(app, {
                status: 'failed',
                reason: `Input must include only digits. " " is not a number`
            });
        });

        it('should raise error, number < 10', () => {
            const {app} = parseInput('9');
            delete app.fail;
            assert.deepEqual(app.reason, `Your number does not satisfy the condition 10 <= x <= 9007199254740991`);
        });

        it('should raise error, number > MAX_SAFE_INTEGER', () => {
            const {app} = parseInput((Number.MAX_SAFE_INTEGER + 1).toString());
            delete app.fail;
            assert.deepEqual(app.reason, `Your number does not satisfy the condition 10 <= x <= 9007199254740991`);
        });
    });

    describe('getLongestPalindrome', () => {

        it('should return "7557"', () => {
            const res = getLongestPalindrome(palindrome1);
            assert.equal(res, "7557");
        });

        it('should return "149658856941"', () => {
            const res = getLongestPalindrome(palindrome2);
            assert.equal(res, "149658856941");
        });

        it('should return "521125"', () => {
            const res = getLongestPalindrome(palindrome3);
            assert.equal(res, "521125");
        });

        it('should return "1117199229917111"', () => {
            const res = getLongestPalindrome(palindrome4);
            assert.equal(res, "1117199229917111");
        });

        it('should return "0", input 0', () => {
            const res = getLongestPalindrome('0');
            assert.equal(res, "0");
        });

        it('should return "0"', () => {
            const res = getLongestPalindrome('123456789');
            assert.equal(res, "0");
        });

        it('should return "0"', () => {
            const res = getLongestPalindrome('palindrome4');
            assert.equal(res, "0");
        });

    });


});
