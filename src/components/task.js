import {
  MONTHS
} from "../const.js";

const templateCustomTask = (data) => {
  const description = data.description;
  const color = data.color;
  const stateArchiveBtn = data.isArchive ? `` : `card__btn--disabled`;
  const stateFavoriteBtn = data.isFavorite ? `` : `card__btn--disabled`;
  const repeatingDays = data.repeatingDays;

  const isDate = data.dueDate instanceof Date;

  const date = !!data.dueDate && isDate ? `${data.dueDate.getDate()} ${MONTHS[data.dueDate.getMonth()]}` : ``;
  const time = !!data.dueDate && isDate ? `${data.dueDate.getHours()}:${data.dueDate.getMinutes()}` : ``;

  const isDeadline = isDate && data.dueDate < Date.now() ? `card--deadline` : ``;
  const isRepeat = Object.values(repeatingDays).some(Boolean) ? `card--repeat` : ``;

  return (`
    <article class="card card--${color} ${isRepeat} ${isDeadline}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button" class="card__btn card__btn--archive ${stateArchiveBtn}">
              archive
            </button>
            <button
              type="button"
              class="card__btn card__btn--favorites ${stateFavoriteBtn}"
            >
              favorites
            </button>
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <p class="card__text">${description}</p>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <div class="card__date-deadline">
                  <p class="card__input-deadline-wrap">
                    <span class="card__date">${date}</span>
                    <span class="card__time">${time}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  `);
};

export {
  templateCustomTask
};
