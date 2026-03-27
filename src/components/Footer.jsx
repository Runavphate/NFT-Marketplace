const Footer = () => (
  <footer className="border-t border-white/5 py-8 mt-10">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-md btn-primary flex items-center justify-center text-xs font-bold">OM</div>
        <span className="text-sm font-semibold gradient-text">One Market</span>
      </div>
      <p className="text-gray-600 text-xs">
        © {new Date().getFullYear()} One Market. Deployed on Sepolia Testnet.
      </p>
      <a
        href={`https://sepolia.etherscan.io/address/0x0a5A0AF41414c47AEDd289E4f5aC8165CFdD7E5f`}
        target="_blank"
        rel="noreferrer"
        className="text-xs text-gray-600 hover:text-[#EC136D] transition-colors"
      >
        View Contract ↗
      </a>
    </div>
  </footer>
);

export default Footer;
