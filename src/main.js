"use strict";

const COUNT_TASK = 3;

import {templateCustomMenu} from "./components/menu.js";
import {templateCustomFilters} from "./components/filter.js"
import {templateCustomSort} from "./components/sort.js";
import {templateCustomTaskForm} from "./components/task-form.js";
import {templateCustomTask} from "./components/task.js";
import {templateCustomLoadMoreBtn} from "./components/load-more-btn";

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const main = document.querySelector(`.main`);
const contolsContainer = main.querySelector(`.main__control`);

const menu = templateCustomMenu();
const filters = templateCustomFilters();
const sort = templateCustomSort();
const taskForm = templateCustomTaskForm();
const task = templateCustomTask();
const loadMoreBtn = templateCustomLoadMoreBtn();

render(contolsContainer, menu);
render(contolsContainer, filters, `afterend`);
render(main, sort);

const boardContainer = main.querySelector(`.board`);
const taskContainer = main.querySelector(`.board__tasks`);

render(taskContainer, taskForm, `afterbegin`);

for (let i = 0; i < COUNT_TASK; i++) {
  render(taskContainer, task);
}

render(boardContainer, loadMoreBtn);
