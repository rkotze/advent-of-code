const { fileReader } = require("./file-reader");

function puzzle1() { // right 3 down 1
  const list = fileReader("day3.txt");
  let x = 0;
  let treeCount = 0;
  for (let y = 1; y < list.length; y++) {
    const row = list[y];
    x += 3;
    let square = row.charAt(x);
    if(square.length === 0){
      const remaining = row.slice(x - 3).length;
      x = 3 - remaining;
      square = row.charAt(x);
    }
    if(square === "#") treeCount++;
  }
  return treeCount;
}

exports.puzzle1 = puzzle1;
// exports.puzzle2 = puzzle2;