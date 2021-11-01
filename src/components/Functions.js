import axios from "axios";
import { addFish } from "./FirebaseFunctions";
export const currentUserTokens = async (account, contract) => {
  const userTokens = [];
  // const balance = await getBalanceOf(account, contract); //until balance of owner for performance
  // console.log(balance);
  const currentTotalTokens = await totalSupply(contract);
  console.log("%cgood & pushed", "color:#42f554");
  console.log("%cbad", "color:#ff3333");
  for (let i = 1; i <= currentTotalTokens.length; i++) {
    if (Number(await getOwnerOf(i, contract)) === Number(account)) {
      userTokens.push(await getTokenURI(i, contract));
      console.log(`%c${i}`, `color:#42f554`);
    } else {
      console.log(`%c${i}`, `color:#ff3333`);
    }
  }

  // let currentBalance = 0;
  // do {
  //   for (let i = 1; i <= currentTotalTokens.length; i++) {
  //     if (Number(await getOwnerOf(i, contract)) === Number(account)) {
  //       userTokens.push(await getTokenURI(i, contract));
  //       currentBalance++;
  //       console.log(currentBalance);
  //       console.log(balance);
  //       console.log("?", currentBalance !== balance);
  //       console.log("pushed", i);
  //     } else {
  //       console.log("bad", i);
  //     }
  //   }
  // } while (currentBalance !== balance);

  return userTokens;
};

export const mint = async (
  hash,
  metadata,
  jsonArray,
  contract,
  accounts,
  web3,
  removePinFromIPFS
) => {
  const amountEth = "0"; //# CHANGE TRANS AMOUNT
  const output = await contract.methods
    .mint(hash, metadata)
    .send({
      from: accounts[0],
      value: web3.utils.toWei(amountEth, "ether"),
    })
    .once("transactionHash", function (hash) {
      console.log(hash);
    })

    .on("confirmation", function (confNumber, receipt) {
      console.log(confNumber);
      console.log(receipt);
      console.log("what is this");
    })
    .on("error", function (error) {
      console.log(error);
      console.log(hash);
      return removePinFromIPFS(hash).then("successfully removed", hash);
    })
    .then(function (receipt) {
      console.log(receipt);
      const id = jsonArray[1].currentFish.issue.toString();
      const title = jsonArray[1].currentFish.name;
      const rarity = jsonArray[1].currentFish.rarity;
      const color = jsonArray[1].currentFish.base.colorTrait;
      const imageData = jsonArray[0];
      addFish(id, title, rarity, color, imageData);
      console.log("sucessful");
      return jsonArray[0];
    });
  return output;
};

export const getTokenURI = async (tokenId, contract) => {
  let output;
  await contract.methods
    .tokenURI(tokenId)
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
  return output;
};

export const getOwnerOf = async (tokenId, contract) => {
  return await contract.methods.ownerOf(tokenId).call();
  // .then((res) => console.log(res));
};

export const getBalanceOf = async (owner, contract) => {
  return Number(await contract.methods.balanceOf(owner).call());
  // .then((res) => console.log(res));
};

export const transferToken = async (recipient, contract, accounts) => {
  const to = recipient;
  const tokenId = 2;
  console.log(to, tokenId);
  if (tokenId === undefined) {
    console.error("tokenId is undefined");
  } else {
    await contract.methods
      .transferToken(to, tokenId)
      .send({ from: accounts[0] });
  }
};

export const totalSupply = async (contract) => {
  const totalSupply = await contract.methods.totalSupply().call();
  const totalTokens = [];
  for (let i = 1; i <= totalSupply; i++) {
    await contract.methods
      .tokens(i - 1)
      .call()
      .then((token) => totalTokens.push(Number(token)));
    // setTotalTokens((currentTokens) => [tokens, ...currentTokens]);
  }
  return totalTokens;
};

export const displayTotalSupply = async (contract) => {
  const totalSupply = await contract.methods.totalSupply().call();
  const totalTokens = [];
  for (let i = 1; i <= totalSupply; i++) {
    totalTokens.push(
      await getTokenURI(i, contract).then((res) => {
        return res[0];
      })
    );

    // await contract.methods
    //   .tokens(i - 1)
    //   .call()
    //   .then((token) => totalTokens.push(Number(token)));
    // setTotalTokens((currentTokens) => [tokens, ...currentTokens]);
  }
  // console.log(totalTokens);
  return totalTokens;
};
