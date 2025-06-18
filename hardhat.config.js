require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // Import dotenv to use environment variables

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
    },
    sepolia: {
      url: process.env.ALCHEMY_API_URL, // Use API key from .env
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [], // Use private key from .env
    },
  },
};
