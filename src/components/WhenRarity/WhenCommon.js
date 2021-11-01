import * as media from "../Assets";
import moment from "moment";
const chance = require("chance").Chance();

const WhenCommon = (totalTokens) => {
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  //   setBackground(media.commonBG.asset); //replace in final response to connect to rarity
  const issue = totalTokens + 1;
  console.log("I am common");
  const rarity = "common";
  const day = moment().format("MM-DD-YY");
  const time = moment().format("hh:mm:ss");
  const choices = ["clown fish", "gold fish"];
  const whichFish = choices[getRandomInt(2)];
  if (whichFish === "clown fish") {
    console.log("I am clown fish");
    const fishBase = () => {
      const value = chance.weighted(
        ["CF1E", "CF2E", "CF3E", "CF4E", "CF5E"],
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
        [null, "CFA1E", "CFA2E", "CFA3E", "CFA4E", "CFA5E"],
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
        [null, "CFB1E", "CFB2E", "CFB3E", "CFB4E", "CFB5E"],
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

    return {
      currentFish: {
        issue,
        name: whichFish,
        rarity,
        base: fishBase(),
        accessories: {
          accessoryA: accessoryA(),
          accessoryB: accessoryB(),
          accessoryC: "none",
          accessoryD: "none",
        },
        date: {
          day,
          time,
        },
      },
    };
  } else {
    console.log("I am gold fish");
    const fishBase = () => {
      const value = chance.weighted(
        ["GF1E", "GF2E", "GF3E", "GF4E", "GF5E"],
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
        [null, "GFA1E", "GFA2E", "GFA3E", "GFA4E", "GFA5E"],
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
        [null, "GFB1E", "GFB2E", "GFB3E", "GFB4E", "GFB5E"],
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
    // const A = accessoryA();
    // const B = accessoryB();
    //add if a and b are blank then do this
    // if (A && B === null) {
    // ??
    // }
    const accessoryC = () => {
      const value = chance.weighted(
        [null, "GFC1E", "GFC2E", "GFC3E"],
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

export default WhenCommon;
