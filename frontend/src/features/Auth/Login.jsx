import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Auth.module.css";
import axios from "axios";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      setLoading(true); // Show loading spinner

      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password },
        config
      );

    
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/"); // Navigate to home or another page
    } catch (error) {
      setLoading(false); // Stop loading in case of error
      setError(
        error.response ? error.response.data.message : "An error occurred"
      );
    }
  };

  return (
    <div className={styles.authContainer}>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage> }
      {loading && <Loading />} 
      <form onSubmit={handleSubmit} className={styles.authFormCard}>
        <h2>Log In</h2>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
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
        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log In"}
        </button>
        <p className={styles.text}>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
