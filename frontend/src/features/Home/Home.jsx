import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import * as THREE from "three"; // Required for Vanta.js
import BIRDS from "vanta/dist/vanta.birds.min";
import Footer from '../../components/Footer/Footer';

const Home = () => {
  const vantaRef = useRef(null); // Reference to the container div
  const vantaEffect = useRef(null);

    useEffect(() => {
      let vantaEffect = null;
      if (typeof THREE === "undefined" || !vantaRef.current) {
        console.error("Three.js or target element is not available.");
        return;
      }

      if (!vantaRef.current) return;

      setTimeout(() => {
        try {
          vantaEffect.current = BIRDS({
            el: vantaRef.current, // Target container
            THREE, // Provide the Three.js instance
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            backgroundColor: 0x000000, // Set background color to transparent
            color1: 0xff6347, // Customize bird colors (optional)
            color2: 0x4682b4, // Customize bird colors (optional)
            scale: 1.0,
            scaleMobile: 1.0,
          });
        } catch (error) {
          console.error("[vanta.js] Birds init error: ", error);
        }
      }, 100); // Slight delay to ensure Three.js is loaded

      return () => {
        if (vantaEffect) vantaEffect.destroy();
      };
    }, []);

  return (
    <div
      className={styles.home}
      ref={vantaRef} // Assign the ref to this div
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <div
        ref={vantaRef}
        style={{
          position: "absolute", // Position the effect at the top layer
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 1000, // Set higher z-index for the effect
          pointerEvents: "none", // Ensure clicks pass through
        }}
      ></div>
      <div>
        <div className={styles.hero}>
          <h1>Welcome to Munch Recipe App</h1>
          <p>Find, create, and share mouthwatering recipes with ease.</p>
          <Link to="/recipes" className={styles.cta}>
            Start Cooking Now
          </Link>
        </div>
        <div className={styles.features}>
          <div className={styles.feature}>
            <h2>Discover Recipes</h2>
            <p>
              Explore recipes from all corners of the world and enhance your
              culinary skills.
            </p>
            <Link to="/recipes" className={styles.cta}>
              Discover
            </Link>
          </div>
          <div className={styles.feature}>
            <h2>Create Your Own</h2>
            <p>Share your creations with a vibrant community of food lovers.</p>
            <Link to="/add-recipe" className={styles.cta}>
              Create
            </Link>
          </div>
          <div className={styles.feature}>
            <h2>Plan Your Meals</h2>
            <p>
              Effortlessly organize your weekly meals and create shopping lists
              for the ingredients you need.
            </p>
            <Link to="/meal-planner" className={styles.cta}>
              Plan
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
