const NFTCard = ({ image, title, price }) => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition" >
      <img src={image} alt={title} className="w-full h-60 object-cover"/>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{price} ETH</p>
      </div>
    </div>
  );
  
  export default NFTCard;
  