import { useState } from "react";
import { useWallet } from "../context/WalletContext";
import { ethers } from "ethers";
import contractABI from "../utils/contractABI.json";

const CONTRACT_ADDRESS = "0x0a5A0AF41414c47AEDd289E4f5aC8165CFdD7E5f";


const Mint = () => {
  const { signer, connect } = useWallet();
  const [form, setForm] = useState({ title: "", imageUrl: "", metadataURI: "", price: "" });
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.metadataURI || !form.price) {
      alert("Please provide both Metadata URI and Price in ETH.");
      return;
    }
    const priceNum = parseFloat(form.price);
    if (isNaN(priceNum) || priceNum <= 0) {
      alert("Please enter a valid price greater than 0.");
      return;
    }
    setLoading(true);
    setTxHash(null);
    try {
      // Use existing signer or connect if needed
      const activeSigner = signer || await connect();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, activeSigner);
      const priceWei = ethers.parseEther(form.price.toString());
      const txn = await contract.mint(form.metadataURI, priceWei);
      await txn.wait();
      setTxHash(txn.hash);
      setForm({ title: "", imageUrl: "", metadataURI: "", price: "" });
    } catch (err) {
      alert("Minting failed. Make sure MetaMask is connected to Sepolia.");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: "title", label: "Title", type: "text", placeholder: "e.g. Cosmic Ape #001", required: false },
    { name: "imageUrl", label: "Image URL (Preview)", type: "url", placeholder: "https://...", required: false },
    { name: "metadataURI", label: "Metadata URI *", type: "text", placeholder: "ipfs://... or https://...", required: true },
    { name: "price", label: "Listing Price (ETH) *", type: "number", placeholder: "e.g. 0.05", required: true },
  ];

  return (
    <main className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Mint NFT</h1>
          <p className="text-gray-500">Create and list your NFT on the marketplace</p>
        </div>

        {/* Preview */}
        {form.imageUrl && (
          <div className="glass rounded-2xl overflow-hidden mb-6">
            <img src={form.imageUrl} alt="Preview" className="w-full max-h-64 object-cover" onError={e => e.target.style.display = "none"} />
            <div className="p-4">
              <p className="text-white font-semibold">{form.title || "Untitled NFT"}</p>
              {form.price && <p className="text-[#EC136D] text-sm font-bold mt-1">{form.price} ETH</p>}
            </div>
          </div>
        )}

        {/* Form */}
        <div className="glass rounded-2xl p-6">
          {txHash ? (
            <div className="text-center py-6">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="text-white font-semibold text-lg mb-2">NFT Minted Successfully!</h3>
              <p className="text-gray-500 text-sm mb-4">Your NFT is now listed on the marketplace.</p>
              <a
                href={`https://sepolia.etherscan.io/tx/${txHash}`}
                target="_blank"
                rel="noreferrer"
                className="text-[#EC136D] text-sm hover:underline"
              >
                View transaction on Etherscan ↗
              </a>
              <br />
              <button
                onClick={() => setTxHash(null)}
                className="mt-4 glass px-6 py-2 rounded-full text-sm text-white border border-white/10 hover:border-[#EC136D]/50 transition-colors"
              >
                Mint Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {fields.map(({ name, label, type, placeholder }) => (
                <div key={name}>
                  <label className="block text-sm font-medium text-gray-400 mb-2">{label}</label>
                  <input
                    type={type}
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    placeholder={placeholder}
                    step={type === "number" ? "0.001" : undefined}
                    className="input-field"
                  />
                </div>
              ))}

              <div className="glass rounded-xl p-4 border border-yellow-500/20">
                <p className="text-yellow-400 text-xs font-medium mb-1">⚡ How minting works</p>
                <p className="text-gray-500 text-xs">
                  Clicking Mint will open MetaMask on Sepolia. Your NFT will be immediately listed at the price you set. No platform fee is charged.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary text-white w-full py-3 rounded-xl font-semibold text-base"
              >
                {loading ? "⏳ Minting on Sepolia..." : "🚀 Mint & List NFT"}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
};

export default Mint;
