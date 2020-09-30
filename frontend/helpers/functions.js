export const calculateCategoryWeight = category => category.items.reduce((sum, elem) => sum + +elem.weight, 0);

export const calculatePackWeights = pack => {
  const data = { total: 0, base: 0, worn: 0, consumable: 0 };

  pack.categories.forEach(cat => {
    cat.items.forEach(item => {
      if (!item.consumable && !item.worn) {
        data.base += item.weight;
      } else if (item.worn) {
        data.worn += item.weight;
      } else if (item.consumable) {
        data.consumable += item.weight;
      }

      data.total += item.weight;
    });
  });
  return data;
};

export const totalItemsInPack = pack => {
  let total = 0;
  if (!pack.categories) { return total; }

  pack.categories.forEach(category => {
    if (category.items) {
      total += category.items.length;
    }
  });
  return total;
};
