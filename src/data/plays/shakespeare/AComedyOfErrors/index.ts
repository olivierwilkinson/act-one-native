import { Play } from "../../../../types/play-types";
import scenes from "./script.json";
import image from "./image.jpg";
import { createColourByPlayer } from "../../../../helpers/play";

const AComedyOfErrors = {
  id: 1,
  title: "A Comedy of Errors",
  description: "What a funny play!",
  scenes,
  image,
  imageLicenseUrl: "https://creativecommons.org/licenses/by/2.0/legalcode",
  imageLicenseCode: "CREATIVE_COMMONS_2",
  colourByPlayer: createColourByPlayer(scenes as Play["scenes"]),
  local: true
} as Play;

export default AComedyOfErrors;
