import * as media from "../Assets";
import moment from "moment";
const chance = require("chance").Chance();

const whenEpic = (totalTokens) => {
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  console.log("I am epic");
  const issue = totalTokens + 1;
  const rarity = "uncommon";
  const day = moment().format("MM-DD-YY");
  const time = moment().format("hh:mm:ss");
  const choices = ["dead fish", "dolphin", "jelly fish"];
  const whichFish = choices[getRandomInt(3)];
  if (whichFish === "dead fish") {
    console.log("i am a dead fish");

    const fishBase = () => {
      const value = chance.weighted(
        ["DF1E", "DF2E", "DF3E", "DF4E", "DF5E"],
        [1, 1, 1, 1, 1]
      );
      return {
        asset: media[value].asset,
        colorTrait: media[value].color,
        variant: media[value].var,
        hexTrait: media[value].hex,
      };
    };

    return {
      currentFish: {
        issue,
        name: whichFish,
        rarity,
        base: fishBase(),
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
  } else if (whichFish === "dolphin") {
    console.log("I am dolphin");

    const fishBase = () => {
      const value = chance.weighted(
        ["D1E", "D2E", "D3E", "D4E", "D5E"],
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
        [null, "DA1E", "DA2E", "DA3E", "DA4E"],
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
        [null, "DB1E", "DB2E", "DB3E", "DB4E"],
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

    const accessoryC = () => {
      const value = chance.weighted([null, "DC1E", "DC2E"], [1, 1, 1]);
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
  } else {
    console.log("I am a jelly fish");

    const fishBase = () => {
      const value = chance.weighted(
        ["JF1E", "JF2E", "JF3E", "JF4E", "JF5E"],
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
        [null, "JFA1E", "JFA2E", "JFA3E", "JFA4E"],
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
        [null, "JFB1E", "JFB2E", "JFB3E", "JFB4E"],
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
          accessoryC: "none",
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

export default whenEpic;
