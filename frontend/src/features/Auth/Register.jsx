import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import styles from "./Auth.module.css";
import classNames from "classnames";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import axios from "axios";
import {Form} from "react-bootstrap";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [picMessage, setPicMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { register, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
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
          "http://localhost:5000/api/users/",
          { name, pic, email, password },
          config
        );
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false);
      } catch (error) {
        setLoading(false); // Stop loading in case of error
        setError(
          error.response ? error.response.data.message : "An error occurred"
        );
      }
    }
    register(name, email, password);
    if (!error) {
      navigate("/");
    }
  };

  const postDetails = async (pics) => {
    if (!pics) {
      setMessage("Please Select an Image");
      return;
    }
    setPicMessage(null);

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      try {
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "harismunch");
        data.append("cloud_name", "harismunch");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/harismunch/image/upload",
          {
            method: "post",
            body: data,
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const cloudinaryData = await response.json();
        console.log("Cloudinary response:", cloudinaryData);
        setPic(cloudinaryData.url.toString());
      } catch (error) {
        console.error("Upload error:", error);
        setPicMessage("Image upload failed");
      }
    } else {
      setPicMessage("Please Select an Image");
    }
  };
  // useEffect(() => {
  //   if (userInfo) {
  //     history.push("/");
  //   }
  // }, [history, userInfo]);

  // const submitHandler = (e) => {
  //   e.preventDefault();

  //   if (password !== confirmpassword) {
  //     setMessage("Passwords do not match");
  //   } else dispatch(register(name, email, password, pic));
  // };

  return (
    <div className={styles.authContainer}>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
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

        <label htmlFor="pic">Profile Picture</label>
        <input
          type="file"
          id="pic"
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />

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
