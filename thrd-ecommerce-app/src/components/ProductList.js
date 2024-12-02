import React from 'react';
import '../styles/ProductList.css';

const ProductList = ({ products, userPurchasedCategories }) => {

  const firstDisplay = products.filter(
    (product) => !userPurchasedCategories.includes(product.Category)
  );
  const secondDisplay = products.filter(
    (product) => userPurchasedCategories.includes(product.Category)
  );

  return (
    <div className="product-list">
      <h3>Recommended Products</h3>
      <h4>New Categories:</h4>
      {firstDisplay.map((product) => (
        <div key={product.ProductID} className="product">
          <img src={product.ImageURL} alt={product.ProductName} />
          <h5>{product.ProductName}</h5>
          <p>{product.Category}</p>
          <p>Price: {product.Price}</p>
        </div>
      ))}
      <h4>Previously Purchased Categories:</h4>
      {secondDisplay.map((product) => (
        <div key={product.ProductID} className="product">
          <img src={product.ImageURL} alt={product.ProductName} />
          <h5>{product.ProductName}</h5>
          <p>{product.Category}</p>
          <p>Price: {product.Price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
