const validCurrentFilter = (tasks, name) => {
  let num;

  switch (name) {
    case `all`:
      num = tasks.length;
      break;
    case `overdue`:
      const sumDeadlineDay = tasks.filter((task) => {
        const isDate = task.dueDate instanceof Date;

        if (isDate && !!task.dueDate) {
          return task.dueDate < new Date();
        } else {
          return false;
        }
      });

      num = sumDeadlineDay.length;
      break;
    case `today`:
      const sumToday = tasks.filter((task) => {
        const isDate = task.dueDate instanceof Date;

        if (isDate && !!task.dueDate) {
          return (task.dueDate).toLocaleDateString() === (new Date()).toLocaleDateString();
        } else {
          return false;
        }
      });
      num = sumToday.length;
      break;
    case `favorites`:
      num = tasks.filter((task) => task.isFavorite).length;
      break;
    case `repeating`:
      num = tasks.filter((task) => Object.values(task.repeatingDays).some(Boolean)).length;
      break;
    case `archive`:
      num = tasks.filter((task) => task.isArchive).length;
      break;
    default:
      return 0;
  }

  return num;
};

const createFilter = (tasks, filters, filterValid) => {
  return filters.map((filter) => {
    const name = filter.name;

    return (`
      <input
        type="radio"
        id="filter__${name}"
        class="filter__input visually-hidden"
        name="filter"
        ${name === `all` ? `checked` : ``}
      />
      <label for="filter__${name}" class="filter__label">
        ${name}
        <span class="filter__${name}-count">
          ${filterValid(tasks, name)}
        </span>
      </label>
        `);
  }).join(`\n`);
};

const templateCustomFilters = (tasks, filters) => {
  return (`
    <section class="main__filter filter container">
      ${createFilter(tasks, filters(), validCurrentFilter)}
    </section>
  `);
};

export {
  templateCustomFilters
};
