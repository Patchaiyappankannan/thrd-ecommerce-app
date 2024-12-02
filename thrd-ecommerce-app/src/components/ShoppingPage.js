import React, { useEffect, useState } from 'react';
import ProductList from './ProductList';
import { loadCSV } from '../utils/csvLoader';
import PurchaseHistory from './PurchaseHistory'; 
import '../styles/ShoppingPage.css'; 

const ShoppingPage = ({ userID }) => {
  const [productsData, setProductsData] = useState([]);
  const [userPurchasedCategories, setUserPurchasedCategories] = useState([]);
  const [purchaseHistoryData, setPurchaseHistoryData] = useState([]); 

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await loadCSV('/data/products.csv');
      setProductsData(products);
    };

    const fetchPurchaseHistory = async () => {
      const purchaseHistory = await loadCSV('/data/purchase_history.csv');

      const userPurchases = purchaseHistory.filter(purchase => purchase.UserID === userID);
      setPurchaseHistoryData(userPurchases);
    };

    fetchProducts();
    fetchPurchaseHistory();
  }, [userID]); 

  const joinedPurchaseHistory = purchaseHistoryData.map((purchase) => {
    const product = productsData.find(
      (product) => product.ProductID === purchase.ProductID
    );
    return {
      ...purchase,
      productName: product ? product.ProductName : 'Product Not Found',
      productCategory: product ? product.Category : 'Category Not Found',
      productPrice: product ? product.Price : 'Price Not Found',
    };
  });


  useEffect(() => {
    const purchasedCategories = joinedPurchaseHistory.map((purchase) => purchase.productCategory);
    setUserPurchasedCategories([...new Set(purchasedCategories)]); 
  }, [joinedPurchaseHistory]);

  return (
    <div className="shopping-page">
      <h2>Welcome, User {userID}</h2>

      <section className="purchase-history">
        <h3>Your Purchase History</h3>
        <PurchaseHistory purchaseHistoryData={joinedPurchaseHistory} />
      </section>

      <section className="product-list">
        <h3>Available Products</h3>
        <ProductList
          products={productsData}
          userPurchasedCategories={userPurchasedCategories}
        />
      </section>
    </div>
  );
};

export default ShoppingPage;
