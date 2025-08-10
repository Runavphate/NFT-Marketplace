const NFTCard = ({ image, title, price }) => (
<div className="bg-grey-800 rounded-lg shadow-md hover:shadow-xl transition-all">
  <img src={image} alt={title} className="w-70 h-64 rounded-t-lg aspect-1/2 object-cover" />
  <div className="p-4">
    <h2 className="text-xl text-white font-semibold">{title}</h2>
    <div className="flex items-center justify-between mt-4">
      <span className="text-white font-bold">{price} ETH</span>
      <button className="text-white bg-[#EC136D] px-4 py-2 rounded hover:bg-[#A60A4B] transition">
        Learn More
      </button>
    </div>
  </div>
</div>
 );
  
  export default NFTCard;
