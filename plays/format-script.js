const fs = require("fs");

const script = require("./shakespeare/unformatted/A Comedy of Errors.json");
let formattedScript = [];

const removeLines = () => {
  let linesRemoved = 0;

  script.forEach(line => {
    if (line.PlayerLine === "ANTIPHOLUS") {
      linesRemoved += 1;
      return;
    }

    if (line.isNewScene || line.isNewAct) {
      linesRemoved = 0;
    }

    if (line.ActSceneLine) {
      const [actNum, sceneNum, lineNum] = line.ActSceneLine.split(".");
      line.ActSceneLine = `${actNum}.${sceneNum}.${lineNum - linesRemoved}`;
    }

    formattedScript.push(line);
  });
};


const formatScript = () => {
  let previousCharacter = "";
  let formattedLine;
  let formattedScene;
  let currentAct = 0;
  let currentScene = 0;

  script.forEach(unformattedLine => {
    const line = { text: unformattedLine.PlayerLine };
    let player = "";
    if (unformattedLine.ActSceneLine) {
      line.number = +unformattedLine.ActSceneLine.split(".").pop();
      player = unformattedLine.Player;
    }

    if (unformattedLine.isNewScene || unformattedLine.isNewAct) {
      currentScene = unformattedLine.isNewAct ? 1 : currentScene + 1;
      currentAct = unformattedLine.isNewAct ? currentAct + 1 : currentAct;

      if (formattedScene) {
        formattedScene.lines.push(formattedLine);
        formattedScript.push(formattedScene);
      }

      formattedScene = {
        act: currentAct,
        scene: currentScene,
        lines: [],
      };
      formattedLine = {
        id: unformattedLine.Dataline,
        player,
        lineRows: []
      };
    }

    if (previousCharacter === player) {
      formattedLine.lineRows = [...formattedLine.lineRows, line];
      return;
    }

    if (formattedLine) {
      formattedScene.lines.push(formattedLine);
    }

    formattedLine = {
      id: unformattedLine.Dataline,
      player,
      lineRows: [line]
    };

    previousCharacter = player;
  });
}

formatScript();
fs.writeFileSync("script.json", JSON.stringify(formattedScript));
