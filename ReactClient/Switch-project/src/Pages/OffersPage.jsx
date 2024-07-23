import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import ShowOffers from '../Components/ShowOffers';
import Loader from '../Components/Loader';
import Navbar from '../Components/Navbar';



export default function OffersPage() {
  const factoryName = localStorage.getItem("factoryName");
  return (
    <div>
    <Navbar factoryName={factoryName} />
    <ShowOffers/>
    </div>
  )
}