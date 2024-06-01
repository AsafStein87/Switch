import React, { useState } from 'react'
import Input from '../Elements/Input'
import Txt from '../Elements/TxtArea'



export default function NewOffer() {

const [OfferCode,setOfferCode]=useState() 
const [OfferType,setOfferType]=useState()//לשאול את טל
const [FactoryAddress,setFactoryAddress]=useState()
const [StartDate,setStartDate]=useState()
const [EndDate,setEndDate]=useState()
const [Quantity,setQuantity]=useState()
const [Description,setDescription]=useState()
const [ContractorRecommend,setContractorRecommend]=useState()

function AddOffer() { 
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "OfferCode": OfferCode,
  "OfferType": OfferType,
  "FactoryAddress": FactoryAddress,
  "StartDate": StartDate,
  "EndDate": EndDate,
  "Quantity": Quantity,
  "Description": Description,
  "ContractorRecommend": ContractorRecommend
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://localhost:5116/api/AddNewOffer/AddOffer", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
}
  return (
    <div>
        <Input label="קוד הצעה"
        GetValues = {(val)=>setOfferCode(val)} />
        
        
         <Input label="כתובת"
        GetValues = {(val)=>setFactoryAddress(val)} />
         <Input label="תאריך תחילת הצעה"
        GetValues = {(val)=>setStartDate(val)} />
        <Input label="תאריך סיום הצעה"
        GetValues = {(val)=>setEndDate(val)} />
         <Input label="כמות"
        GetValues = {(val)=>setQuantity(val)} />
         <Input label="המלצה לקבלן"
        GetValues = {(val)=>setContractorRecommend(val)} />
            <br></br>
            <br></br>
         <Txt 
        GetText = {(val)=>setDescription(val)} />
        <br></br>
        <button onClick={()=>AddOffer()}>שלח</button>
    </div>
  )
}
