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

export const task3 = () => {
    calculateTriangles();
}

const triangleArea = (triangle) => {
    const [vertices, a, b, c] = Object.values(triangle);

    const p = (a + b + c) / 2;
    const area = (p * (p - a) * (p - b) * (p - c)) ** (1 / 2);
    return {
        vertices,
        area,
        toString() {
            return `${ this.vertices }`;
        }
    };
}

const calculateTriangles = () => {
    if (arrayOfTriangles.length > 0) {
        const arrayOfAreas = arrayOfTriangles.map(el => triangleArea(el));
        arrayOfAreas.sort((a, b) => b.area - a.area);

        dom.output.textContent = arrayOfAreas.join(', ');
        toggleError(dom);
    }
}

const addTriangle = (string) => {
    const {app, triangle} = parseInput(string);

    if (app.status === 'ok') {
        arrayOfTriangles.push(triangle);
        // dom.array.textContent +=triangle.toString() ;
        dom.array.innerHTML += `<div> ${ triangle.toString() }  </div>`;
        toggleError(dom);
    } else {
        toggleError(dom, app);
    }
}

const parseInput = (string) => {
    const app = {
        status: 'ok',
        reason: null,
        fail(string) {
            this.status = 'failed';
            this.reason = string;
        }
    };

    const values = string.split(/,\s*/);
    const vertices = values.shift().toUpperCase();
    const sideNames = [...vertices.toLowerCase()];
    //parse string element to float
    //could use map :/
    values.forEach((el, i, arr) => arr.splice(i, 1, parseFloat(el)));

    if (vertices.length < 3 || vertices.length > 3) {
        app.fail(`${ vertices } length is not 3. Triangle name must contain only 3 letters`);
        return {app};
    }

    if (values.length < 3 || values.length > 3) {
        app.fail(`Triangle can have only 3 sides. You specified ${ values.length } sides`);
        return {app};
    }

    if (!(
        (values[0] + values[1] > values[2]) &&
        (values[1] + values[2] > values[0]) &&
        (values[0] + values[2] > values[1])
    )) {
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
        [sideNames[0]]: values[0],
        [sideNames[1]]: values[1],
        [sideNames[2]]: values[2],
        toString() {
            const ar = [];
            for (const el in this) {
                ar.push(`${ el } = ${ this[el] }`);
            }
            ar.pop();
            ar.shift();
            return `${ this.vertices }: ${ ar.join(', ') };\n`;
        }
    };

    return {app, triangle};
}

dom.clearTriangles.addEventListener('click', () => {
    arrayOfTriangles.length = 0;
    dom.array.textContent = '';
    dom.output.textContent = '';
})

dom.addTriangle.addEventListener('click', () => {
    const string = dom.input.value;
    addTriangle(string);
})