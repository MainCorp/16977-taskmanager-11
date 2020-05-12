import {
  COLORS
} from "../const.js";

const collectionDescriptions = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`,
];

const collectionRepeatingDays = {
  mo: Math.random() > 0.5,
  tu: Math.random() > 0.5,
  we: Math.random() > 0.5,
  th: Math.random() > 0.5,
  fr: Math.random() > 0.5,
  sa: Math.random() > 0.5,
  su: Math.random() > 0.5,
};

const getRandomNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getRandomDate = () => {
  const currentDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const someDays = sign * getRandomNumber(0, 7);

  currentDate.setDate(currentDate.getDate() + someDays);

  return currentDate;
};

const generateTask = () => {
  const dueDate = (Math.random() > 0.5) ? null : getRandomDate();

  return {
    description: collectionDescriptions[getRandomNumber(0, collectionDescriptions.length)],
    dueDate,
    repeatingDays: collectionRepeatingDays,
    color: COLORS[getRandomNumber(0, COLORS.length)],
    isFavorite: Math.random() > 0.5,
    isArchive: Math.random() > 0.5,
  };
};

const generateTaskList = (count) => {
  return new Array(count).fill(``).map(generateTask);
};

export {
  generateTaskList
};
