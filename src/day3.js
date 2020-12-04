const { fileReader } = require("./file-reader");

function puzzle1() {
  const data = fileReader("day3.txt");
  const list = data.split("\n");
  return calcTrees(list, 3, 1);
}

function puzzle2() {
  const data = fileReader("day3.txt");
  const list = data.split("\n");
  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];

  return slopes.reduce((acc, [right, down]) => {
    const trees = calcTrees(list, right, down);
    return acc * trees;
  }, 1);
}

function calcTrees(list, right, down) {
  let x = 0;
  let treeCount = 0;
  for (let y = down; y < list.length; y += down) {
    const row = list[y];
    x += right;
    let square = row.charAt(x);
    if (square.length === 0) {
      x = x - row.length;
      square = row.charAt(x);
    }
    if (square === "#") treeCount++;
  }
  return treeCount;
}

exports.puzzle1 = puzzle1;
exports.puzzle2 = puzzle2;
