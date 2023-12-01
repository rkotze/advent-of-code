const { readPuzzle } = require("../file-reader");

function puzzle1() {
  const data = readPuzzle("2023", "day1.txt");
  const cali = [];
  for (const newDesign of data) {
    const nums = newDesign.match(/\d/g);
    if (nums.length == 1) cali.push(nums[0] + nums[0]);
    if (nums.length == 2) cali.push(nums[0] + nums[1]);
    if (nums.length > 2) cali.push(nums[0] + nums[nums.length - 1]);
  }

  return cali.reduce((a, b) => {
    return a + Number(b);
  }, 0);
}

console.log(puzzle1());
