import scenes from "./scenes.json";
import image from "./image.jpg";
import { LocalPlayData } from "../../types";
// import { createColourByPlayer } from "../../../../helpers/play";

const AComedyOfErrors: LocalPlayData = {
  title: "A Comedy of Errors",
  description: "What a funny play!",
  scenes,
  image,
  imageLicenseUrl: "https://creativecommons.org/licenses/by/2.0/legalcode",
  imageLicenseCode: "CREATIVE_COMMONS_2"
  // colourByPlayer: createColourByPlayer(scenes as Play["scenes"]),
};

export default AComedyOfErrors;
