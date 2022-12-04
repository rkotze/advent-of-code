const { readPuzzle } = require("../file-reader");

function puzzle1() {
  const spacesList = readPuzzle("2022", "day4.txt", (raw) => {
    return raw.split(/\n/g).map((spaces) => spaces.split(","));
  });

  let total = 0;
  for (const spaces of spacesList) {
    const [front, back] = spaces;
    const [ff, fb] = front.split("-").map((n) => Number(n));
    const [bf, bb] = back.split("-").map((n) => Number(n));
    if ((ff >= bf && fb <= bb) || (ff <= bf && fb >= bb)) {
      total += 1;
    }
  }
  return total;
}

console.log(puzzle1());
