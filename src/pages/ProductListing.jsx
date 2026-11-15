import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import products from "../data/products";

const categories = [
  "All products",
  "Soy sauce",
  "Cooking sauces",
  "Chilli & condiments",
  "Other products",
];

const PRODUCTS_PER_PAGE = 9;

function ProductListing() {
  const [searchParams] = useSearchParams();

  const categoryFromUrl = searchParams.get("category");

  const initialCategory = {
    "soy-sauces": "Soy sauce",
    "cooking-sauces": "Cooking sauces",
    condiments: "Chilli & condiments",
    "other-products": "Other products",
  }[categoryFromUrl] || "All products";

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState(initialCategory);
  const [sortBy, setSortBy] = useState("featured");
  const [availableOnly, setAvailableOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const keyword = search.toLowerCase();

      result = result.filter((product) =>
        [
          product.name,
          product.nameZh,
          product.category,
          product.id,
        ].some((value) =>
          String(value || "").toLowerCase().includes(keyword)
        )
      );
    }

    if (selectedCategory !== "All products") {
      result = result.filter((product) => {
        const category = product.category.toLowerCase();

        switch (selectedCategory) {
          case "Soy sauce":
            return category.includes("soy");

          case "Cooking sauces":
            return category.includes("sauce") &&
              !category.includes("soy");

          case "Chilli & condiments":
            return (
              category.includes("chilli") ||
              category.includes("chili") ||
              category.includes("condiment")
            );

          case "Other products":
            return !(
              category.includes("soy") ||
              category.includes("sauce") ||
              category.includes("chilli") ||
              category.includes("chili") ||
              category.includes("condiment")
            );

          default:
            return true;
        }
      });
    }

    if (availableOnly) {
      result = result.filter(
        (product) => product.available === true
      );
    }

    if (sortBy === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name-desc") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [search, selectedCategory, sortBy, availableOnly]);

  const totalPages = Math.ceil(
    filteredProducts.length / PRODUCTS_PER_PAGE
  );

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;

  const displayedProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  function handleCategoryChange(category) {
    setSelectedCategory(category);
    setCurrentPage(1);
  }

  function handleSearchChange(value) {
    setSearch(value);
    setCurrentPage(1);
  }

  function handleSortChange(value) {
    setSortBy(value);
    setCurrentPage(1);
  }

  return (
    <main className="products-page">

      <section className="products-heading">
        <h1>Our Products</h1>

        <p className="breadcrumb">
          <Link to="/">Home</Link> / Products
        </p>
      </section>

      <section className="products-toolbar">

        <input
          type="text"
          className="product-search"
          placeholder="Search by product name..."
          value={search}
          onChange={(event) =>
            handleSearchChange(event.target.value)
          }
        />

        <select
          className="product-sort"
          value={sortBy}
          onChange={(event) =>
            handleSortChange(event.target.value)
          }
        >
          <option value="featured">Sort by: Featured</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>

      </section>

      <section className="products-layout">

        <aside className="products-sidebar">

          <h2>Categories</h2>

          <ul className="category-list">
            {categories.map((category) => (
              <li key={category}>
                <button
                  className={
                    selectedCategory === category
                      ? "category-filter selected"
                      : "category-filter"
                  }
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>

          <div className="availability-filter">
            <h3>Filters / Availability</h3>

            <label>
              <input
                type="checkbox"
                checked={availableOnly}
                onChange={(event) => {
                  setAvailableOnly(event.target.checked);
                  setCurrentPage(1);
                }}
              />

              Available products
            </label>
          </div>

        </aside>

        <div className="products-results">

          <p className="results-count">
            Showing {displayedProducts.length} of{" "}
            {filteredProducts.length} products
          </p>

          {displayedProducts.length > 0 ? (
            <div className="products-grid">

              {displayedProducts.map((product) => (
                <article
                  className="catalogue-product-card"
                  key={product.id}
                >

                  <Link to={`/product/${product.slug}`}>
                    <div className="catalogue-product-image">
                      <img
                        src={product.image}
                        alt={product.name}
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />

                      <span>{product.image}</span>
                    </div>
                  </Link>

                  <div className="catalogue-product-info">

                    <h3>{product.name}</h3>

                    <p>{product.description}</p>

                    <Link
                      to={`/product/${product.slug}`}
                      className="view-details-button"
                    >
                      View Details
                    </Link>

                  </div>

                </article>
              ))}

            </div>
          ) : (
            <div className="no-products">
              <h3>No products found</h3>
              <p>Try changing your search or category filters.</p>

              <button
                onClick={() => {
                  setSearch("");
                  setSelectedCategory("All products");
                  setAvailableOnly(false);
                  setCurrentPage(1);
                }}
              >
                Clear Filters
              </button>
            </div>
          )}

          {totalPages > 1 && (
            <div className="products-pagination">

              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage((page) => page - 1)
                }
              >
                Previous
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (
                <button
                  key={page}
                  className={
                    currentPage === page ? "current-page" : ""
                  }
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((page) => page + 1)
                }
              >
                Next
              </button>

            </div>
          )}

        </div>

      </section>

    </main>
  );
}

export default ProductListing;