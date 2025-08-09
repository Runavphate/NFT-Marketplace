import { useState } from "react";

const Mint = () => {
  const [form, setForm] = useState({ title: "", imageUrl: "", metadataURI: "" });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    // Call mintNFT function from blockchain service
  };

  return (
  <main className="pt-20">
    <div className="bg-black p-6">
      <h2 className="text-xl font-bold mb-4">Mint a New NFT</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" placeholder="Title" className="border px-4 py-2 w-full" onChange={handleChange} />
        <input type="url" name="imageUrl" placeholder="Image URL" className="border px-4 py-2 w-full" onChange={handleChange} />
        <input type="text" name="metadataURI" placeholder="Metadata URI" className="border px-4 py-2 w-full" onChange={handleChange} />
        <button className="bg-gray-500 text-white px-6 py-2 hover:bg-black rounded">Mint NFT</button>
      </form>
    </div>
  </main>
  );
};

export default Mint;
