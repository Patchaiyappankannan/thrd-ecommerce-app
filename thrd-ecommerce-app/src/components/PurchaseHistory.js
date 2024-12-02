import React from 'react';
import '../styles/PurchaseHistory.css';

const PurchaseHistory = ({ purchaseHistoryData }) => {
  return (
    <div className="purchase-history-list">
      {purchaseHistoryData.length === 0 ? (
        <p>No purchase history available.</p>
      ) : (
        <ul>
          {purchaseHistoryData.map((purchase) => (
            <li key={purchase.ProductID}>
              <h4>{purchase.productName}</h4>
              <p>Category: {purchase.productCategory}</p>
              <p>Price: ${purchase.productPrice}</p>
              <p>Purchased on: {purchase.PurchaseDate}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PurchaseHistory;
