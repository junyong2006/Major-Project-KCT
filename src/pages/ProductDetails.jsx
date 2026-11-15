
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import products from "../data/products";

function ProductDetails() {
  const { slug } = useParams();

  const product = products.find((item) => item.slug === slug);

  const [selectedImage, setSelectedImage] = useState(
    product?.image || ""
  );

  const [selectedPack, setSelectedPack] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("Description");

  if (!product) {
    return (
      <main className="product-not-found">
        <h1>Product not found</h1>
        <p>The product you are looking for does not exist.</p>
        <Link to="/products">Back to Products</Link>
      </main>
    );
  }

  const productImages =
    product.images?.length > 0
      ? product.images
      : [product.image].filter(Boolean);

  const packagingOptions = Array.isArray(product.packaging)
    ? product.packaging
    : product.packaging
      ? [product.packaging]
      : [];

  const tabs = [
    "Description",
    "Ingredients",
    "Storage",
    "Nutrition",
  ];

  function getPackagingLabel(option) {
    if (typeof option === "string") {
      return option;
    }

    return option.label || option.size || option.name || "";
  }

  function renderTabContent() {
    switch (activeTab) {
      case "Description":
        return (
          <div>
            <p>
              {product.description ||
                "Product information and specifications to be confirmed with KCT."}
            </p>

            {product.purchase && (
              <p className="additional-product-info">
                <strong>Purchase information:</strong>{" "}
                {product.purchase}
              </p>
            )}

            {product.halal && (
              <p className="additional-product-info">
                <strong>Halal:</strong> {String(product.halal)}
              </p>
            )}

            {product.nutriGrade && (
              <p className="additional-product-info">
                <strong>Nutri-Grade:</strong> {product.nutriGrade}
              </p>
            )}

            {product.healthierChoice && (
              <p className="additional-product-info">
                <strong>Healthier Choice:</strong>{" "}
                {String(product.healthierChoice)}
              </p>
            )}
          </div>
        );

      case "Ingredients":
        return (
          <div>
            <p>
              {product.ingredients ||
                "Ingredients information to be confirmed with KCT."}
            </p>

            {product.allergens && (
              <p className="additional-product-info">
                <strong>Allergens:</strong> {product.allergens}
              </p>
            )}
          </div>
        );

      case "Storage":
        return (
          <p>
            {product.storage ||
              "Storage instructions to be confirmed with KCT."}
          </p>
        );

      case "Nutrition":
        if (!product.nutrition || product.nutrition.length === 0) {
          return (
            <p>
              Nutritional information to be confirmed with KCT.
            </p>
          );
        }

        return (
          <table className="nutrition-table">
            <thead>
              <tr>
                <th>Nutritional Information</th>
                <th>Amount</th>
              </tr>
            </thead>

            <tbody>
              {product.nutrition.map((item, index) => (
                <tr key={index}>
                  <td>
                    {item.name || item.label || item.nutrient}
                  </td>
                  <td>
                    {item.value || item.amount || item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );

      default:
        return null;
    }
  }

  function handleEnquiry() {
    if (packagingOptions.length > 0 && !selectedPack) {
      alert("Please select a pack size first.");
      return;
    }

    alert(
      `Enquiry for ${product.name}\n` +
      `Pack size: ${selectedPack || "Not specified"}\n` +
      `Quantity: ${quantity}`
    );
  }

  return (
    <main className="product-details-page">

      <div className="product-breadcrumb">
        <Link to="/">Home</Link>
        {" / "}
        <Link to="/products">Products</Link>
        {" / "}
        {product.name}
      </div>

      <section className="product-main-section">

        <div className="product-gallery">

          <div className="main-product-image">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt={product.name}
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            ) : null}

            <span>{product.image}</span>
          </div>

          <div className="product-thumbnails">

            {[0, 1, 2, 3].map((index) => {
              const image = productImages[index];

              return (
                <button
                  key={index}
                  className={
                    selectedImage === image
                      ? "product-thumbnail active"
                      : "product-thumbnail"
                  }
                  onClick={() => {
                    if (image) {
                      setSelectedImage(image);
                    }
                  }}
                  disabled={!image}
                  aria-label={`View product image ${index + 1}`}
                >
                  {image ? (
                    <img src={image} alt="" />
                  ) : (
                    <span>placeholders</span>
                  )}
                </button>
              );
            })}

          </div>

        </div>

        <div className="product-information">

          <h1>{product.name}</h1>

          {product.nameZh && (
            <p className="product-chinese-name">
              {product.nameZh}
            </p>
          )}

          <p className="product-category">
            {product.category || "Category"} / Product code /{" "}
            {product.id}
          </p>

          <p className="product-description">
            {product.description ||
              "Product overview and description. Include packaging, taste profile and suggested uses."}
          </p>

          <div className="product-option-group">

            <label htmlFor="pack-size">
              Pack size / variants
            </label>

            <select
              id="pack-size"
              value={selectedPack}
              onChange={(event) =>
                setSelectedPack(event.target.value)
              }
            >
              <option value="">Select pack size</option>

              {packagingOptions.map((option, index) => {
                const label = getPackagingLabel(option);

                return (
                  <option key={index} value={label}>
                    {label}
                  </option>
                );
              })}
            </select>

          </div>

          <div className="product-option-group">

            <label>Quantity</label>

            <div className="quantity-selector">

              <button
                onClick={() =>
                  setQuantity((current) =>
                    Math.max(1, current - 1)
                  )
                }
                aria-label="Decrease quantity"
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                onClick={() =>
                  setQuantity((current) => current + 1)
                }
                aria-label="Increase quantity"
              >
                +
              </button>

            </div>

          </div>

          <button
            className="product-enquiry-button"
            onClick={handleEnquiry}
          >
            Enquire / Add to Cart
          </button>

        </div>

      </section>

      <section className="product-extra-section">

        <div className="product-tabs">

          {tabs.map((tab) => (
            <button
              key={tab}
              className={
                activeTab === tab
                  ? "product-tab active"
                  : "product-tab"
              }
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}

        </div>

        <div className="product-tab-content">
          {renderTabContent()}
        </div>

      </section>

    </main>
  );
}

export default ProductDetails;
