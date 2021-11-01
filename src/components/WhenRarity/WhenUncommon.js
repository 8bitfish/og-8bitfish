import * as media from "../Assets";
import moment from "moment";
const chance = require("chance").Chance();

const whenUncommon = (totalTokens) => {
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  console.log("I am uncommon");
  const issue = totalTokens + 1;
  const rarity = "uncommon";
  const day = moment().format("MM-DD-YY");
  const time = moment().format("hh:mm:ss");
  const choices = ["angel fish", "skinny fish"];
  const whichFish = choices[getRandomInt(2)];

  if (whichFish === "angel fish") {
    console.log("I am a angel fish");

    const fishBase = () => {
      const value = chance.weighted(
        ["AF1E", "AF2E", "AF3E", "AF4E", "AF5E"],
        [1, 1, 1, 1, 1]
      );
      return {
        asset: media[value].asset,
        colorTrait: media[value].color,
        variant: media[value].var,
        hexTrait: media[value].hex,
      };
    };

    const accessoryA = () => {
      const value = chance.weighted(
        [null, "AFA1E", "AFA2E", "AFA3E", "AFA4E"],
        [1, 1, 1, 1, 1]
      );
      if (value !== null) {
        return {
          asset: media[value].asset,
          name: media[value].title,
          color: media[value].color,
        };
      } else {
        return "none";
      }
    };

    const accessoryB = () => {
      const value = chance.weighted(
        [null, "AFB1E", "AFB2E", "AFB3E", "AFB4E"],
        [1, 1, 1, 1, 1]
      );
      if (value !== null) {
        return {
          asset: media[value].asset,
          name: media[value].title,
          color: media[value].color,
        };
      } else {
        return "none";
      }
    };

    //add if a and b are blank then do this
    const accessoryC = () => {
      const value = chance.weighted(
        [null, "AFCa1E", "AFCb2E", "AFCc3E", "AFC4E"],
        [1, 1, 1, 1, 1]
      );
      if (value !== null) {
        return {
          asset: media[value].asset,
          name: media[value].title,
          color: media[value].color,
        };
      } else {
        return "none";
      }
    };

    const accessoryD = () => {
      const value = chance.weighted(
        [null, "AFD1E", "AFD2E", "AFD3E", "AFD4E"],
        [1, 1, 1, 1, 1]
      );
      if (value !== null) {
        return {
          asset: media[value].asset,
          name: media[value].title,
          color: media[value].color,
        };
      } else {
        return "none";
      }
    };

    return {
      currentFish: {
        issue,
        name: whichFish,
        rarity,
        base: fishBase(),
        accessories: {
          accessoryA: accessoryA(),
          accessoryB: accessoryB(),
          accessoryC: accessoryC(),
          accessoryD: accessoryD(),
        },
        date: {
          day,
          time,
        },
      },
    };
  } else {
    console.log("I am a skinny fish");

    const fishBase = () => {
      const value = chance.weighted(
        ["SF1E", "SF2E", "SF3E", "SF4E", "SF5E"],
        [1, 1, 1, 1, 1]
      );
      return {
        asset: media[value].asset,
        colorTrait: media[value].color,
        variant: media[value].var,
        hexTrait: media[value].hex,
      };
    };

    const accessoryA = () => {
      const value = chance.weighted(
        [null, "SFA1E", "SFA2E", "SFA3E", "SFA4E", "SFA5E"],
        [1, 1, 1, 1, 1, 1]
      );
      if (value !== null) {
        return {
          asset: media[value].asset,
          name: media[value].title,
          color: media[value].color,
        };
      } else {
        return "none";
      }
    };

    const accessoryB = () => {
      const value = chance.weighted(
        [null, "SFB1E", "SFB2E", "SFB3E", "SFB4E", "SFB5E"],
        [1, 1, 1, 1, 1, 1]
      );
      if (value !== null) {
        return {
          asset: media[value].asset,
          name: media[value].title,
          color: media[value].color,
        };
      } else {
        return "none";
      }
    };

    const accessoryC = () => {
      const value = chance.weighted(
        [null, "SFC1E", "SFC2E", "SFC3E"],
        [1, 1, 1, 1]
      );
      if (value !== null) {
        return {
          asset: media[value].asset,
          name: media[value].title,
          color: media[value].color,
        };
      } else {
        return "none";
      }
    };
    return {
      currentFish: {
        issue,
        name: whichFish,
        rarity,
        base: fishBase(),
        accessories: {
          accessoryA: accessoryA(),
          accessoryB: accessoryB(),
          accessoryC: accessoryC(),
          accessoryD: "none",
        },
        date: {
          day,
          time,
        },
      },
    };
  }
};

export default whenUncommon;
