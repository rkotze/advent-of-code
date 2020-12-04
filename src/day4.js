const { fileReader } = require("./file-reader");

const validPassportKeys = [
  "byr",
  "iyr",
  "eyr",
  "hgt",
  "hcl",
  "ecl",
  "pid",
  // "cid",
];
function puzzle1() {
  const data = fileReader("day4.txt");
  const list = data.split("\n\n");
  let count = 0;
  for (const passport of list) {
    if (validPassportKeys.every((key) => passport.includes(key))) {
      count++;
    }
  }
  return count;
}

console.log(puzzle1());
