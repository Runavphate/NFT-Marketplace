const NFTCard = ({ image, title, price }) => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition" >
      <img src={image} alt={title} className="w-full h-40 object-cover"/>
      <div className="p-3 text-sm">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{price} ETH</p>
      </div>
    </div>
  );
  
  export default NFTCard;
  
