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
    <div className="max-w-md mx-auto my-6">
      {!address && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 shadow-sm">
          Wallet not connected.
          <button
            className="underline ml-2 hover:text-red-900"
            onClick={handleConnect}
          >
            Connect Now
          </button>
        </div>
      )}

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
