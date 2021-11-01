const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = process.env.mnemonic;
const alchemyId = `https://eth-rinkeby.alchemyapi.io/v2/${process.env.alc_id}`;
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "src/contracts"),
  compilers: {
    solc: {
      version: "0.6.2",
    },
  },
  networks: {
    develop: {
      port: 8545,
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, alchemyId),
      network_id: 4, // Rinkeby's id
      gas: 8500000,
      gasPrice: 1000000000, // 1 gwei (in wei) (default: 100 gwei)
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },
  },
};
