const { readPuzzle } = require("../file-reader");

function puzzle1() {
  const data = readPuzzle("2023", "day4.txt");
  let [winSet, playerSet] = getCardNumbers(data);
  let total = 0;
  for (let i = 0; i < winSet.length; i++) {
    const winningNums = winSet[i];
    let subTotal = 0;
    for (let k = 0; k < winningNums.length; k++) {
      const num = winningNums[k];
      if (playerSet[i].includes(num)) {
        if (subTotal == 0) subTotal += 1;
        else subTotal *= 2;
      }
    }
    total += subTotal;
    subTotal = 0;
  }
  return total;
}

console.log(puzzle1());

function getCardNumbers(data) {
  let winSet = [];
  let playerSet = [];
  for (const row of data) {
    const [winNums, playerNums] = row.split(" | ");
    winSet.push(
      winNums
        .split(" ")
        .filter((val) => Number(val))
        .map((val) => Number(val))
    );
    playerSet.push(
      playerNums
        .split(" ")
        .filter((val) => Number(val))
        .map((val) => Number(val))
    );
  }
  return [winSet, playerSet];
}
