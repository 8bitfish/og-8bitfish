import React, { useEffect, useState, useCallback, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { getFishData } from "./FirebaseFunctions";
import { Context } from "./Context";
const Details = ({ contract, axios }) => {
  const [data, setData] = useState();
  const [owner, setOwner] = useState();

  let { tokenId } = useParams();
  const { fishData, setFishData } = useContext(Context);
  const getOwnerOf = useCallback(async () => {
    if (contract !== null) {
      const output = await contract.methods.ownerOf(tokenId).call();
      setOwner(output);
    }
    // .then((res) => console.log(res));
  }, [contract, tokenId]);
  const getTokenURI = useCallback(async () => {
    let output;
    await contract;
    if (contract !== null) {
      await contract.methods
        .tokenURI(Number(tokenId))
        .call()
        .then(async (data) => {
          const url = data;
          const tokenURIData = await axios.get(url, {
            maxContentLength: "Infinity",
            headers: {
              "Content-Type": "application/json",
            },
          });
          output = tokenURIData.data;
        });
    }
    setData(output);
    return output;
  }, [axios, contract, tokenId]);

  if (typeof fishData === "object") {
    if (data !== undefined) {
      console.log(fishData[2][data[1].currentFish.name]);
    }
  }
  useEffect(() => {
    getTokenURI();
    getOwnerOf();
  }, [contract, getTokenURI, getOwnerOf]);

  useEffect(() => {
    getFishData(setFishData);
  }, [setFishData]);

  //# DO ACCESSORIES
  return (
    <div>
      <Helmet>
        {data !== undefined ? (
          <link rel="icon" href={data[0]} sizes="16x16" />
        ) : null}
        <title>8bitfish | Details ({tokenId})</title>
        {/* <link rel="canonical" href="http://mysite.com/example" /> */}
      </Helmet>
      <center>
        {data !== undefined ? (
          <>
            <img src={data[0]} alt={data[0]} />
            <h2>Owner</h2>
            <Link to={`/aquarist/${owner}`}>{owner}</Link>
            <h2>Main</h2>
            {typeof fishData === "object" ? (
              <>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/queryFish/color/${data[1].currentFish.base.colorTrait.toLowerCase()}`}
                >
                  <h3
                    style={{
                      color: data[1].currentFish.base.colorTrait.toLowerCase(),
                    }}
                  >{`There are ${
                    fishData[0][
                      data[1].currentFish.base.colorTrait.toLowerCase()
                    ]
                  } ${
                    data[1].currentFish.base.colorTrait
                  } fish currently in circulation`}</h3>
                </Link>

                <Link
                  style={{ textDecoration: "none" }}
                  to={`/queryFish/rarity/${data[1].currentFish.rarity}`}
                >
                  <h3 className={data[1].currentFish.rarity}>{`There are ${
                    fishData[1][data[1].currentFish.rarity]
                  } ${
                    data[1].currentFish.rarity
                  } fish currently in circulation`}</h3>
                </Link>

                <Link
                  style={{ textDecoration: "none" }}
                  to={`/queryFish/title/${data[1].currentFish.name}`}
                >
                  <h3>{`There are ${fishData[2][data[1].currentFish.name]} ${
                    data[1].currentFish.name
                  } currently in circulation`}</h3>
                </Link>
              </>
            ) : (
              <h3>loading...</h3>
            )}
            <p>issue: {data[1].currentFish.issue}</p>
            <p>name: {data[1].currentFish.name}</p>
            <p>
              rarity:{" "}
              <span className={data[1].currentFish.rarity}>
                <strong>{data[1].currentFish.rarity}</strong>
              </span>
            </p>
            <p>
              date minted: {data[1].currentFish.date.day} @{" "}
              {data[1].currentFish.date.time}
            </p>
            <h2>Base</h2>
            <p>
              base - colorTrait: {data[1].currentFish.base.colorTrait},
              hexTrait: {data[1].currentFish.base.hexTrait}, variant:{" "}
              {data[1].currentFish.base.variant},
            </p>
            <h2>Accessories</h2>
            {data[1].currentFish.accessories.accessoryA === "none" ? null : (
              <>
                <h4>Accessory A</h4>
                <p>
                  {data[1].currentFish.accessories.accessoryA.color} -{" "}
                  {data[1].currentFish.accessories.accessoryA.name}
                </p>
                {/* <img
                  src={data[1].currentFish.accessories.accessoryA.asset}
                  alt={data[1].currentFish.accessories.accessoryA.asset}
                /> */}
              </>
            )}
            {data[1].currentFish.accessories.accessoryB === "none" ? null : (
              <>
                <h4>Accessory B</h4>
                <p>
                  {data[1].currentFish.accessories.accessoryB.color} -{" "}
                  {data[1].currentFish.accessories.accessoryB.name}
                </p>
                {/* <img
                  src={data[1].currentFish.accessories.accessoryB.asset}
                  alt={data[1].currentFish.accessories.accessoryB.asset}
                /> */}
              </>
            )}
            {data[1].currentFish.accessories.accessoryC === "none" ? null : (
              <>
                <h4>Accessory C</h4>
                <p>
                  {data[1].currentFish.accessories.accessoryC.color} -{" "}
                  {data[1].currentFish.accessories.accessoryC.name}
                </p>
                {/* <img
                  src={data[1].currentFish.accessories.accessoryC.asset}
                  alt={data[1].currentFish.accessories.accessoryC.asset}
                /> */}
              </>
            )}
            {data[1].currentFish.accessories.accessoryD === "none" ? null : (
              <>
                <h4>Accessory D</h4>
                <p>
                  {data[1].currentFish.accessories.accessoryD.color} -
                  {data[1].currentFish.accessories.accessoryD.name}
                </p>
                {/* <img
                  src={data[1].currentFish.accessories.accessoryD.asset}
                  alt={data[1].currentFish.accessories.accessoryD.asset}
                /> */}
              </>
            )}
          </>
        ) : (
          <h1>loading or doesn't exist</h1>
        )}
      </center>
    </div>
  );
};

export default Details;
