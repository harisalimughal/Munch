import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaPlusCircle, FaCalendarAlt } from 'react-icons/fa';  // Adding icons for navigation

function Header() {
  return (
    <nav className="nav">
      <ul className="nav-list">
        <li><Link to="/" className="nav-link"><FaHome /> Home</Link></li>
        <li><Link to="/add-recipe" className="nav-link"><FaPlusCircle /> Add Recipe</Link></li>
        <li><Link to="/meal-planner" className="nav-link"><FaCalendarAlt /> Meal Planner</Link></li>
        {/* Add more navigation links here */}
      </ul>
    </nav>
  );
}

export default Header;
