import { useState } from 'react'
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




function App() {
  const [count, setCount] = useState(0)

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
 
        </Route>  
        <Route path="/OffersPage" element={<OffersPage/>}/>      
      </Routes>      
    </Router>
    
   
    
    </>
  )
}

export default App
