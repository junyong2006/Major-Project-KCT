import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="site-header">
      <Link to="/" className="site-logo">
        KCT | KWONG CHEONG THYE
      </Link>

      <nav className="site-nav">
        <Link to="/">Home</Link>
        <a href="/#our-story">Our Story</a>
        <Link to="/products">Products</Link>
        <Link to="/recipes">Recipes</Link>
        <Link to="/contact">Contact Us</Link>
      </nav>
    </header>
  );
}

export default Navbar;