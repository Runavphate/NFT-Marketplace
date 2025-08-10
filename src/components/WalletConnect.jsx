import { useState } from "react";
import { connectWallet } from "../services/blockchain";

const WalletConnect = () => {
  const [address, setAddress] = useState("");

  const handleConnect = async () => {
    try {
      const account = await connectWallet();
      setAddress(account);
    } catch (err) {
      alert("Wallet not detected");
    }
  };

  return (
    <button onClick={handleConnect} className="bg-[#EC136D] text-white px-4 py-2 rounded hover:bg-[#A60A4B]">
      {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Connect Wallet"}
    </button>
  );
};

export default WalletConnect;
