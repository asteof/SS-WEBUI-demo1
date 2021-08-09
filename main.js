import {task1} from "./src/task1.js";
import {task2} from "./src/task2.js";
import {task3} from "./src/task3.js";
import {task4} from './src/task4.js';
import {task5} from './src/task5.js';
import {task6} from "./src/task6.js";
import {task7} from "./src/task7.js";

const dom = {
    task1Submit: document.getElementById('t1-submit'),
    task2Submit: document.getElementById('t2-submit'),
    task3Submit: document.getElementById('t3-submit'),
    task4Submit: document.getElementById('t4-submit'),
    task5Submit: document.getElementById('t5-submit'),
    task6Submit: document.getElementById('t6-submit'),
    task7Submit: document.getElementById('t7-submit'),
};

export const toggleError = (dom, app = false) => {
    if (app) {
        dom.status.textContent = `Status: ${ app.status.toString() };`;
        dom.reason.textContent = app.reason.toString();
        dom.output.textContent = '';
    } else {
        dom.status.textContent = '';
        dom.reason.textContent = '';
    }
}

const sizeButtons = [...document.querySelectorAll('.task-number button')];

const toggleElement2 = e => {
    const element = document.getElementById(e.target.value);
    if (parseInt(element.style.height) > 82 || parseInt(element.style.width) > 82) {
        element.style.height = '80%';
        element.style.width = '44%';
    } else {
        element.style.height = '98%';
        element.style.width = '98%';
    }
}

sizeButtons.forEach(el => {
    el.addEventListener('click', toggleElement2);
});

/**/
dom.task1Submit.addEventListener('click', task1);
dom.task2Submit.addEventListener('click', task2);
dom.task3Submit.addEventListener('click', task3);
dom.task4Submit.addEventListener('click', task4);
dom.task5Submit.addEventListener('click', task5);
dom.task6Submit.addEventListener('click', task6);
dom.task7Submit.addEventListener('click', task7);

/**/

