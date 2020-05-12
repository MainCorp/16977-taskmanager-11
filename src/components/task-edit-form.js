import {
  MONTHS,
  COLORS,
  DAYS
} from "../const.js";

const createRepeatDays = (days, repeatingDays) => {
  return days.map((day, index) => {
    const isChecked = repeatingDays[day];

    return (`
      <input
        class="visually-hidden card__repeat-day-input"
        type="checkbox"
        id="repeat-${day}-${index}"
        name="repeat"
        value="${day}"
        ${isChecked ? `checked` : ``}
      />
      <label class="card__repeat-day" for="repeat-${day}-${index}"
        >${day}</label
      >
      `);
  }).join(`\n`);
};

const createColols = (colors, currentColor) => {
  return colors.map((color, index) => {
    return (`
      <input
        type="radio"
        id="color-${color}-${index}"
        class="card__color-input card__color-input--${color} visually-hidden"
        name="color"
        value="${color}"
        ${currentColor === color ? `checked` : ``}
      />
      <label
        for="color-black-4"
        class="card__color card__color--${color}"
        >${color}</label
      >
      `);
  }).join(`\n`);
};

const templateCustomTaskEditForm = (data) => {
  const {
    description,
    dueDate,
    repeatingDays,
    color
  } = data;

  const isDate = dueDate instanceof Date;
  const isRepeatDay = Object.values(repeatingDays).some(Boolean);

  const date = !!dueDate && isDate ? `${dueDate.getDate()} ${MONTHS[dueDate.getMonth()]}` : ``;
  const time = !!dueDate && isDate ? `${dueDate.getHours()}:${dueDate.getMinutes()}` : ``;

  const isDeadline = isDate && data.dueDate < Date.now() ? `card--deadline` : ``;
  const isRepeat = isRepeatDay ? `card--repeat` : ``;

  return (`
      <article class="card card--edit card--${color} ${isRepeat} ${isDeadline}">
        <form class="card__form" method="get">
          <div class="card__inner">
            <div class="card__color-bar">
              <svg class="card__color-bar-wave" width="100%" height="10">
                <use xlink:href="#wave"></use>
              </svg>
            </div>

            <div class="card__textarea-wrap">
              <label>
                <textarea
                  class="card__text"
                  placeholder="Start typing your text here..."
                  name="text"
                >${description}</textarea>
              </label>
            </div>

            <div class="card__settings">
              <div class="card__details">
                <div class="card__dates">
                  <button class="card__date-deadline-toggle" type="button">
                    date: <span class="card__date-status">${date ? `yes` : `no`}</span>
                  </button>
                  ${date ? `<fieldset class="card__date-deadline">
                    <label class="card__input-deadline-wrap">
                      <input
                        class="card__date"
                        type="text"
                        placeholder=""
                        name="date"
                        value="${date} ${time}"
                      />
                    </label>
                  </fieldset>` : ``}
                  <button class="card__repeat-toggle" type="button">
                    repeat:<span class="card__repeat-status">${isRepeatDay ? `yes` : `no`}</span>
                  </button>

                  <fieldset class="card__repeat-days">
                    <div class="card__repeat-days-inner">
                    ${isRepeatDay ? createRepeatDays(DAYS, repeatingDays) : ``}
                    </div>
                  </fieldset>
                </div>
              </div>

              <div class="card__colors-inner">
                <h3 class="card__colors-title">Color</h3>

                <div class="card__colors-wrap">
                  ${createColols(COLORS, color)}
                </div>
              </div>
            </div>

            <div class="card__status-btns">
              <button class="card__save" type="submit">save</button>
              <button class="card__delete" type="button">delete</button>
            </div>
          </div>
        </form>
      </article>
  `);
};

export {
  templateCustomTaskEditForm
};