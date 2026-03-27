import { ethers } from "ethers";

import contractABI from "../utils/contractABI.json";
const CONTRACT_ADDRESS = "0x0a5A0AF41414c47AEDd289E4f5aC8165CFdD7E5f";
// Reliable public Sepolia RPC — no wallet needed to read data
const SEPOLIA_RPC = "https://ethereum-sepolia-rpc.publicnode.com";

// Read-only: no wallet popup needed, loads data for everyone
const getReadOnlyContract = () => {
  const provider = new ethers.JsonRpcProvider(SEPOLIA_RPC);
  return new ethers.Contract(CONTRACT_ADDRESS, contractABI, provider);
};

export const connectWallet = async () => {
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    // Force MetaMask to always show the account picker popup
    await provider.send("wallet_requestPermissions", [{ eth_accounts: {} }]);
    // Now get the selected account
    await provider.send("eth_requestAccounts", []);
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

// Contract signature: mint(string memory tokenURI, uint256 price)
export const mintNFT = async (metadataURI, priceInEth) => {
  try {
    const contract = await getContract();
    const priceWei = ethers.parseEther(priceInEth.toString());
    const txn = await contract.mint(metadataURI, priceWei);
    await txn.wait();
    return txn.hash;
  } catch (err) {
    console.error("Minting failed:", err);
    throw err;
  }
};

export const fetchListedNFTs = async () => {
  try {
    const contract = getReadOnlyContract();
    const listed = await contract.getAllListedNFTs();
    
    // Map the blockchain struct to frontend-friendly objects
    const items = await Promise.all(listed.map(async i => {
      const tokenUri = await contract.tokenURI(i.tokenId);
      let meta = { name: "NFT #" + i.tokenId.toString(), image: tokenUri };
      try {
        const res = await fetch(tokenUri);
        const data = await res.json();
        meta = { ...meta, ...data };
      } catch(e) {} // Fallback to tokenUri being the image link directly
      
      return {
        id: i.tokenId.toString(),
        price: ethers.formatEther(i.price),
        seller: i.seller,
        owner: i.owner,
        image: meta.image || meta.imageUrl || tokenUri,
        title: meta.name || meta.title || "NFT #" + i.tokenId.toString()
      };
    }));
    return items;
  } catch (err) {
    console.error("Fetching NFTs failed:", err);
    return [];
  }
};

export const fetchMyNFTs = async () => {
  try {
    // Must use the signer — getMyNFTs() uses msg.sender on-chain to filter by owner
    const contract = await getContract();
    const myNFTs = await contract.getMyNFTs();
    
    // Use a read-only contract for tokenURI lookups (no extra popups)
    const readContract = getReadOnlyContract();
    const items = await Promise.all(myNFTs.map(async i => {
      const tokenUri = await readContract.tokenURI(i.tokenId);
      let meta = { name: "NFT #" + i.tokenId.toString(), image: tokenUri };
      try {
        const res = await fetch(tokenUri);
        const data = await res.json();
        meta = { ...meta, ...data };
      } catch(e) {}
      
      return {
        id: i.tokenId.toString(),
        price: ethers.formatEther(i.price),
        seller: i.seller,
        owner: i.owner,
        image: meta.image || meta.imageUrl || tokenUri,
        title: meta.name || meta.title || "NFT #" + i.tokenId.toString()
      };
    }));
    return items;
  } catch (err) {
    console.error("Fetching my NFTs failed:", err);
    return [];
  }
};

export const buyNFT = async (tokenId, priceInWei) => {
  try {
    const contract = await getContract();
    const txn = await contract.executeSale(tokenId, { value: priceInWei });
    await txn.wait();
    return txn.hash;
  } catch (err) {
    console.error("Buying NFT failed:", err);
    throw err;
  }
};
