import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Mint from "./pages/Mint";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import { WalletProvider } from "./context/WalletContext";

function App() {
  return (
    <WalletProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mint" element={<Mint />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </Router>
    </WalletProvider>
  );
}

export default App;
