import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3>Munch Recipe App</h3>
            <p>Discover, create, and share delicious recipes with food lovers around the world.</p>
          </div>
          <div className={styles.footerSection}>
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/recipes">Recipes</Link></li>
              <li><Link to="/add-recipe">Add Recipe</Link></li>
              <li><Link to="/meal-planner">Meal Planner</Link></li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h3>Connect With Us</h3>
            <ul>
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">Pinterest</a></li>
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; {currentYear} Munch Recipe App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

