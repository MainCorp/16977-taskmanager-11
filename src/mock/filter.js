const filterNames = [`all`, `overdue`, `today`, `favorites`, `repeating`, `archive`];

const createCustomFilter = () => {
  return filterNames.map((name) => {
    return {
      name,
      count: ``,
    };
  });
};

export {
  createCustomFilter
};
