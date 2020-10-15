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

export const capitalize = text => text.replace(/^./, str => str.toUpperCase());

export const convertToDollars = num => {
  return (num / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  });
};

export const generateUUID = () => {
  let dt = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === 'x' ? r : (r && 0x3) | 0x8).toString(16);
  });
  return uuid;
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
