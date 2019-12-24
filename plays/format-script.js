const fs = require('fs');

// const script = require('./shakespeare/AComedyOfErrors/AComedyOfErrors.json');
const script = [];
let currentCharacter;
let formattedLine;
const formattedScript = [];
script.forEach(line => {
  if (currentCharacter === line.Player) {
    formattedLine.line = `${formattedLine.line}\n${line.PlayerLine}`;
    return;
  }

  if (formattedLine) {
    formattedScript.push(formattedLine);
  }

  formattedLine = {
    id: line.Dataline,
    actSceneLine: line.ActSceneLine,
    player: line.Player,
    line: line.PlayerLine,
  };
  currentCharacter = line.Player;
});

fs.writeFileSync('script.json', JSON.stringify(formattedScript));