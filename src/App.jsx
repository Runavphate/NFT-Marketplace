import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import HeroBanner from "../components/HeroBanner";
import Filters from "../components/Filters";
import Mint from "./pages/Mint";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/filters" element={<Filters />} />
        <Route path="/herobanner" element={<HeroBanner />} />
        <Route path="/mint" element={<Mint />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
