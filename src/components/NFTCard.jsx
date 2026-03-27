import { useState } from "react";
import { buyNFT } from "../services/blockchain";
import { ethers } from "ethers";

const NFTCard = ({ id, image, title, price, seller }) => {
  const [loading, setLoading] = useState(false);
  const [bought, setBought] = useState(false);

  const handleBuy = async () => {
    if (!id || bought) return;
    try {
      setLoading(true);
      const priceInWei = ethers.parseEther(price.toString());
      const txHash = await buyNFT(id, priceInWei);
      setBought(true);
      alert(`🎉 Purchase successful!\nTX: ${txHash}`);
      setTimeout(() => window.location.reload(), 2000);
    } catch (err) {
      alert("Purchase failed. Make sure your wallet is connected to Sepolia.");
    } finally {
      setLoading(false);
    }
  };

  const shortSeller = seller
    ? `${seller.slice(0, 6)}...${seller.slice(-4)}`
    : null;

  return (
    <div className="glass rounded-2xl overflow-hidden card-hover group">
      {/* Image */}
      <div className="relative overflow-hidden aspect-square">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={e => { e.target.src = "https://via.placeholder.com/400x400/1a1a2e/EC136D?text=NFT"; }}
        />
        {/* Price badge overlaid on image */}
        <div className="absolute top-3 right-3 glass px-3 py-1 rounded-full text-xs font-bold text-[#EC136D]">
          {price} ETH
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-base truncate mb-1">{title || "Unnamed NFT"}</h3>
        {shortSeller && (
          <p className="text-gray-500 text-xs mb-3 truncate">by {shortSeller}</p>
        )}

        <button
          onClick={handleBuy}
          disabled={loading || bought || !id}
          className={`w-full py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
            bought
              ? "bg-green-500/20 text-green-400 border border-green-500/30"
              : "btn-primary text-white"
          } disabled:opacity-60`}
        >
          {bought ? "✅ Purchased!" : loading ? "Processing..." : `Buy for ${price} ETH`}
        </button>
      </div>
    </div>
  );
};

export default NFTCard;
