import * as media from "../Assets";
import moment from "moment";
const chance = require("chance").Chance();

const whenLegendary = (totalTokens) => {
  const issue = totalTokens + 1;
  const rarity = "legendary";
  const day = moment().format("MM-DD-YY");
  const time = moment().format("hh:mm:ss");
  console.log("I am legendary");

  const fishBase = () => {
    const value = chance.weighted(
      [
        "AFS1E",
        "GFS1E",
        "DS1E",
        "CFS1E",
        "JFS1E",
        "JFS2E",
        "SFS1E",
        "WFS1E",
        "WS1E",
      ],
      [1, 1, 1, 1, 1, 1, 1, 1, 1]
    );
    return {
      title: media[value].title,
      asset: media[value].asset,
      colorTrait: media[value].color,
      variant: media[value].var,
      hexTrait: media[value].hex,
    };
  };

  const fishBaseData = fishBase();
  return {
    currentFish: {
      issue,
      name: fishBaseData.title,
      rarity,
      base: fishBaseData,
      accessories: {
        accessoryA: "none",
        accessoryB: "none",
        accessoryC: "none",
        accessoryD: "none",
      },
      date: {
        day,
        time,
      },
    },
  };
};

export default whenLegendary;
