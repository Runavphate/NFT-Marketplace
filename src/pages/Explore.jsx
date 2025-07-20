import { useState } from "react";
import NFTCard from "../components/NFTCard";

   const featuredNFTs = [// All NFTs
    {
      id: 1,
      image: "https://i.postimg.cc/WtvnLQHd/NFT-1.jpg",
      title: "Bored Ape 1",
      price: "0.08",
    },
    {
      id: 2,
      image: "https://i.postimg.cc/XB4XHKxv/NFT-2.jpg",
      title: "Bored Ape 2",
      price: "0.12",
    },
    {
      id: 3,
      image: "https://i.postimg.cc/Cds4Fm3m/NFT-3.jpg",
      title: "Bored Ape 3",
      price: "0.2",
    },
    {
      id: 4,
      image: "https://i.postimg.cc/XBLqTZDk/NFT-4.jpg",
      title: "Bored Ape 4",
      price: "0.1",
    },
    {
      id: 5,
      image: "https://i.postimg.cc/D8CdGmyG/NFT-5.jpg",
      title: "Bored Ape 5",
      price: "0.15",
    },
    {
      id: 6,
      image: "https://i.postimg.cc/JG75tjmm/NFT-6.jpg",
      title: "Bored Ape 6",
      price: "0.07",
    },
    {
      id: 7,
      image: "https://i.postimg.cc/k2BNv9Bp/NFT-7.jpg",
      title: "Bored Ape 7",
      price: "0.09",
    },
    {
      id: 8,
      image: "https://i.postimg.cc/mPJYdq92/NFT-8.jpg",
      title: "Bored Ape 8",
      price: "0.11",
    },
       {
      id: 9,
      image: "https://i.postimg.cc/34KQVMnQ/NFTs-1.jpg",
      title: "Astronaut 1",
      price: "0.19",
    },
          {
      id: 10,
      image: "https://i.postimg.cc/SXLpgQLG/NFTs-1.png",
      title: "Astronaut 2",
      price: "0.17",
    },
          {
      id: 11,
      image: "https://i.postimg.cc/bdwjRhZQ/NFTs-2.png",
      title: "Astronaut 3",
      price: "0.22",
    },
          {
      id: 12,
      image: "https://i.postimg.cc/KkJhy9Hk/NFTs-3.png",
      title: "Astronaut 4",
      price: "0.11",
    },
          {
      id: 13,
      image: "https://i.postimg.cc/SnC0KQPp/NFTs-4.png",
      title: "Astronaut 5",
      price: "0.23",
    },
          {
      id: 14,
      image: "https://i.postimg.cc/crKyVBMC/NFTs-5.png",
      title: "Astronaut 6",
      price: "0.10",
    },
          {
      id: 15,
      image: "hhttps://i.postimg.cc/NLCvJzXZ/NFTs-6.png",
      title: "Astronaut 7",
      price: "0.16",
    },
          {
      id: 16,
      image: "https://i.postimg.cc/gnfFdLND/NFTs-7.png",
      title: "Astronaut 8",
      price: "0.11",
    },
          {
      id: 17,
      image: "https://i.postimg.cc/wtpCR8KR/NFTs-8.png",
      title: "Astronaut 9",
      price: "0.17",
    },
  ];
  
const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(8);

  const filteredNFTs =
    selectedCategory === "All"
      ? allNFTs
      : allNFTs.filter(nft => nft.category === selectedCategory);

  const visibleNFTs = filteredNFTs.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 4); // Load 4 NFTS per click
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Explore NFTs</h2>

      {/* Category Filters */}
      <div className="mb-4 flex flex-wrap gap-2">
        {["All", "Apes", "Pixel", "Abstract"].map(cat => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setVisibleCount(8);
            }}
            className={`px-4 py-2 rounded-full border ${
              selectedCategory === cat
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700"
            } hover:bg-indigo-100 transition`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* NFT Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 mb-6">
        {visibleNFTs.map(nft => (
          <NFTCard key={nft.id} {...nft} size="sm" />
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < filteredNFTs.length && (
        <div className="text-center">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Explore;
