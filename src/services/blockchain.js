import { ethers } from "ethers";

// Load contract ABI and address (replace with yours)
import contractABI from "../utils/contractABI.json";
const CONTRACT_ADDRESS = "0xYourContractAddress";

export const connectWallet = async () => {
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return signer;
  } else {
    throw new Error("MetaMask not detected");
  }
};

export const getContract = async () => {
  const signer = await connectWallet();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
  return contract;
};

export const mintNFT = async (metadataURI) => {
  try {
    const contract = await getContract();
    const txn = await contract.mint(metadataURI);
    await txn.wait();
    return txn.hash;
  } catch (err) {
    console.error("Minting failed:", err);
    throw err;
  }
};

export const fetchListedNFTs = async () => {
  try {
    const contract = await getContract();
    const listed = await contract.getListedNFTs();
    return listed;
  } catch (err) {
    console.error("Fetching NFTs failed:", err);
    return [];
  }
};

