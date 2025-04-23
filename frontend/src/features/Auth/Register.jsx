import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./Auth.module.css";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // For success messages
  const { register, error: authError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      setMessage("Password don't Match");
      return;
    } else {
      setMessage(null);
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        setLoading(true);
        const { data } = await axios.post(
          "/api/users/",
          { name, pic, email, password },
          config
        );

        // Store the user info in local storage
        localStorage.setItem("userInfo", JSON.stringify(data));

        setLoading(false);

        // Set the success message
        setSuccessMessage("User registered successfully!");

        // Optionally, reset the form fields
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } catch (error) {
        setLoading(false); // Stop loading in case of error
        setError(
          error.response ? error.response.data.message : "An error occurred"
        );
      }
    }

    register(name, email, password);

    // Navigate to home if no error
    if (!error) {
      navigate("/"); // or redirect to another page
    }
  };

  return (
    <div className={styles.authContainer}>
      {authError && <ErrorMessage variant="danger">{authError}</ErrorMessage>}
      {loading && <Loading />}

      <form onSubmit={handleSubmit} className={styles.authFormRegCard}>
        <h2>Register</h2>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {/* Display success message */}
        {successMessage && <p className={styles.success}>{successMessage}</p>}

        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.submitButton}>
          Register
        </button>
        <p className={styles.text}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
