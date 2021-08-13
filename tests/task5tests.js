import {getHappyTickets, checkTicketEasy, checkTicketHard, parseInput} from "../src/task5.js";

const assert = chai.assert;

describe('TASK5', () => {
    const range1 = '420, 696969';
    const range2 = '100000, 999999';
    const context1 = {min: 880000, max: 888888};
    const context2 = {min: 123321, max: 132231};

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
            const {context} = parseInput(range1);
            assert.deepEqual(context, {min: 420, max: 696969});
        });

        it('should return app object and values parsed from string. App object is not tested', () => {
            const {context} = parseInput(range2);
            assert.deepEqual(context, {min: 100000, max: 999999});
        });

        it('should raise error, only 2 args 1', () => {
            const {app} = parseInput('123, 123, 123');
            delete app.fail;
            assert.deepEqual(app, {
                status: 'failed',
                reason: `There can be only two arguments`
            });
        });

        it('should raise error, only 2 args 2', () => {
            const {app} = parseInput('123');
            delete app.fail;
            assert.deepEqual(app, {
                status: 'failed',
                reason: `There can be only two arguments`
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

        it('should raise error, min < 1', () => {
            const {app} = parseInput('0, 8888');
            assert.equal(app.reason, `Input does not satisfy condition 1 <= input <= 999999`);
        });

        it('should raise error, max > 1000000', () => {
            const {app} = parseInput('1, 1000000');
            assert.equal(app.reason, `Input does not satisfy condition 1 <= input <= 999999`);
        });

        it('should raise error, min < 1, max < 1', () => {
            const {app} = parseInput('0, 0');
            assert.equal(app.reason, `Input does not satisfy condition 1 <= input <= 999999`);
        });

        it('should raise error, min > 999999, max > 999999', () => {
            const {app} = parseInput('1000000, 1000000');
            assert.equal(app.reason, `Input does not satisfy condition 1 <= input <= 999999`);
        });
    });

    describe('checkTicketEasy', () => {

        it('should return true', () => {
            const res = checkTicketEasy('420024');
            assert.equal(res, true);
        });

        it('should return false', () => {
            const res = checkTicketEasy('7557');
            assert.equal(res, false);
        });

        it('should return true', () => {
            const res = checkTicketEasy('666666');
            assert.equal(res, true);
        });

        it('should return true', () => {
            const res = checkTicketEasy('128056');
            assert.equal(res, true);
        });

        it('should return false', () => {
            const res = checkTicketEasy('128057');
            assert.equal(res, false);
        });

    });

    describe('checkTicketHard', () => {

        it('should return true', () => {
            const res = checkTicketHard('1403');
            assert.equal(res, true);
        });

        it('should return true', () => {
            const res = checkTicketHard('2451');
            assert.equal(res, true);
        });

        it('should return true', () => {
            const res = checkTicketHard('650054');
            assert.equal(res, true);
        });

        it('should return false', () => {
            const res = checkTicketHard('420024');
            assert.equal(res, false);
        });

        it('should return false', () => {
            const res = checkTicketHard('7557');
            assert.equal(res, false);
        });

        it('should return false', () => {
            const res = checkTicketHard('666666');
            assert.equal(res, false);
        });
    });

    describe('getHappyTickets', () => {

        it('should work correctly', () => {
            const res = getHappyTickets(context1);
            assert.deepEqual(res, {
                winner: 'easy', tickets: {
                    countEasy: 336, countHard: 77
                }
            });
        });

        it('should work correctly', () => {
            const res = getHappyTickets(context2);
            assert.deepEqual(res, {
                winner: 'easy', tickets: {
                    countEasy: 401, countHard: 181
                }
            });
        });
    });
});
