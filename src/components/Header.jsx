import { Link } from "react-router-dom";
import WalletConnect from "./WalletConnect";

const Header = () => (
  <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center bg-black px-9 py-4 shadow">
    <h1 className="text-2xl text-white font-bold">One Market</h1>
    <nav className="flex gap-7 text-white" aria-label="Main navigation">
      <Link to="/" className="hover:underline">Home</Link>
      <Link to="/mint" className="hover:underline">Mint</Link>
      <Link to="/explore" className="hover:underline">Explore</Link>
      <Link to="/profile" className="hover:underline">Profile</Link>
    </nav>
    <WalletConnect />
  </header>
);

export default Header;
