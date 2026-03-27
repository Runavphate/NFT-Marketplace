import { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import contractABI from "../utils/contractABI.json";

const CONTRACT_ADDRESS = "0x0a5A0AF41414c47AEDd289E4f5aC8165CFdD7E5f";
const WalletContext = createContext(null);

export const WalletProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [signer, setSigner] = useState(null);

  // Silently check if already connected on app load
  useEffect(() => {
    const checkConnection = async () => {
      if (!window.ethereum) return;
      try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const s = await provider.getSigner();
          setSigner(s);
          setAddress(accounts[0]);
        }
      } catch (e) {}
    };
    checkConnection();

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length === 0) {
          setSigner(null);
          setAddress(null);
        } else {
          setAddress(accounts[0]);
          const provider = new ethers.BrowserProvider(window.ethereum);
          provider.getSigner().then(setSigner).catch(() => {});
        }
      });
    }
  }, []);

  const connect = async () => {
    if (!window.ethereum) throw new Error("MetaMask not detected");
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("wallet_requestPermissions", [{ eth_accounts: {} }]);
    await provider.send("eth_requestAccounts", []);
    const s = await provider.getSigner();
    setSigner(s);
    setAddress(await s.getAddress());
    return s;
  };

  const getContract = () => {
    if (!signer) throw new Error("Wallet not connected");
    return new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
  };

  return (
    <WalletContext.Provider value={{ address, signer, connect, getContract }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
