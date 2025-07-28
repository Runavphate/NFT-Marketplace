import { Link } from "react-router-dom";
import WalletConnect from "./WalletConnect";

const Header = () => (
  <header className="flex justify-between items-center px-6 py-4 bg-black-100 shadow">
    <img src="./public/Logo.png"></img>
    <h1 className="text-2xl font-bold">One Market</h1>
    <nav className="flex gap-4">
      <Link to="/" className="hover:underline">Home</Link>
      <Link to="/mint" className="hover:underline">Mint</Link>
      <Link to="/explore" className="hover:underline">Explore</Link>
      <Link to="/profile" className="hover:underline">Profile</Link>
    </nav>
    <WalletConnect />
  </header>
);

export default Header;
