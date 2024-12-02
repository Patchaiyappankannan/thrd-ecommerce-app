import React, { useState } from 'react';
import '../styles/Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = () => {
    setError('');

    if (username === '') {
      setError('Please enter your username');
      return;
    }
    if (password === '') {
      setError('Please enter your password');
      return;
    }

    onLogin(username, password);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}

      <div className="input-group">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label htmlFor="password">Password</label>
        <div className="password-container">
          <input
            id="password"
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="eye-icon"
            onClick={togglePasswordVisibility}
            aria-label={passwordVisible ? 'Hide password' : 'Show password'}
          >
            <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
          </button>
        </div>
      </div>

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
