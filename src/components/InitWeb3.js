import Web3 from "web3";
import GenerateFish from "../contracts/GenerateFish.json";

export async function loadWeb3() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
  } else if (window.web3) {
    window.web3 = new Web3(window.ethereum);
  } else {
    window.alert(
      "Non-Ethereum browser detected. You should consider trying MetaMask"
    );
  }
}
export async function loadBlockchainData() {
  const web3 = window.web3;
  const ethereum = window.ethereum;
  // Load account
  const accounts = await ethereum.request({ method: "eth_accounts" });
  // setAccount(accounts[0]);

  const networkId = await web3.eth.net.getId();
  const networkData = GenerateFish.networks[networkId];
  // const totalSupply = await contract.methods.totalSupply().call(); //# Console log balanceOf
  if (networkData) {
    const abi = GenerateFish.abi;
    const address = networkData.address;
    const contract = new web3.eth.Contract(abi, address);
    return { web3, accounts, contract };
  } else {
    window.alert("Smart contract not deployed to detected network.");
  }
}
