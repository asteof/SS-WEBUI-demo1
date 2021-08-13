import {getNumberSeries, parseInput} from "../src/task6.js";

const assert = chai.assert;

describe('TASK6', () => {
    const range1 = '22, 144';
    const range2 = '28, 122';
    const parsedRange1 = [22, 144];
    const parsedRange2 = [24, 122];
    const parsedRange3 = [18, 18];


    describe('parseInput', () => {

        it('should return app object with ok status. Parsed values omitted', () => {
            const {app} = parseInput(range1);
            delete app.fail;
            assert.deepEqual(app, {
                status: 'ok',
                reason: null
            });
        });

        it('should return app object and values parsed from string. App object is not tested', () => {
            const {length, minSquare} = parseInput(range1);
            assert.deepEqual([length, minSquare], [22, 144]);
        });

        it('should return app object and values parsed from string. App object is not tested', () => {
            const {length, minSquare} = parseInput(range2);
            assert.deepEqual([length, minSquare], [28, 122]);
        });

        it('should raise error, only 2 args 1', () => {
            const {app} = parseInput('123, 123, 123');
            delete app.fail;
            assert.deepEqual(app, {
                status: 'failed',
                reason: `You must enter two arguments`
            });
        });

        it('should raise error, only 2 args 2', () => {
            const {app} = parseInput('123');
            delete app.fail;
            assert.deepEqual(app, {
                status: 'failed',
                reason: `You must enter two arguments`
            });
        });

        it('should raise error, input is NaN 1', () => {
            const {app} = parseInput('NaN, 123');
            assert.equal(app.reason, 'Couldn\'t parse a number');
        });

        it('should raise error, input is NaN 2', () => {
            const {app} = parseInput('12345, dada');
            assert.equal(app.reason, 'Couldn\'t parse a number');
        });

        it('should raise error, length < 1', () => {
            const {app} = parseInput('0, 8888');
            assert.equal(app.reason, `Your arguments must be natural`);
        });

        it('should raise error, minSquare < 1', () => {
            const {app} = parseInput('100, 0');
            assert.equal(app.reason, `Your arguments must be natural`);
        });
    });

    describe('getNumberSeries', () => {

        it('should work correctly', () => {
            const res = getNumberSeries(parsedRange1[0], parsedRange1[1]);
            assert.deepEqual(res,
                [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33]);
        });

        it('should work correctly', () => {
            const res = getNumberSeries(parsedRange2[0], parsedRange2[1]);
            assert.deepEqual(res,
                [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35]);
        });

        it('should work correctly', () => {
            const res = getNumberSeries(parsedRange3[0], parsedRange3[1]);
            assert.deepEqual(res, [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]);
        });
    });

});
