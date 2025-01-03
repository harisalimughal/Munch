import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaPlusCircle,
  FaCalendarAlt,
  FaBars,
  FaUser,
} from "react-icons/fa"; // Importing icons
import styles from './Header.module.css'; // Import the CSS module file
import { NavDropdown, Navbar,Nav } from 'react-bootstrap';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.navBrand}>
        <h1 className={styles.title}>Munch</h1>
        <p className={styles.subtitle}>where recipe shines</p>
      </div>
      {/* Hamburger Menu Button for small screens */}
      <button className={styles.hamburgerButton} onClick={toggleMenu}>
        <FaBars />
      </button>
      {/* Navigation Links */}
      <div
        className={`${styles.navButtons} ${
          isMenuOpen ? styles.navButtonsOpen : ""
        }`}
      >
        <Link to="/home" className={styles.navButton}>
          <FaHome className={styles.navIcon} /> Home
        </Link>
        <Link to="/add-recipe" className={styles.navButton}>
          <FaPlusCircle className={styles.navIcon} /> Add Recipe
        </Link>
        <Link to="/meal-planner" className={styles.navButton}>
          <FaCalendarAlt className={styles.navIcon} /> Meal Planner
        </Link>
          <Link to="/login" className={styles.navButton}>
            <FaUser className={styles.navIcon} /> Login
          </Link>

          <Link
            to="/login"
            className={styles.navButton}
            onClick={() => {
              localStorage.removeItem("userInfo");
              alert("User Logout Successfully, Now Login");
            }}
          >
            <FaUser className={styles.navIcon} /> Logout
          </Link>
      
      </div>
    </nav>
  );
}

export default Header;
