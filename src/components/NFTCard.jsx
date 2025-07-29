const NFTCard = ({ image, title, price }) => (
<div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all">
  <img src={nft.image} alt={nft.title} className="rounded-t-lg aspect-square object-cover" />
  <div className="p-4">
    <h2 className="text-xl font-semibold">{nft.title}</h2>
    <p className="text-sm text-gray-500">{nft.creator}</p>
    <div className="flex items-center justify-between mt-4">
      <span className="text-indigo-600 font-bold">{nft.price} ETH</span>
      <button className="text-white bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700 transition">
        Buy Now
      </button>
    </div>
  </div>
</div>
    
export default NFTCard;
