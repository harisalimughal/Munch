// SplashScreen.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SplashScreen.css"; 

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home"); // Navigate to Home after 5 seconds
    }, 5000); // 5000ms = 5 seconds

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, [navigate]);

  return (
    <div className="splashContainer">
      <h2>MUNCH</h2>
    </div>
  );
};

export default SplashScreen;
