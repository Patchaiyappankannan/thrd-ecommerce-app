import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import ShoppingPage from './components/ShoppingPage';
import { loadCSV } from './utils/csvLoader';

const App = () => {
  const [userID, setUserID] = useState(null);
  const [usersData, setUsersData] = useState([]);
  const [purchaseHistoryData, setPurchaseHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [users, purchases] = await Promise.all([
          loadCSV('/data/users.csv'),
          loadCSV('/data/purchase_history.csv')
        ]);

        setUsersData(users);
        setPurchaseHistoryData(purchases);
      } catch (error) {
        console.error('Error loading data:', error);
        alert('Failed to load data. Please try again later.');
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, []);

  const handleLogin = (username, password) => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    const user = usersData.find(
      (user) => user.Username === trimmedUsername && user.Password === trimmedPassword
    );

    if (user) {
      setUserID(user.UserID);
    } else {
      alert('Invalid credentials');
    }
  };

  if (loading) {
    return <div>Loading data...</div>; 
  }

  return (
    <div className="app">
      {userID ? (
        <ShoppingPage userID={userID} purchaseHistory={purchaseHistoryData} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
