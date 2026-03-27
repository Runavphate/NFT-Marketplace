import "@nomicfoundation/hardhat-ethers";
import "dotenv/config";

const config = {
  solidity: "0.8.28",
  networks: {},
};

if (process.env.SEPOLIA_RPC_URL) {
  config.networks.sepolia = {
    url: process.env.SEPOLIA_RPC_URL,
    accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
  };
}

export default config;
