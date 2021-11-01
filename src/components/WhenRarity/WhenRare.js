import * as media from "../Assets";
import moment from "moment";
const chance = require("chance").Chance();

const whenRare = (totalTokens) => {
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  console.log("I am rare");
  const issue = totalTokens + 1;
  const rarity = "uncommon";
  const day = moment().format("MM-DD-YY");
  const time = moment().format("hh:mm:ss");
  const choices = ["whale", "wide fish"];
  const whichFish = choices[getRandomInt(2)];
  if (whichFish === "whale") {
    console.log("I am a whale");

    const fishBase = () => {
      const value = chance.weighted(
        ["W1E", "W2E", "W3E", "W4E", "W5E"],
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
        [null, "WA1E", "WA2E", "WA3E", "WA4E", "WA5E"],
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
        [null, "WB1E", "WB2E", "WB3E", "WB4E"],
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
      const value = chance.weighted(
        [null, "WC1E", "WC2E", "WC3E", "WC4E"],
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
          accessoryD: "none",
        },
        date: {
          day,
          time,
        },
      },
    };
  } else {
    console.log("I am wide fish");

    const fishBase = () => {
      const value = chance.weighted(
        ["WF1E", "WF2E", "WF3E", "WF4E", "WF5E"],
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
        [null, "WFA1E", "WFA2E", "WFA3E", "WFA4E", "WFA5E"],
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
        [null, "WFB1E", "WFB2E", "WFB3E", "WFB4E", "WFB5E"],
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
      const value = chance.weighted([null, "WFC1E"], [1, 1]);
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

export default whenRare;
