import {calculateAreas, parseInput} from "../src/task2.js";

const assert = chai.assert;

describe('TASK2', () => {
    describe('parseInput', () => {
        const STRING_OK = '1,6,1,7'

        it('should return app object and values parsed from string. App object is not tested', () => {
            const {en1} = parseInput(STRING_OK);
            assert.deepEqual(en1, {l: 1, w: 6});
        });

        it('should return app object and values parsed from string. App object is not tested', () => {
            const {en2} = parseInput(STRING_OK);
            assert.deepEqual(en2, {l: 1, w: 7});
        });

        it('should return app object with ok status. Parsed values omitted', () => {
            const {app} = parseInput(STRING_OK);
            delete app.fail;
            assert.deepEqual(app, {
                status: 'ok',
                reason: null
            });
        });

        it('should raise error, input.length < 7', () => {
            const string = '1,6,1,'
            const {app} = parseInput(string);
            delete app.fail;
            assert.deepEqual(app, {
                status: 'failed',
                reason: `${ string } is not a string or string length is less than 7`
            });
        });

        it('should raise error, input is not a string', () => {
            const string = 1617
            const {app} = parseInput(string);
            delete app.fail;
            assert.deepEqual(app, {
                status: 'failed',
                reason: `${ string } is not a string or string length is less than 7`
            });
        });

        it('should raise error', () => {
            const {app} = parseInput('1 6, 1,7');
            delete app.fail;
            assert.deepEqual(app, {
                status: 'failed',
                reason: 'Values must be separated by commas',
            });
        });

        it('should raise error', () => {
            const {app} = parseInput('1 6 1 7');
            delete app.fail;
            assert.deepEqual(app, {
                status: 'failed',
                reason: 'Values must be separated by commas',
            });
        });

        it('should raise error, `s` is not a number', () => {
            const string = 's,6,1,7'
            const {app} = parseInput(string);
            delete app.fail;
            assert.deepEqual(app, {
                status: 'failed',
                reason: `Type error: s is not a number!`,
            });
        });

        it('should raise error, input <= 0', () => {
            const string = '0,6,1,7'
            const {app} = parseInput(string);
            delete app.fail;
            assert.deepEqual(app, {
                status: 'failed',
                reason: `Out of boundaries: 0 dissatisfies 0 < x < 1000000 condition`,
            });
        });

        it('should raise error, input > 1000000', () => {
            const string = '1,6,1000004,7'
            const {app} = parseInput(string);
            delete app.fail;
            assert.deepEqual(app, {
                status: 'failed',
                reason: `Out of boundaries: 1000004 dissatisfies 0 < x < 1000000 condition`,
            });
        });

    });

    describe('calculateAreas', () => {
        const en1 = {l: 12, w: 10};
        const en2 = {l: 8, w: 5};

        it('should return 2', () => {
            const result = calculateAreas(en1, en2);
            assert.equal(result, 2);
        });

        it('should return 1', () => {
            const result = calculateAreas({l:4, w:3}, en2);
            assert.equal(result, 1);
        });

        it('should return 0', () => {
            const result = calculateAreas(en2, en2);
            assert.equal(result, 0);
        });

        it('should return 0, l1 is NaN', () => {
            const result = calculateAreas({l: NaN, w: 4}, en2);
            assert.equal(result, 0);
        });

        it('should return 0, all values are NaN', () => {
            const result = calculateAreas({l: NaN, w: NaN}, {l: NaN, w: NaN});
            assert.equal(result, 0);
        });

        it('should return 0, l1 and w1 are strings', () => {
            const result = calculateAreas({l: 'fasfaf', w: 'dsaadad'}, en2);
            assert.equal(result, 0);
        });

    });


})