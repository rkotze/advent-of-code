const { fileReader } = require("./file-reader");

function puzzle1() {
  const data = fileReader("day6.txt");
  const groups = data.split("\n\n");
  let total = 0;
  for (const group of groups) {
    const people = group.split("\n");
    let allAnswers = [];
    for (const person of people) {
      allAnswers = allAnswers.concat(person.split(""));
    }

    total += new Set(allAnswers).size;
  }
  return total;
}

console.log(puzzle1());
