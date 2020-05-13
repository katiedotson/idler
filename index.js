const express = require("express");
const app = express();
const port = 4000;
const files = require("fs");
const cors = require("cors");

app.use(express.static(`${__dirname}/views`));
app.use(express.json());
app.use(cors());

const JSON_DIR = "./json";

//Get the files and make our array out of 'em
function parser() {
  const fileNames = files.readdirSync(JSON_DIR);

  let responseObjs = [];

  fileNames.forEach((jsonFile) => {
    const method = jsonFile.split("_")[0];
    const path = jsonFile.split("_")[1].split(".")[0];
    const fileJson = files.readFileSync(`${JSON_DIR}/${jsonFile}`);
    const value = JSON.parse(fileJson);

    responseObjs.push({
      method,
      path,
      value,
    });
  });
  return responseObjs;
}

//get /, /get
app.get("/", (req, res) => {
  res.send("index");
});
app.get("/get", (req, res) => {
  res.json(parser());
});

//add paths from './json/ to app as updated
const updateApp = () => {
  const json = parser();

  json.forEach((response, index) => {
    const getResJson = (index) => {
      const in_json = parser();
      return in_json[index].value;
    };

    if (response.method === "post") {
      app.post(response.path, (req, res) => {
        res.json(getResJson(index));
      });
    } else if (response.method === "get") {
      app.get(response.path, (req, res) => {
        res.json(getResJson(index));
      });
    }
  });
};

//watch files for updates
files.watch(JSON_DIR, null, () => {
  try {
    updateApp();
  } catch (err) {
    console.error(err);
  }
});

//build initial paths
updateApp();

app.listen(port, () => {
  const pinkyPurple = "\x1b[35m";
  console.log(pinkyPurple, " _______________________________");
  console.log(pinkyPurple, "|  __     __ __                  \\");
  console.log(pinkyPurple, "| |__| __| ||  |  ____  ____     |");
  console.log(pinkyPurple, "| |  |/ __ ||  | | __ ||  __|    |");
  console.log(pinkyPurple, "| |  | |_| ||  |_| ___||  |      |");
  console.log(pinkyPurple, "| |__|_____||____|___> |__|      |");
  console.log(pinkyPurple, "|_____________________________K8_|");
  console.log(
    pinkyPurple,
    `                                  @ http://localhost:${port}`
  );
});
