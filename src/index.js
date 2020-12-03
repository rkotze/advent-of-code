const day1 = require("./day1");
const day2 = require("./day2");

let myArgs = process.argv.slice(2);

switch (myArgs[0]) {
  case "1.1":
    console.log(day1.puzzle1());
    break;
  case "1.2":
    console.log(day1.puzzle2());
    break;
  case "2.1":
    console.log(day2.puzzle1());
    break;
  default:
    console.log("No advent found");
}
