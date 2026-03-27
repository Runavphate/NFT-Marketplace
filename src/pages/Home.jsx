import { useState, useEffect } from "react";
import NFTCard from "../components/NFTCard";
import { fetchListedNFTs } from "../services/blockchain";
import { Link } from "react-router-dom";

// Skeleton card for loading state
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

const Home = () => {
  const [featuredNFTs, setFeaturedNFTs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTrending = async () => {
      try {
        const listed = await fetchListedNFTs();
        setFeaturedNFTs(listed.reverse().slice(0, 4));
      } catch (err) {
        console.error(err);
        setError("Could not connect to blockchain.");
      } finally {
        setLoading(false);
      }
    };
    loadTrending();
  }, []);

  return (
    <main className="min-h-screen" style={{ background: "radial-gradient(ellipse at top, #12071e 0%, #0a0a0f 60%)" }}>
      {/* Hero Section */}
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-xs text-[#EC136D] font-medium mb-6">
          <span className="w-2 h-2 bg-[#EC136D] rounded-full animate-pulse" />
          Live on Sepolia Testnet
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
          Discover &amp; Collect<br />
          <span className="gradient-text">Extraordinary NFTs</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10">
          The premier NFT marketplace on Ethereum Sepolia. Mint, buy, and sell unique digital assets.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link to="/explore" className="btn-primary text-white px-8 py-3 rounded-full font-semibold">
            Explore NFTs
          </Link>
          <Link to="/mint" className="glass text-white px-8 py-3 rounded-full font-semibold border border-white/10 hover:border-[#EC136D]/50 transition-colors">
            Mint Your NFT
          </Link>
        </div>

        {/* Stats bar */}
        <div className="mt-16 grid grid-cols-3 gap-4 max-w-lg mx-auto">
          {[
            { value: "100%", label: "On-chain" },
            { value: "0%", label: "Platform fee" },
            { value: "ETH", label: "Currency" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-xl py-4">
              <div className="text-2xl font-bold gradient-text">{stat.value}</div>
              <div className="text-gray-500 text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending NFTs */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Trending NFTs</h2>
          <Link to="/explore" className="text-sm text-[#EC136D] hover:text-pink-400 transition-colors">
            View all →
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : error ? (
          <div className="glass rounded-2xl p-8 text-center text-gray-400">{error}</div>
        ) : featuredNFTs.length === 0 ? (
          <div className="glass rounded-2xl p-16 text-center">
            <div className="text-5xl mb-4">🎨</div>
            <h3 className="text-white font-semibold mb-2">No NFTs listed yet</h3>
            <p className="text-gray-500 text-sm mb-6">Be the first to mint an NFT on the marketplace!</p>
            <Link to="/mint" className="btn-primary text-white px-6 py-2 rounded-full text-sm font-semibold inline-block">
              Mint Now
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {featuredNFTs.map(nft => <NFTCard key={nft.id} {...nft} />)}
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
