import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  //  useEffect(() => {
  //    const userInfo = localStorage.getItem("userInfo");

  //    if (userInfo) {
  //      navigate("/");
  //    }
  //  }, []);

  return (
    <div className={styles.home}>
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
  );
};

export default Home;
