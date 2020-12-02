let day1 = require("./day1");

let myArgs = process.argv.slice(2);

switch(myArgs[0]) {
  case "1.1":
    console.log(day1.puzzle1());
    break;
  case "1.2":
    console.log(day1.puzzle2());
    break;
  default:
    console.log("No advent found");
}
