import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import ProductListing from "./pages/ProductListing";
import ProductDetails from "./pages/ProductDetails";

function Placeholder({ title }) {
  return (
    <main className="page-content">
      <h1>{title}</h1>
      <p>This page will be implemented later.</p>
    </main>
  );
}

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductListing />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/recipes" element={<Placeholder title="Recipes" />} />
        <Route path="/recipe/:slug" element={<Placeholder title="Recipe Details" />} />
        <Route path="/about" element={<Placeholder title="About Us" />} />
        <Route path="/contact" element={<Placeholder title="Contact Us" />} />
        <Route path="/faq" element={<Placeholder title="FAQ" />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;