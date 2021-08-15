import {toggleError} from "../main.js";

const dom = {
    input: document.getElementById('t3-input'),
    status: document.getElementById('t3-status'),
    reason: document.getElementById('t3-reason'),
    output: document.getElementById('triangles'),
    addTriangle: document.getElementById('t3-add'),
    clearTriangles: document.getElementById('t3-clear'),
    array: document.getElementById('t3-array'),
    calculateTriangles: document.getElementById('t3-submit'),
};

const arrayOfTriangles = [];

export const parseInput = (string) => {
    const app = {
        status: 'ok',
        reason: null,
        fail(string) {
            this.status = 'failed';
            this.reason = string;
        }
    };

    if (typeof string !== 'string') {
        app.fail(`Input is not a string`);
        return {app};
    }

    const triangleData = string.split(/,\s*/);
    const vertices = triangleData.shift().toUpperCase();
    const sideNames = [...vertices.toLowerCase()];
    //parse string to float
    //triangleData.forEach((el, i, arr) => arr[i] = parseFloat(el));
    const sides = triangleData.map(el => parseFloat(el));

    const verticesLength = vertices.length;
    const sidesLength = sides.length;

    if (verticesLength < 3 || verticesLength > 3) {
        app.fail(`${ vertices } length is not 3. Triangle name must contain only 3 letters`);
        return {app};
    }

    if (sidesLength < 3 || sidesLength > 3) {
        app.fail(`Triangle can have only 3 sides. You specified ${ sidesLength } sides`);
        return {app};
    }

    for (let i = 0; i < sidesLength; i++) {
        if (isNaN(sides[i])) {
            app.fail(`${ triangleData[i] } is not a number`);
            return {app};
        }
    }

    if (!((sides[0] + sides[1] > sides[2]) &&
        (sides[1] + sides[2] > sides[0]) &&
        (sides[0] + sides[2] > sides[1]))) {
        app.fail(`Triangle can exist only if sum of its 2 sides is greater than 3rd side`);
        return {app};
    }

    arrayOfTriangles.forEach(el => {
        if (el.vertices === vertices) {
            app.fail(`Triangle with this name already exists. Please, specify other name`);
            return {app};
        }
    })

    if (new Set(sideNames).size < 3) {
        app.fail(`Each vertex must be named differently`);
        return {app};
    }

    sideNames.forEach(el => {
        const reg = /[a-z]/i;
        if (!reg.exec(el)) {
            app.fail('Vertex name can only be latin letter (A-Z) case insensitive');
            return {app};
        }
    })

    const triangle = {
        vertices,
        [sideNames[0]]: sides[0],
        [sideNames[1]]: sides[1],
        [sideNames[2]]: sides[2],
        toString() {
            const sides = Object.values(this).slice(1, 4);
            return `${ this.vertices }: ${ sides.join(', ') };\n`;
        }
    };

    return {app, triangle};
}

export const triangleArea = (triangle) => {
    const [vertices, a, b, c] = Object.values(triangle);

    const p = (a + b + c) / 2;
    const area = Math.trunc((p * (p - a) * (p - b) * (p - c)) ** (1 / 2));
    return {
        vertices,
        area,
        toString() {
            return this.vertices;
        }
    };
    // return `${ this.vertices }: area`;
}

const calculateTriangles = () => {
    if (arrayOfTriangles.length > 0) {
        const triangleAreas = arrayOfTriangles.map(el => triangleArea(el));
        triangleAreas.sort((a, b) => b.area - a.area);

        dom.output.textContent = triangleAreas.join(', ');
        toggleError(dom);
    }
}

const addTriangle = (input) => {
    const {app, triangle} = parseInput(input);

    if (app.status === 'ok') {
        arrayOfTriangles.push(triangle);
        dom.array.innerHTML += `<div> ${ triangle.toString() } </div>`;
        toggleError(dom);
    } else {
        toggleError(dom, app);
    }
}

export const task3 = () => {
    calculateTriangles();
}

dom.clearTriangles.addEventListener('click', () => {
    arrayOfTriangles.length = 0;
    dom.array.textContent = '';
    dom.output.textContent = '';
})

dom.addTriangle.addEventListener('click', () => {
    const input = dom.input.value;
    addTriangle(input);
})