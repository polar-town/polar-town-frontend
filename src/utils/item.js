const itemCounter = {
  PolarBear: 0,
  Penguin: 0,
  Seal: 0,
  Igloo: 0,
  Flower: 0,
};

function countItem(item, shouldClear) {
  if (shouldClear) {
    Object.keys(itemCounter).forEach((item) => {
      itemCounter[item] = 0;
    });

    return;
  }

  if (item.name === "PolarBear") {
    itemCounter.PolarBear = itemCounter.PolarBear + 1;
  }
  if (item.name === "Penguin") {
    itemCounter.Penguin = itemCounter.Penguin + 1;
  }
  if (item.name === "Seal") {
    itemCounter.Seal = itemCounter.Seal + 1;
  }
  if (item.name === "Igloo") {
    itemCounter.Igloo = itemCounter.Igloo + 1;
  }
  if (item.name === "Flower") {
    itemCounter.Flower = itemCounter.Flower + 1;
  }
}

export { countItem, itemCounter };
