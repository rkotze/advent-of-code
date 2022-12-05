const fs = require("fs");
const https = require("https");
const path = require("path");
const { envVars } = require("./file-reader");

const { session } = envVars();

const [dayOverride, yearOverride] = process.argv.slice(2);

const d = new Date();
let year = yearOverride || d.getFullYear();
let day = dayOverride || d.getDate();
console.log(`🚀 setting up year ${year} day ${day}`);

const dataFilePath = path.join(__dirname, `/${year}/data/day${day}.txt`);
https
  .get(
    {
      path: `/${year}/day/${day}/input`,
      hostname: "adventofcode.com",
      port: 443,
      method: "GET",
      headers: {
        Cookie: `session=${session}`,
      },
    },
    (res) => {
      const file = fs.createWriteStream(dataFilePath);

      res.pipe(file);

      file.on("finish", () => {
        file.close();
        console.log(`Puzzle data downloaded!`);
      });
    }
  )
  .on("error", (err) => {
    console.log("Error: ", err.message);
  });

const jsFilePath = path.join(__dirname, `/${year}/day${day}.js`);

if (!fs.existsSync(jsFilePath)) {
  fs.writeFileSync(
    jsFilePath,
    `const { readPuzzle } = require("../file-reader");
    
    function puzzle1() {
      const data = readPuzzle("2022", "day${day}t.txt");
      for (const num1 of data) {
        
      }
      return 0;
    }
    
    console.log(puzzle1());`
  );
  console.log(`JS file created!`);
}

const testTxtFilePath = path.join(__dirname, `/${year}/data/day${day}t.txt`);

if (!fs.existsSync(testTxtFilePath)) {
  fs.writeFileSync(testTxtFilePath, `Add data.`);
  console.log(`Test txt file created!`);
}
