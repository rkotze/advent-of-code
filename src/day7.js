const { fileReader } = require("./file-reader");

function puzzle1() {
  const data = fileReader("day7.txt");
  const bagsOfBags = data.split("\n");
  const baggage = {};

  for (const bagsList of bagsOfBags) {
    const [containerBag, innerBags] = bagsList.split(" contain ");
    const bag = containerBag.slice(0, containerBag.length - 1);
    if (!innerBags) return "Empty error: " + bagsList;

    const childBag = innerBags
      .match(/([a-z\s]+)bag/gi)
      .map((bag) => bag.trim());
    if (!baggage[bag]) {
      if (childBag.includes("no other bag")) {
        baggage[bag] = [];
      } else {
        baggage[bag] = childBag;
      }
    }
  }
  let count = 0;
  for (const lookInBag of Object.keys(baggage)) {
    if (hasShinyGold(baggage, lookInBag)) count++;
  }
  return count;
}

function hasShinyGold(baggage, lookIn) {
  const innerBags = baggage[lookIn];
  if (innerBags) {
    if (innerBags.includes("shiny gold bag")) {
      return true;
    } else {
      const look = [];
      for (const innerBag of innerBags) {
        look.push(hasShinyGold(baggage, innerBag));
      }
      return look.some((val) => val);
    }
  }

  return false;
}

console.log(puzzle1());
