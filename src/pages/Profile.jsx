import { useState, useEffect } from "react";
import NFTCard from "../components/NFTCard";
import { fetchListedNFTs } from "../services/blockchain";
import { useWallet } from "../context/WalletContext";
import { ethers } from "ethers";
import contractABI from "../utils/contractABI.json";

const CONTRACT_ADDRESS = "0x0a5A0AF41414c47AEDd289E4f5aC8165CFdD7E5f";
const SEPOLIA_RPC = "https://ethereum-sepolia-rpc.publicnode.com";

const SkeletonCard = () => (
  <div className="glass rounded-2xl overflow-hidden">
    <div className="shimmer aspect-square w-full" />
    <div className="p-4 space-y-3">
      <div className="shimmer h-4 rounded w-3/4" />
      <div className="shimmer h-3 rounded w-1/2" />
      <div className="shimmer h-9 rounded-xl" />
    </div>
  </div>
);

const Profile = () => {
  const { address, signer, connect } = useWallet();
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);

  // Auto-load NFTs whenever the signer becomes available
  useEffect(() => {
    if (!signer || loaded) return;

    const loadNFTs = async () => {
      setLoading(true);
      setError(null);
      try {
        // Use signer contract so msg.sender is correct
        const signerContract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
        const myNFTs = await signerContract.getMyNFTs();

        // Read-only for tokenURI lookups
        const readProvider = new ethers.JsonRpcProvider(SEPOLIA_RPC);
        const readContract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, readProvider);

        const items = await Promise.all(myNFTs.map(async (i) => {
          const tokenUri = await readContract.tokenURI(i.tokenId);
          let meta = { name: "NFT #" + i.tokenId.toString(), image: tokenUri };
          try {
            const res = await fetch(tokenUri);
            const data = await res.json();
            meta = { ...meta, ...data };
          } catch (e) {}
          return {
            id: i.tokenId.toString(),
            price: ethers.formatEther(i.price),
            seller: i.seller,
            owner: i.owner,
            image: meta.image || meta.imageUrl || tokenUri,
            title: meta.name || meta.title || "NFT #" + i.tokenId.toString(),
          };
        }));

        setNfts(items.reverse());
        setLoaded(true);
      } catch (err) {
        console.error(err);
        setError("Could not load your NFTs. Make sure MetaMask is on Sepolia.");
      } finally {
        setLoading(false);
      }
    };

    loadNFTs();
  }, [signer]);

  const handleConnect = async () => {
    try {
      await connect();
    } catch (err) {
      setError("Could not connect wallet.");
    }
  };

  return (
    <main className="min-h-screen pt-28 pb-20 px-6 max-w-7xl mx-auto">
      <div className="mb-8 flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">My Profile</h1>
          <p className="text-gray-500">
            {address
              ? `${address.slice(0, 8)}...${address.slice(-6)}`
              : "Connect your wallet to see your NFTs"}
          </p>
        </div>
        {!address && (
          <button onClick={handleConnect} className="btn-primary text-white px-6 py-3 rounded-full font-semibold">
            Connect Wallet
          </button>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : !address ? (
        <div className="glass rounded-2xl p-20 text-center">
          <div className="text-6xl mb-4">👛</div>
          <h3 className="text-white font-semibold text-lg mb-2">Wallet Not Connected</h3>
          <p className="text-gray-500 text-sm mb-6">Connect your MetaMask wallet to view your NFTs.</p>
          <button onClick={handleConnect} className="btn-primary text-white px-8 py-3 rounded-full font-semibold">
            Connect Wallet
          </button>
        </div>
      ) : error ? (
        <div className="glass rounded-2xl p-12 text-center text-gray-400">{error}</div>
      ) : nfts.length === 0 ? (
        <div className="glass rounded-2xl p-20 text-center">
          <div className="text-5xl mb-4">🖼️</div>
          <h3 className="text-white font-semibold mb-2">No NFTs found</h3>
          <p className="text-gray-500 text-sm">You don't own or have any listed NFTs yet.</p>
        </div>
      ) : (
        <>
          <p className="text-gray-500 text-sm mb-4">{nfts.length} NFT{nfts.length !== 1 ? "s" : ""} in your wallet</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {nfts.map(nft => <NFTCard key={nft.id} {...nft} />)}
          </div>
        </>
      )}
    </main>
  );
};

export default Profile;
