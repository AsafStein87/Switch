import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import '../StyleSheets/Navbar.css';


const Navbar = (props) => {
 const {factoryName}=props;
  return (
    
    <nav className="navbar">
      <div className="navbar-logo">
      <Link to="/" className="navbar-logo-link">
      <img style={{height:"100px", padding: "20px"}} src="/Images/switchLogo.ico" alt="Logo" />
      </Link>

      </div>
      <div className="navbar-links">
        <Link to="/WhoWeArePage" className="navbar-link">
          מי אנחנו
        </Link>
        <Link to="/ActivitiesPage" className="navbar-link">
          תחומי פעילות 
        </Link>
        <Link to="/" className="navbar-link">
          יצירת קשר
        </Link>
        {!factoryName && <Link to="/RegisterPage" className="navbar-link">
          הרשמה
        </Link>}
        {!factoryName && <Link to="/SignInPage" className="navbar-link">
          התחברות 
        </Link>}
        {factoryName && (
          <div className="navbar-greeting">
            <img src='/Images/person outline.png' alt="Profile Icon" className="profile-icon" />
            <p>שלום {factoryName}</p>
          </div>
        )}
        
      </div>     
    </nav>
  );
};

export default Navbar;
