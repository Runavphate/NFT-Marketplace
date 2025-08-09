import { Link } from "react-router-dom";
import WalletConnect from "./WalletConnect";

const Header = () => (
  <header className="flex position:fixed justify-between items-center bg-black px-9 py-4 bg-grey-100 shadow">
    <h1 className="text-2xl text-white font-bold">One Market</h1>
    <nav className="flex gap-7 text-white">
      <Link to="/" className="hover:underline">Home</Link>
      <Link to="/mint" className="hover:underline">Mint</Link>
      <Link to="/explore" className="hover:underline">Explore</Link>
      <Link to="/profile" className="hover:underline">Profile</Link>
    </nav>
    <WalletConnect />
  </header>
);

export default Header;
