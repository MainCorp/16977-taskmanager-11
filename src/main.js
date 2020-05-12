const COUNT_TASK = 22;
const SHOW_TASK_ON_START = 8;
const SHOW_TASK_BT_BTN = 8;

import {
  generateTaskList
} from "./mock/task.js";
import {
  createCustomFilter
} from "./mock/filter.js";

import {
  templateCustomMenu
} from "./components/menu.js";
import {
  templateCustomFilters
} from "./components/filter.js";
import {
  templateCustomSort
} from "./components/sort.js";
import {
  templateCustomTaskEditForm
} from "./components/task-edit-form.js";
import {
  templateCustomTask
} from "./components/task.js";
import {
  templateCustomLoadMoreBtn
} from "./components/load-more-btn";

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const main = document.querySelector(`.main`);
const contolsContainer = main.querySelector(`.main__control`);

const tasks = generateTaskList(COUNT_TASK);

render(contolsContainer, templateCustomMenu());
render(contolsContainer, templateCustomFilters(tasks, createCustomFilter), `afterend`);
render(main, templateCustomSort());

const boardContainer = main.querySelector(`.board`);
const taskContainer = main.querySelector(`.board__tasks`);

render(taskContainer, templateCustomTaskEditForm(tasks[0]), `afterbegin`);

let showTaskCount = SHOW_TASK_ON_START;

tasks.slice(1, showTaskCount).forEach((item) => {
  render(taskContainer, templateCustomTask(item));
});

render(boardContainer, templateCustomLoadMoreBtn());

const loadMoreBtn = document.querySelector(`.load-more`);

if (loadMoreBtn) {
  loadMoreBtn.addEventListener(`click`, () => {
    const prevTaskCount = showTaskCount;
    showTaskCount = showTaskCount + SHOW_TASK_BT_BTN;

    tasks.slice(prevTaskCount, showTaskCount).forEach((item) => {
      render(taskContainer, templateCustomTask(item));
    });

    if (showTaskCount >= tasks.length) {
      loadMoreBtn.remove();
    }
  });
}
