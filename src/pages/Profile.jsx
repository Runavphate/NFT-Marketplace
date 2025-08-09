import NFTCard from "../components/NFTCard";

const Explore = () => {
  const listedNFTs = [ /* fetch from contract or dummy */ ];

  return (
    <main className="pt-19">
    <div className="bg-black p-6">
      <h2 className="text-xl text-white font-bold mb-4">Explore NFTs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {listedNFTs.map(nft => <NFTCard key={nft.id} {...nft} />)}
      </div>
    </div>
  </main>
  );
};

export default Explore;
