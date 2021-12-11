const fs = require("fs");
const https = require("https");
const path = require("path");
const { envVars } = require("./file-reader");

const { session } = envVars();

const [year, day] = process.argv.slice(2);
const filePath = path.join(__dirname, `/${year}/data/day${day}.txt`);

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
      const file = fs.createWriteStream(filePath);

      res.pipe(file);

      file.on("finish", () => {
        file.close();
        console.log(`File downloaded!`);
      });
    }
  )
  .on("error", (err) => {
    console.log("Error: ", err.message);
  });
