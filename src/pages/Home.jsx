import NFTCard from "../components/NFTCard";

const Home = () => {
  const featuredNFTs = [
    {
      id: 1,
      image: "https://i.postimg.cc/WtvnLQHd/NFT-1.jpg",
      title: "Bored Ape 1",
      price: "0.08",
    },
    {
     id: 2,
      image: "https://i.postimg.cc/KkJhy9Hk/NFTs-3.png",
      title: "Astronaut 4",
      price: "0.11",
    },
    {
      id: 3,
      image: "https://i.postimg.cc/gnfFdLND/NFTs-7.png",
      title: "Astronaut 8",
      price: "0.11",
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
      image: "https://i.postimg.cc/wtpCR8KR/NFTs-8.png",
      title: "Astronaut 9",
      price: "0.17",
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
  ];
  
  return (
    <div className="p-6">
      <h2 className=" items-center text-2xl text-white font-bold mb-4">Trending NFTs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {featuredNFTs.map(nft => (
          <NFTCard key={nft.id} {...nft} />
        ))}
      </div>
    </div>
  );
};

export default Home;
