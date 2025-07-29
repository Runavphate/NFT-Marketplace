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
      <button
        onClick={handleConnect}
        className="bg-indigo-600 text-white px-6 py-3 rounded shadow hover:bg-indigo-700 transition-all w-full"
      >
        {address
          ? `Connected: ${address.slice(0, 6)}...${address.slice(-4)}`
          : "Connect Wallet"}
      </button>
    </div>
  );
};

export default WalletConnect;
