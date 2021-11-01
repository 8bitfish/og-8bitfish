import React, { useCallback, useEffect, useState } from "react";
import whenCommon from "./components/WhenRarity/WhenCommon";
import whenUncommon from "./components/WhenRarity/WhenUncommon";
import whenRare from "./components/WhenRarity/WhenRare";
import whenEpic from "./components/WhenRarity/WhenEpic";
import whenLegendary from "./components/WhenRarity/WhenLegendary";
import _ from "underscore";
import "./styles/App.scss";
import mergeImages from "merge-images";
import { Canvas, Image } from "canvas";
import axios from "axios";
import { Switch, Route, Link } from "react-router-dom";
import Details from "./components/Details";
import Navbar from "./components/Navbar";
import UserProfile from "./components/UserProfile";
import { loadWeb3, loadBlockchainData } from "./components/InitWeb3";
import {
  currentUserTokens,
  mint,
  displayTotalSupply,
} from "./components/Functions";
// import firebase from "./components/firebase";
import { getFish, uploadFish } from "./components/FirebaseFunctions";
import { Context } from "./components/Context";
import { Helmet } from "react-helmet";
import Favicon from "./favicon.ico";
import QueryFish from "./components/QueryFish";
const chance = require("chance").Chance();

const App = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [totalTokens, setTotalTokens] = useState([]);
  // const [recipient, setRecipient] = useState("");
  const [currentFish, setCurrentFish] = useState("");
  const [fishData, setFishData] = useState("");
  const [recentlyGenerated, setRecentlyGenerated] = useState("");
  // const db = firebase.firestore();

  /* ------------------------------- PUT IN ENV ------------------------------- */
  const pinata_api_key = process.env.pinata_api_key;
  const pinata_secret_api_key = process.env.pinata_secret_api_key;

  const removePinFromIPFS = useCallback(async (hash) => {
    console.log(hash);
    const url = `https://api.pinata.cloud/pinning/unpin/${hash}`;
    return await axios
      .delete(url, {
        headers: {
          pinata_api_key,
          pinata_secret_api_key,
        },
      })
      .then(function (response) {
        console.log("good", response);
      })
      .catch(function (error) {
        console.log("bad", error);
      });
  }, []);

  const pinJSONtoIPFS = useCallback(
    async (fishData) => {
      const jsonArray = [];
      const inputImage = () => {
        const imageArray = [fishData.currentFish.base.asset];
        if (fishData.currentFish.accessories.accessoryA !== "none") {
          if (fishData.currentFish.accessories.accessoryA.asset !== "none") {
            imageArray.push(fishData.currentFish.accessories.accessoryA.asset);
          }
        }
        if (fishData.currentFish.accessories.accessoryB !== "none") {
          if (fishData.currentFish.accessories.accessoryB.asset !== "none") {
            imageArray.push(fishData.currentFish.accessories.accessoryB.asset);
          }
        }
        if (fishData.currentFish.accessories.accessoryC !== "none") {
          if (fishData.currentFish.accessories.accessoryC.asset !== "none") {
            imageArray.push(fishData.currentFish.accessories.accessoryC.asset);
          }
        }
        if (fishData.currentFish.accessories.accessoryD !== "none") {
          if (fishData.currentFish.accessories.accessoryD.asset !== "none") {
            imageArray.push(fishData.currentFish.accessories.accessoryD.asset);
            console.log("pushed");
          }
        }
        return imageArray;
      };
      console.log(inputImage());
      await mergeImages(inputImage(), {
        Canvas: Canvas,
        Image: Image,
      }).then(async (currentFish) => {
        /// For data:image
        const tokenId = fishData.currentFish.issue; ///cut
        const imageurl = await uploadFish(currentFish, tokenId); ///cut
        jsonArray.push(imageurl, fishData); ///imageurl -> currentFish
        console.log(jsonArray);
      });

      const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
      const data = JSON.stringify(jsonArray);
      console.log(jsonArray[1].currentFish.name);
      const res = await axios.post(url, data, {
        maxContentLength: "Infinity",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          "Content-Type": "application/json",
          pinata_api_key,
          pinata_secret_api_key,
        },
      });
      const hash = res.data.IpfsHash;
      const metadata = `https://gateway.pinata.cloud/ipfs/${hash}`;
      console.log(hash);
      console.log(metadata);
      //# the fuck?
      const mintRes = await mint(
        hash,
        metadata,
        jsonArray,
        contract,
        accounts,
        web3,
        removePinFromIPFS
      );
      console.log(mintRes);
      console.log(typeof mintRes === "string");
      if (typeof mintRes === "string") {
        console.log("good");
        setRecentlyGenerated(jsonArray[1].currentFish.issue);
        setCurrentFish(mintRes);
      }
    },
    [accounts, contract, web3, removePinFromIPFS]
  );

  const whatRarity = useCallback(
    async (rarity) => {
      const totalTokens = Number(await contract.methods.totalSupply().call());
      console.log(totalTokens);
      if (rarity === "Common") {
        pinJSONtoIPFS(whenCommon(totalTokens));
      } else if (rarity === "Uncommon") {
        pinJSONtoIPFS(whenUncommon(totalTokens));
      } else if (rarity === "Rare") {
        pinJSONtoIPFS(whenRare(totalTokens));
      } else if (rarity === "Epic") {
        pinJSONtoIPFS(whenEpic(totalTokens));
      } else if (rarity === "Legendary") {
        pinJSONtoIPFS(whenLegendary(totalTokens));
      }
    },
    [pinJSONtoIPFS, contract]
  );

  const generateRarity = useCallback(() => {
    const rarity = chance.weighted(
      ["Legendary", "Epic", "Rare", "Uncommon", "Common"],
      [6, 7, 8, 9, 10]
    );
    console.log(rarity);
    whatRarity(rarity);
  }, [whatRarity]);
  const generate = useCallback(() => {
    generateRarity();
  }, [generateRarity]);

  useEffect(() => {
    loadWeb3();
    loadBlockchainData().then((res) => {
      const web3 = res.web3;
      const accounts = res.accounts;
      const contract = res.contract;
      setWeb3(web3);
      setAccount(accounts);
      setContract(contract);
      // totalSupply(contract).then((totalSupply) =>
      //   setTotalTokens(totalSupply)
      // );

      displayTotalSupply(contract).then((res) => setTotalTokens(res));
      getFish();
    });
  }, []);
  return (
    <div className="App">
      <Context.Provider value={{ fishData, setFishData, accounts, contract }}>
        <Navbar />
        <Switch>
          <Route path="/generate">
            <GeneratePage
              generate={generate}
              currentFish={currentFish}
              recentlyGenerated={recentlyGenerated}
            />
          </Route>
          <Route path="/details/:tokenId">
            <Details contract={contract} axios={axios} />
          </Route>
          <Route path="/aquarist/:account">
            <UserProfile
              currentUserTokens={currentUserTokens}
              chance={chance}
              _={_}
            />
          </Route>

          <Route path="/queryFish/:category/:query">
            <QueryFish Favicon={Favicon} _={_} chance={chance} />
          </Route>

          <div>
            <Helmet>
              <link rel="icon" href={Favicon} sizes="16x16" />
              <title>8bitfish</title>
              {/* <link rel="canonical" href="http://mysite.com/example" /> */}
            </Helmet>
            {!web3 ? (
              <div>Loading Web3, accounts, and contract...</div>
            ) : (
              <div>
                {/* <button onClick={handleSignup}>handleSignup</button>
                <button onClick={handleSignin}>handleSignin</button> */}
                {_.map(totalTokens, (tokens, key) => {
                  const currentKey = key + 1;
                  return (
                    <React.Fragment key={chance.integer()}>
                      <Link to={`/details/${currentKey}`}>
                        <img key={currentKey} src={tokens} alt="" />
                      </Link>
                    </React.Fragment>
                  );
                })}
                {/* <label>From YOU ({accounts}) to </label>
              <input
                placeholder="recipient address"
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
              <button onClick={transferToken(recipient, contract, accounts)}>
                transferToken
              </button> */}
                <br />
              </div>
            )}
          </div>
        </Switch>
      </Context.Provider>
    </div>
  );
};

const GeneratePage = ({ generate, currentFish, recentlyGenerated }) => {
  return (
    <div className="generatePage">
      {currentFish && recentlyGenerated !== "" ? (
        <Link to={`/details/${recentlyGenerated}`}>
          <img src={currentFish} alt="currentFish" />
        </Link>
      ) : null}
      <button className="generateButton" onClick={generate}>
        generate
      </button>
    </div>
  );
};

export default App;
