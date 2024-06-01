import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import ShowOffers from '../Components/ShowOffers';
import Loader from '../Components/Loader';



export default function OffersPage() {
const [offers, setoffers] = useState([]);
const [loading, setloading] = useState(false);
  const GetAllOffers=()=>{ 
    setloading(true)
  const requestOptions = {
    method: "GET",
    
  };  
  fetch("http://localhost:5116/api/ViewAllOffers/GetAllOffers", requestOptions)
    .then((response) => response.json())
    .then((result) => {setoffers(result)})  

    .catch((error) => console.error(error)).finally(()=>setloading(false));
   
  }
  useEffect (()=>{GetAllOffers()}, [])
  return (
    <div>
          <h1 style={{color:"green"}}>הצעות לפינוי </h1>

      {loading && <Loader/>}
     {offers && offers.length>0 && offers.map(offer => <ShowOffers offer={offer}/>) }
      הצעות קיימות
    </div>
  )
}