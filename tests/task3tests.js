import {triangleArea, parseInput} from "../src/task3.js";

const assert = chai.assert;

describe('TASK3', () => {
    const inputTr1 = 'ABC, 3, 4, 5';
    const inputTr2 = 'ABD, 8, 5, 8';

    describe('parseInput', () => {

        it('should return app object with ok status. Parsed values omitted', () => {
            const {app} = parseInput(inputTr1);
            delete app.fail;
            assert.deepEqual(app, {
                status: 'ok',
                reason: null
            });
        });

        it('should return app object and values parsed from string. App object is not tested', () => {
            const {triangle} = parseInput(inputTr1);
            delete triangle.toString;
            assert.deepEqual(
                triangle,
                {
                    vertices: 'ABC',
                    a: 3,
                    b: 4,
                    c: 5
                });
        });

        it('should return app object and values parsed from string. App object is not tested', () => {
            const {triangle} = parseInput(inputTr2);
            delete triangle.toString;
            assert.deepEqual(
                triangle,
                {
                    vertices: 'ABD',
                    a: 8,
                    b: 5,
                    d: 8
                });
        });

        it('should raise error, vertices.length < 3', () => {
            const tr = 'AB, 3, 4, 5';
            const {app} = parseInput(tr);
            delete app.fail;
            assert.deepEqual(app, {
                status: 'failed',
                reason: `AB length is not 3. Triangle name must contain only 3 letters`
            });
        });

        it('should raise error, vertices.length > 3', () => {
            const tr = 'ABCD, 3, 4, 5';
            const {app} = parseInput(tr);
            delete app.fail;
            assert.deepEqual(app, {
                status: 'failed',
                reason: `ABCD length is not 3. Triangle name must contain only 3 letters`
            });
        });

        it('should raise error, input is not a string', () => {
            const tr = 1617;
            const {app} = parseInput(tr);
            assert.equal(app.reason, `Input is not a string`);
        });

        it('should raise error, triangle must have 3 sides 1', () => {
            const tr = 'ABC, 3, 4';
            const {app} = parseInput(tr);
            assert.equal(app.reason, `Triangle can have only 3 sides. You specified 2 sides`);
        });

        it('should raise error, side value is not a number 2', () => {
            const tr = 'ABC, 3, fff, 4';
            const {app} = parseInput(tr);
            assert.equal(app.reason, `fff is not a number`);
        });

        it('should raise error, side value is not a number 3', () => {
            const tr = 'ABC, 3, 4, fff';
            const {app} = parseInput(tr);
            assert.equal(app.reason, `fff is not a number`);
        });

        it('should raise error, triangle must have 3 sides 2', () => {
            const tr = 'ABC, 3, 4, 8, 8';
            const {app} = parseInput(tr);
            assert.equal(app.reason, `Triangle can have only 3 sides. You specified 4 sides`);
        });

        it('should raise error, triangle is not triangle 1', () => {
            const tr = 'ABC, 3, 4, 8';
            const {app} = parseInput(tr);
            assert.equal(app.reason, `Triangle can exist only if sum of its 2 sides is greater than 3rd side`);
        });

        it('should raise error, triangle is not triangle 2', () => {
            const tr = 'ABC, 3, 4, 7';
            const {app} = parseInput(tr);
            assert.equal(app.reason, `Triangle can exist only if sum of its 2 sides is greater than 3rd side`);
        });

        it('should raise error, triangle is not triangle 3', () => {
            const tr = 'ABC, 6, 14, 6';
            const {app} = parseInput(tr);
            assert.equal(app.reason, `Triangle can exist only if sum of its 2 sides is greater than 3rd side`);
        });

        it('should raise error, triangle is not triangle 4', () => {
            const tr = 'ABC, 20, 8, 6';
            const {app} = parseInput(tr);
            assert.equal(app.reason, `Triangle can exist only if sum of its 2 sides is greater than 3rd side`);
        });


        it('should raise error, non unique vertices 1', () => {
            const tr = 'ABA, 3, 4, 5';
            const {app} = parseInput(tr);
            assert.equal(app.reason, `Each vertex must be named differently`);
        });

        it('should raise error, non unique vertices 2', () => {
            const tr = 'AAA, 3, 4, 5';
            const {app} = parseInput(tr);
            assert.equal(app.reason, `Each vertex must be named differently`);
        });

        it('should raise error, non unique vertices 3', () => {
            const tr = 'AAB, 3, 4, 5';
            const {app} = parseInput(tr);
            assert.equal(app.reason, `Each vertex must be named differently`);
        });

        it('should raise error, vertex name not A-Z 1', () => {
            const string = 'AB2, 3, 4, 5';
            const {app} = parseInput(string);
            assert.deepEqual(app.reason, 'Vertex name can only be latin letter (A-Z) case insensitive');
        });

        it('should raise error, vertex name not A-Z 2', () => {
            const string = '3A2, 3, 4, 5';
            const {app} = parseInput(string);
            assert.deepEqual(app.reason, 'Vertex name can only be latin letter (A-Z) case insensitive');
        });

        it('should raise error, vertex name not A-Z 3', () => {
            const tr = '612, 3, 4, 5';
            const {app} = parseInput(tr);
            assert.deepEqual(app.reason, 'Vertex name can only be latin letter (A-Z) case insensitive');
        });

    });

    describe('triangleArea', () => {
        const triangle1 = {vertices: 'ABC', a: 3, b: 4, c: 5};
        const triangle2 = {vertices: 'ADC', a: 12, d: 10, c: 7};
        const triangle3 = {vertices: 'DBC', d: 27.941, b: 35.489, c: 23.868};
        const triangle4 = {vertices: 'DAC', d: 22, b: 22, c: 22};

        it('should return 6', () => {
            const result = triangleArea(triangle1);
            delete result.toString;
            assert.deepEqual(result, {vertices: 'ABC', area: 6})
        });

        it('should return 34', () => {
            const result = triangleArea(triangle2);
            delete result.toString;
            assert.deepEqual(result, {vertices: 'ADC', area: 34})
        });

        it('should return 332', () => {
            const result = triangleArea(triangle3);
            delete result.toString;
            assert.deepEqual(result, {vertices: 'DBC', area: 332})
        });

        it('should return 209', () => {
            const result = triangleArea(triangle4);
            delete result.toString;
            assert.deepEqual(result, {vertices: 'DAC', area: 209})
        });

    });

    describe('calculateTriangles', () => {
        const area1 = {
            vertices: 'ABC', area: 6,
            toString() {
                return `${ this.vertices }`;
            }
        };
        const area2 = {
            vertices: 'ADC', area: 34, toString() {
                return `${ this.vertices }`;
            }
        };
        const area3 = {
            vertices: 'DBC', area: 332, toString() {
                return `${ this.vertices }`;
            }
        };
        const area4 = {
            vertices: 'DAC', area: 209, toString() {
                return `${ this.vertices }`;
            }
        };

        const calculateTriangles = (areas) => {
            areas.sort((a, b) => b.area - a.area);
            return areas.join(', ');
        }

        it('should return "DBC, DAC, ADC, ABC"',  ()=> {
            const res = calculateTriangles([area1, area2, area3, area4]);
            assert.equal(res, "DBC, DAC, ADC, ABC");
        });

        it('should return "ADC, ABC"',  ()=> {
            const res = calculateTriangles([area1, area2]);
            assert.equal(res, "ADC, ABC");
        });

        it('should return "ADC, ABC"',  ()=> {
            const res = calculateTriangles([area3, area2]);
            assert.equal(res, "DBC, ADC");
        });
    })

});
