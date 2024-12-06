import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Auth.module.css';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    if (!error) {
      navigate('/');
    }
  };

  return (
<div className={styles.authContainer}>
  
  
  <form onSubmit={handleSubmit} className={styles.authFormCard}>
    <h2>Log In</h2>
    <div className={styles.formGroup}>
      <label htmlFor="email">User name</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
    </div>
    <div className={styles.formGroup}>
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>
    <div className={styles.formGroup}>
      <label>
        <input type="checkbox" /> Remember me
      </label>
    </div>
    {error && <p className={styles.error}>{error}</p>}
    <button type="submit" className={styles.submitButton}>
      Log In
    </button>
    <p className={styles.text}>Don't have an account? <Link to="/register">Sign Up</Link></p>
  </form>
</div>



  );
};

export default Login;

