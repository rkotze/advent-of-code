const { readPuzzle } = require("../file-reader");

function priority(char) {
  const list = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return list.indexOf(char) + 1;
}

function puzzle1() {
  const data = readPuzzle("2022", "day3.txt");
  let total = 0;
  for (const bag of data) {
    const first = bag.substring(0, bag.length / 2).split("");
    const second = bag.substring(bag.length / 2).split("");
    for (const secChar of second) {
      if (first.some((char) => secChar === char)) {
        total += priority(secChar);
        break;
      }
    }
  }
  return total;
}

console.log(puzzle1());

function puzzle2() {
  const data = readPuzzle("2022", "day3.txt", (data) => {
    const all = data.split(/\n/g);
    const groups = [];
    for (let i = 0; i < all.length; i += 3) {
      groups.push([
        all[i].split(""),
        all[i + 1].split(""),
        all[i + 2].split(""),
      ]);
    }
    return groups;
  });
  let total = 0;
  for (const bags of data) {
    const [bag1, bag2, bag3] = bags;
    for (const char of bag1) {
      if (findChar(bag2, char) && findChar(bag3, char)) {
        total += priority(char);
        break;
      }
    }
  }
  return total;
}

function findChar(list, char) {
  return list.some((c) => char === c);
}

console.log(puzzle2());
