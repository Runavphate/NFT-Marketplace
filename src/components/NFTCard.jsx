const NFTCard = ({ image, title, price }) => (
<div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all">
  <img src={image} alt={title} className="rounded-t-lg aspect-square object-cover" />
  <div className="p-4">
    <h2 className="text-xl font-semibold">{title}</h2>
    <div className="flex items-center justify-between mt-4">
      <span className="text-indigo-600 font-bold">{price} ETH</span>
      <button className="text-white bg-gray-600 px-4 py-2 rounded hover:bg-black-600 transition">
        Buy Now
      </button>
    </div>
  </div>
</div>
 );
  
  export default NFTCard;
