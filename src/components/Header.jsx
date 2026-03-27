import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import WalletConnect from "./WalletConnect";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/mint", label: "Mint" },
    { to: "/explore", label: "Explore" },
    { to: "/profile", label: "Profile" },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? "glass shadow-lg shadow-black/20" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg btn-primary flex items-center justify-center text-sm font-bold">OM</div>
          <span className="text-xl font-bold gradient-text">One Market</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                location.pathname === to
                  ? "bg-[#EC136D]/20 text-[#EC136D]"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <WalletConnect />
      </div>
    </header>
  );
};

export default Header;
