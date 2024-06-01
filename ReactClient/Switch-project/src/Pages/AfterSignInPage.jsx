import React from 'react'
import { useNavigate } from 'react-router-dom';
import Btn from '../Elements/Btn';




export default function AfterSignInPage() {
    const navigate = useNavigate();
    const factoryName = localStorage.getItem("factoryName");
    const enterClick=()=>{
        navigate('/OffersPage', { state: { } })
    }
    const enterClick1=()=>{
      navigate('/NewOfferPage', { state: { } })
  }
  return (
    <div>    
          {factoryName && <h1 style={{color:"green"}}>{factoryName} שלום</h1>}
              <h1 style={{color:"green"}}>הגעת לאיזור האישי</h1>
                            
              <h2>?מה ברצונך לעשות</h2>
             <br></br>
             <br></br>
             <br></br>
             
              <div style={{ display: 'flex', justifyContent: 'center', gap: '50px' }}>
              <Btn onClick={enterClick}> לקנות חומר גלם</Btn>
              <Btn onClick={enterClick1}> לפנות פסולת</Btn>
   
    </div>
    </div>
  )
}
