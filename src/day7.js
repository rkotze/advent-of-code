const { fileReader } = require("./file-reader");

function puzzle1() {
  const data = fileReader("day7.txt");
  const bagsOfBags = data.split("\n");
  const baggage = buildBaggage(bagsOfBags);
  let count = 0;
  for (const lookInBag of Object.keys(baggage)) {
    if (hasShinyGold(baggage, lookInBag)) count++;
  }
  return count;
}

function hasShinyGold(baggage, lookIn) {
  const innerBags = baggage[lookIn];
  if (innerBags) {
    if (innerBags.join(" ").includes("shiny gold bag")) {
      return true;
    } else {
      const look = [];
      for (const innerBag of innerBags) {
        const { name } = getBagInfo(innerBag);
        look.push(hasShinyGold(baggage, name));
      }
      return look.some((val) => val);
    }
  }

  return false;
}

function puzzle2() {
  const data = fileReader("day7.txt");
  const bagsOfBags = data.split("\n");

  return sumBags(buildBaggage(bagsOfBags)) - 1; // minus the gold bag
}

function sumBags(baggage, lookIn = "shiny gold bag") {
  const innerBags = baggage[lookIn];
  let total = 1;
  if (innerBags) {
    for (const bagTotal of innerBags) {
      const { count, name } = getBagInfo(bagTotal);

      total += Number(count) * sumBags(baggage, name);
    }
  }

  return total;
}

function getBagInfo(bagTotal) {
  const [, count, name] = bagTotal.match(/(\d+)\s([a-z\s]+)/i);
  return {
    count,
    name,
  };
}

function buildBaggage(bagsOfBags) {
  const baggage = {};

  for (const bagsList of bagsOfBags) {
    const [containerBag, innerBags] = bagsList.split(" contain ");
    const bag = containerBag.slice(0, containerBag.length - 1);
    if (!innerBags) return "Empty error: " + bagsList;

    const childBag = innerBags
      .match(/([0-9a-z\s]+)bag/gi)
      .map((bag) => bag.trim());
    if (!baggage[bag]) {
      if (childBag.includes("no other bag")) {
        baggage[bag] = [];
      } else {
        baggage[bag] = childBag;
      }
    }
  }
  return baggage;
}

console.log(puzzle1());
console.log(puzzle2());
