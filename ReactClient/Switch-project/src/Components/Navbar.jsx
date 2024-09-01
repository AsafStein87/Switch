import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import '../StyleSheets/Navbar.css';

const Navbar = (props) => {
    const { factoryName } = props;
    const navigate = useNavigate();
    const handleSignOut = () => {

        localStorage.removeItem('factoryName');
        localStorage.removeItem('factoryCode');
        localStorage.removeItem('password');
        sessionStorage.setItem("reload", false);

        navigate('/SignInPage');
        window.location.reload();
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/" className="navbar-logo-link">
                    <img style={{ height: "100px", padding: "20px" }} src="./Images/switchLogo.ico" alt="Logo" />
                </Link>
            </div>
            <div className="navbar-links">
                <Link to="/WhoWeArePage" className="navbar-link">
                    מי אנחנו
                </Link>
                <Link to="/ActivitiesPage" className="navbar-link">
                    תחומי פעילות 
                </Link>
                

                
                {!factoryName  && (
                    <>
                        <Link to="/RegisterPage" className="navbar-link">
                            הרשמה
                        </Link>
                        <Link to="/SignInPage" className="navbar-link">
                            התחברות 
                        </Link>
                    </>
                )}
                {factoryName && (
                    <>
                    <Link to="/FavoritesPage" className="navbar-link">
                מועדפים               
                </Link>
                <Link to="/NewOfferPage" className="navbar-link" state={{ factoryName }} > 
                לפנות פסולת               
                </Link>
                <Link to="/OffersPage" className="navbar-link">
                לקניית פסולת               
                </Link>
                
                <Link to="/Inbox" className="navbar-link">
                דואר נכנס                
                </Link>

                <div className="navbar-greeting">
    <img src='./Images/person outline.png' alt="Profile Icon" className="profile-icon" />
    <p>שלום {factoryName}</p>
</div>

                        <button className="Btn1" onClick={handleSignOut}>
                            <div className="sign">
                                <svg viewBox="0 0 512 512">
                                    <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                                </svg>
                            </div>
                            <div className="text">התנתקות</div>
                        </button>
                    </>
                )}
            </div>     
        </nav>
    );
};

export default Navbar;
