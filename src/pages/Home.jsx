import { Link } from "react-router-dom";
import products from "../data/products";

const categories = [
  {
    id: 1,
    name: "Soy Sauces",
    slug: "soy-sauces",
  },
  {
    id: 2,
    name: "Cooking Sauces",
    slug: "cooking-sauces",
  },
  {
    id: 3,
    name: "Condiments",
    slug: "condiments",
  },
  {
    id: 4,
    name: "Other Products",
    slug: "other-products",
  },
];

function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <main className="home-page">

      <section className="hero-section">

        <div className="hero-text">
          <h1>
            Authentic flavour.
            <br />
            Generations of tradition.
          </h1>

          <p>
            text
          </p>

          <Link to="/products" className="home-button">
            Explore Products
          </Link>
        </div>

        <div className="image-placeholder hero-image">
          placeholder
        </div>

      </section>

      <section className="category-section">

        <h2>Explore Our Products</h2>
        <p>Browse by category</p>

        <div className="category-grid">

          {categories.map((category) => (
            <Link
              to={`/products?category=${category.slug}`}
              className="category-card"
              key={category.id}
            >
              <div className="image-placeholder category-image">
                placeholder
              </div>

              <h3>{category.name}</h3>
            </Link>
          ))}

        </div>

      </section>

      <section className="story-section" id="our-story">

        <div className="image-placeholder story-image">
          placeholder
        </div>

        <div className="story-content">
          <h2>Our Story</h2>

          <p>
            A brief introduction to KCT's heritage, values and
            traditional craftsmanship.
          </p>

          <Link to="/about" className="home-button">
            Read More
          </Link>
        </div>

      </section>

      <section className="featured-section">

        <h2>Featured Products</h2>

        <div className="featured-grid">

          {featuredProducts.map((product) => (
            <article className="featured-card" key={product.id}>

              <div className="image-placeholder featured-image">
                placeholder
              </div>

              <div className="featured-info">
                <h3>{product.name}</h3>

                <p>Price / enquiry</p>

                <Link
                  to={`/product/${product.slug}`}
                  className="details-button"
                >
                  View Details
                </Link>
              </div>

            </article>
          ))}

        </div>

      </section>

    </main>
  );
}

export default Home;