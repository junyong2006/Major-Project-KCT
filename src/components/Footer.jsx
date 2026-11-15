import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">

      <div className="footer-top">

        <div>
          <h2 className="footer-brand">KWONG CHEONG THYE</h2>

          <div className="footer-links">
            <Link to="/about">About Us</Link>
            <Link to="/products">Products</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/faq">FAQ</Link>
          </div>
        </div>

        <div>
          <p>Address / social links / newsletter placeholder</p>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Kwong Cheong Thye
      </div>

    </footer>
  );
}

export default Footer;