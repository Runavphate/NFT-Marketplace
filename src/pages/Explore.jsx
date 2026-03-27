import { useState, useEffect } from "react";
import NFTCard from "../components/NFTCard";
import { fetchListedNFTs } from "../services/blockchain";

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

const Explore = () => {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadNFTs = async () => {
      try {
        const listed = await fetchListedNFTs();
        setNfts(listed.reverse());
      } catch (err) {
        console.error(err);
        setError("Failed to load NFTs from blockchain.");
      } finally {
        setLoading(false);
      }
    };
    loadNFTs();
  }, []);

  const filtered = nfts.filter(nft =>
    nft.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen pt-28 pb-20 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Explore NFTs</h1>
        <p className="text-gray-500">Browse all listed NFTs on the marketplace</p>
      </div>

      {/* Search bar */}
      <div className="relative mb-8 max-w-md">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : error ? (
        <div className="glass rounded-2xl p-12 text-center text-gray-400">{error}</div>
      ) : filtered.length === 0 ? (
        <div className="glass rounded-2xl p-20 text-center">
          <div className="text-5xl mb-4">🔮</div>
          <h3 className="text-white font-semibold mb-2">
            {search ? `No results for "${search}"` : "No NFTs listed yet"}
          </h3>
          <p className="text-gray-500 text-sm">
            {search ? "Try a different search term" : "Be the first to mint and list an NFT!"}
          </p>
        </div>
      ) : (
        <>
          <p className="text-gray-500 text-sm mb-4">{filtered.length} item{filtered.length !== 1 ? "s" : ""} found</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {filtered.map(nft => <NFTCard key={nft.id} {...nft} />)}
          </div>
        </>
      )}
    </main>
  );
};

export default Explore;
