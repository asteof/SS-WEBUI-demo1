import {calculateFibonacci, fibonacciSequenceMax, fibonacciSequenceLength, parseInput} from "../src/task7.js";

const assert = chai.assert;

describe('TASK7', () => {
    const range1 = '68, 8400';
    const range2 = '420, 242424';
    const range3 = 'l4';
    const range4 = 'L6';

    describe('parseInput', () => {

        it('should return app object with ok status. Parsed values omitted', () => {
            const {app} = parseInput(range1);
            delete app.fail;
            assert.deepEqual(app, {
                status: 'ok',
                reason: null
            });
        });

        it('should return app object and values parsed from string (min, max). App object is not tested', () => {
            const {parsed} = parseInput(range1);
            assert.deepEqual(parsed, {min: 68, max: 8400});
        });

        it('should return app object and values parsed from string (min, max). App object is not tested', () => {
            const {parsed} = parseInput(range2);
            assert.deepEqual(parsed, {min: 420, max: 242424});
        });

        it('should return app object and values parsed from string (length). App object not tested', () => {
            const {parsed} = parseInput(range4);
            assert.deepEqual(parsed, {length: 6});
        });

        it('should return app object and values parsed from string (length). App object not tested', () => {
            const {parsed} = parseInput(range3);
            assert.deepEqual(parsed, {length: 4});
        });

        it('should return {app, parsed, domText}, from input (min, max). App and values not tested', () => {
            const {domInputText} = parseInput(range1);
            assert.equal(domInputText, range1);
        });

        it('should return {app, parsed, domText}, from input (length). App and values not tested', () => {
            const {domInputText} = parseInput(range3);
            assert.equal(domInputText, range3);
        });

        it('should return {app, parsed, trimmed domText}, from input (min, max). App and values not tested', () => {
            const {domInputText} = parseInput('123, 858fafafa12');
            assert.equal(domInputText, '123, 858');
        });

        it('should return {app, parsed, trimmed     domText}, from input (length). App and values not tested', () => {
            const {domInputText} = parseInput('l4dada5');
            assert.equal(domInputText, 'l4');
        });


        it('should raise error, only 2 args 1', () => {
            const {app} = parseInput('123');
            delete app.fail;
            assert.deepEqual(app, {
                status: 'failed',
                reason: `Input cannot be parsed`
            });
        });

        it('should work correctly, 3 args instead of 2', () => {
            const {app} = parseInput('123, 123, 123');
            delete app.fail;
            assert.deepEqual(app, {
                status: 'ok',
                reason: null
            });
        });

        it('should raise error, input is NaN 1', () => {
            const {app} = parseInput('123, NaN');
            delete app.fail;
            assert.deepEqual(app, {
                status: 'failed',
                reason: `Input cannot be parsed`
            });
        });

        it('should raise error, input is NaN 2', () => {
            const {app} = parseInput('dada, 123');
            delete app.fail;
            assert.deepEqual(app, {
                status: 'failed',
                reason: `Input cannot be parsed`
            });
        });

        it('should raise error, min < 1', () => {
            const {app} = parseInput('0, 8888');
            assert.equal(app.reason, `Min value cannot be less than 1`);
        });

        it('should raise error, max > MAX_SAFE_INTEGER', () => {
            const {app} = parseInput(`100, ${ Number.MAX_SAFE_INTEGER + 1 }`);
            assert.equal(app.reason, `Max value cannot be more than 2^53-1`);
        });

        it('should raise error, length < 1', () => {
            const {app} = parseInput('l0');
            assert.equal(app.reason, `Length value cannot be less than 1`);
        });

        it('should raise error, length > 16', () => {
            const {app} = parseInput('l17');
            assert.equal(app.reason, `Length cannot be more than 16`);
        });
    });

    describe('fibonacciSequenceMax', () => {

        it('should work correctly', () => {
            const res = fibonacciSequenceMax(68, 8400);
            assert.deepEqual(res, [89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765]);
        });

        it('should work correctly', () => {
            const res = fibonacciSequenceMax(420, 242424);
            assert.deepEqual(res,
                [610, 987, 1597, 2584, 4181, 6765, 10946, 17711, 28657, 46368, 75025, 121393, 196418]);
        });

        it('should return false', () => {
            const res = fibonacciSequenceMax('128057');
            assert.equal(res, false);
        });

    });

    describe('fibonacciSequenceLength', () => {

        it('should work correctly', () => {
            const res = fibonacciSequenceLength(2);
            assert.deepEqual(res, [13, 21, 34, 55, 89]);
        });

        it('should work correctly', () => {
            const res = fibonacciSequenceLength(4);
            assert.deepEqual(res, [1597, 2584, 4181, 6765]);
        });

        it('should work correctly', () => {
            const res = fibonacciSequenceLength(6);
            assert.deepEqual(res, [121393, 196418, 317811, 514229, 832040]);
        });

    });

    describe('calculateFibonacci', () => {

        it('should work correctly', () => {
            const res = calculateFibonacci({min: 10, max: 888});
            assert.equal(res, '13, 21, 34, 55, 89, 144, 233, 377, 610');
        });

        it('should work correctly', () => {
            const res = calculateFibonacci({length: 4});
            assert.equal(res, '1597, 2584, 4181, 6765');
        });
    });
});
