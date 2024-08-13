import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Btn from '../Elements/Btn';

export default function AfterSignInPage() {
    const navigate = useNavigate();
    const factoryName = localStorage.getItem("factoryName");
    const enterClick = () => {
        navigate('/OffersPage', { state: {} });
    }

    const enterClick1 = () => {
        navigate('/NewOfferPage', { state: {} });
    }
    useEffect(()=>{
        if( sessionStorage.getItem("reload")=="false"){   
            sessionStorage.setItem("reload", true);

        window.location.reload()}
},[])
    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
            <video
                autoPlay
                loop
                muted
                poster="/Images/AfterSI.mp4"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            >
                <source src="/Images/AfterSI.mp4" type="video/mp4" />
            </video>
            
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'green'
            }}>
                {factoryName && <h1>{factoryName} שלום</h1>}
                <h1>הגעת לאיזור האישי</h1>
                <h2>?מה ברצונך לעשות</h2>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', marginTop: '20px' }}>
                    <Btn onClick={enterClick}> לקנות חומר גלם</Btn>
                    <Btn onClick={enterClick1}> לפנות פסולת</Btn>
                </div>
            </div>
        </div>
    );
}
