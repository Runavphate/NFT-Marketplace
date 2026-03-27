const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Marketplace = await hre.ethers.getContractFactory("NFTMarketplace");
  const marketplace = await Marketplace.deploy();

  await marketplace.waitForDeployment();
  const address = await marketplace.getAddress();
  console.log("NFTMarketplace deployed to:", address);

  // Write the contract address to the frontend
  const data = `export const CONTRACT_ADDRESS = "${address}";\n`;
  fs.writeFileSync('./src/utils/contractAddress.js', data);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
