require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

module.exports = {
  solidity: "0.8.0",
  networks: {
    hardhat: {
      chainId: 1337
    },
    testnet: {
      url: process.env.TESTNET_URL,
      accounts: [process.env.TESTNET_PRIVATE_KEY]
    },
    mainnet: {
      url: process.env.MAINNET_URL,
      accounts: [process.env.MAINNET_PRIVATE_KEY]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};
