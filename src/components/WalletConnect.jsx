import { useWallet } from "../context/WalletContext";

const WalletConnect = () => {
  const { address, connect } = useWallet();

  const handleConnect = async () => {
    try {
      await connect();
    } catch (err) {
      alert("Wallet not detected or connection rejected");
    }
  };

  return (
    <button
      onClick={handleConnect}
      className="btn-primary text-white px-5 py-2 rounded-full text-sm font-semibold"
    >
      {address
        ? `🟢 ${address.slice(0, 6)}...${address.slice(-4)}`
        : "Connect Wallet"}
    </button>
  );
};

export default WalletConnect;
