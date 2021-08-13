import {generateString, parseInput} from "../src/task1.js";

mocha.setup("bdd");
const assert = chai.assert;

describe('TASK1', () => {


    describe('parseInput', () => {

        it('should return app object and values parsed from string. App object is not tested', () => {
            const {parsed} = parseInput('5', '5', '*');
            assert.deepEqual(parsed, {length: 5, width: 5, symbol: '*'});
        });

        it('should return app object with ok status. Parsed values omitted', () => {
            const {app} = parseInput('5', '5', '*');
            delete app.fail;
            assert.deepEqual(app, {
                status: 'ok',
                reason: null
            });
        });

        it('should parse length and width as integers', () => {
            const {parsed} = parseInput(5, 5, '*');
            assert.deepEqual(parsed, {length: 5, width: 5, symbol: '*'});
        });

        it('should raise error, length is NaN', () => {
            const {app} = parseInput('', '5', '*');
            delete app.fail;
            assert.deepEqual(app, {
                status: 'failed',
                reason: "Type error: \nLength and width must be numbers"
            });
        });

        it('should raise error, width is NaN', () => {
            const {app} = parseInput('5', '', '*');
            delete app.fail;
            assert.deepEqual(app, {
                status: 'failed',
                reason: "Type error: \nLength and width must be numbers",
            });
        });

        it('should raise error, length and width are NaN', () => {
            const {app} = parseInput('', '', '*');
            delete app.fail;
            assert.deepEqual(app, {
                status: 'failed',
                reason: 'Type error: \nLength and width must be numbers',
            });
        });

        it('should raise error, symbol is not string', () => {
            const {app} = parseInput('5', '5', true);
            delete app.fail;
            assert.deepEqual(app, {
                status: 'failed',
                reason: 'Type error: \nSymbol must be string',
            });
        });

        it('should raise error, length < 1', () => {
            const {app} = parseInput('0', '5', '*');
            delete app.fail;
            assert.deepEqual(app, {
                status: 'failed',
                reason: 'Out of boundaries: \nLength and width must be between 0 and 20',
            });
        });

        it('should raise error, length > 20', () => {
            const {app} = parseInput('21', '5', '*');
            delete app.fail;
            assert.deepEqual(app, {
                status: 'failed',
                reason: 'Out of boundaries: \nLength and width must be between 0 and 20',
            });
        });

        it('should raise error, width < 1', () => {
            const {app} = parseInput('5', '0', '*');
            delete app.fail;
            assert.deepEqual(app, {
                status: 'failed',
                reason: 'Out of boundaries: \nLength and width must be between 0 and 20',
            });
        });

        it('should raise error, width > 20', () => {
            const {app} = parseInput('5', '21', '*');
            delete app.fail;
            assert.deepEqual(app, {
                status: 'failed',
                reason: 'Out of boundaries: \nLength and width must be between 0 and 20',
            });
        });

        it('should raise error, symbol.length < 1', () => {
            const {app} = parseInput('5', '5', '');
            delete app.fail;
            assert.deepEqual(app, {
                status: 'failed',
                reason: 'Out of boundaries: \nSymbol\'s length must be 1',
            });
        });

        it('should raise error, symbol.length > 1', () => {
            const {app} = parseInput('5', '5', '');
            delete app.fail;
            assert.deepEqual(app, {
                status: 'failed',
                reason: 'Out of boundaries: \nSymbol\'s length must be 1',
            });
        });

    })


    describe('generateString', () => {

        it('should return single symbol, new line, space', () => {
            const result = generateString('1', '1', '*');
            assert.equal(result, '*\n ');
        });

        it('should work correctly (2*2)', () => {
            const result = generateString('2', '2', '*');
            assert.equal(result, `* *\n * *\n`);

        });

        it('should work correctly (5*5)', () => {
            const result = generateString('5', '5', '*');
            assert.equal(result, '* * * * *\n * * * * *\n* * * * *\n * * * * *\n* * * * *\n ');
        });

        it('should return empty string', () => {
            const result = generateString('0', '5', '*');
            assert.equal(result, '');
        });

        it('should return empty string', () => {
            const result = generateString('5', '0', '*');
            assert.equal(result, '');
        });

        it('should work correctly', () => {
            const result = generateString('2', '2', '');
            assert.equal(result, ' \n  \n');
        });

    });
})

mocha.run();