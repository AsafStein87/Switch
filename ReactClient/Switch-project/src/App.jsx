import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Btn from './Elements/Btn'
import Register from './Components/Register'
import SignIn from './Components/SignIn'
import { HashRouter as Router,Routes,Route } from 'react-router-dom'
import SignInPage from './Pages/SignInPage'
import Home from './Pages/HomePage'
import NewOfferPage from './Pages/NewOfferPage'
import RegisterPage from './Pages/RegisterPage'
import Layout from './Components/Layout'
import NewOffer from './Components/NewOffer'
import { Navbar } from 'react-bootstrap'
import OffersPage from './Pages/OffersPage'
import AfterSignInPage from './Pages/AfterSignInPage'
import { WhoWeArePage } from './Pages/WhoWeArePage'
import PicCover from './Components/PicCover'
import { ActivitiesPage } from './Pages/ActivitiesPage'
import FavoritesPage from './Pages/FavoritesPage';
import 'leaflet/dist/leaflet.css';
import MapComponent from './Components/MapComponent'; // Adjust the path as needed
import GoogleMapCom from './Components/GoogleMapCom'
import Inbox from './Components/Inbox'





function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [factoryName, setFactoryName] = useState("");
  const [factoryAddress, setFactoryAddress] = useState("");

  useEffect(() => {
    const userSignedIn = localStorage.getItem('isSignedIn') === 'true';
    setIsSignedIn(userSignedIn);
    if (userSignedIn) {
      setFactoryName(localStorage.getItem('factoryName')); // Assuming you store the factory name in localStorage
      setFactoryAddress(localStorage.getItem('factoryAddress')); 
    }
  }, []);
  return (
    <>
    <Router>
      <Routes>
        <Route element={<Layout/>}>        
        <Route path="/" element={<Home/>}/>
        <Route path="/SignInPage" element={<SignInPage/>}/>
        <Route path="/AfterSignInPage" element={<AfterSignInPage/>}/>
        <Route path="/RegisterPage" element={<RegisterPage/>}/>
        <Route path="/NewOfferPage" element={<NewOfferPage/>}/>       
        <Route path="/WhoWeArePage" element={<WhoWeArePage/>}/>        
        <Route path="/ActivitiesPage" element={<ActivitiesPage/>}/>        
        <Route path="/FavoritesPage" element={<FavoritesPage/>}/> 
        <Route path="/MapComponent" element={<GoogleMapCom />} />
        <Route path="/Inbox" element={<Inbox/>} />
       
 
        </Route>  
        <Route path="/OffersPage" element={<OffersPage/>}/>      
      </Routes>      
    </Router>
    
   
    
    </>
  )
}

export default App
