const fs = require("fs");

const script = require("./shakespeare/unformatted/A Comedy of Errors.json");
// const script = [];
let currentCharacter;
let formattedLine;
const formattedScript = [];
script.forEach(unformattedLine => {
  const line = { text: unformattedLine.PlayerLine };
  let player = "";
  if (unformattedLine.ActSceneLine) {
    line.number = +unformattedLine.ActSceneLine.split(".").pop();
    player = unformattedLine.Player;
  }

  if (currentCharacter === unformattedLine.Player) {
    formattedLine.lines = [...formattedLine.lines, line];
    return;
  }

  if (formattedLine) {
    formattedScript.push(formattedLine);
  }

  formattedLine = {
    id: unformattedLine.Dataline,
    player,
    lines: [line]
  };
  currentCharacter = unformattedLine.Player;
});

fs.writeFileSync("script.json", JSON.stringify(formattedScript));
