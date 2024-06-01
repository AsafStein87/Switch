import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
import Loader from './Loader';
import Btn from '../Elements/Btn';


export default function SignIn() {
    const [FactoryCodeSI, setFactoryCodeSI] = useState();
    const [passwordSI, setPasswordSI] = useState();
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();

    function SignInFunc() {
        setloading(true);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "FactoryCode": FactoryCodeSI,
            "Password": passwordSI
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:5116/api/Factory/SignIn", requestOptions)
            .then((response) => response.text())
            .then((result) => {localStorage.setItem("factoryName", result);
                 
                setloading(false);
                window.location=window.location.hostname+"/#/AfterSignInPage"
            })
            .catch((error) => setloading(false));

    }

    return (
        <>
         <Box
                    sx={{
                        position: 'absolute',
                        top: '30%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '50%',
                        height: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid grey',
                        bgcolor: '#ddece9',
                        boxShadow: 3,
                        borderRadius: 8,
                        p: 2,
                        textAlign: 'center'
                    }}
                >
        
            {loading && <Loader/>}
            <img style={{ padding: "30px" }} src="http://localhost:5174/Images/person.png" alt="Register Icon" />

            <TextField label="ח.פ" onChange={(e) => setFactoryCodeSI(e.target.value)} />
            <br/>
            <TextField label="סיסמא" onChange={(e) => setPasswordSI(e.target.value)} />
            <br />
            <br />
            
            <Btn onClick={SignInFunc}>התחברות</Btn>
            
            <br />
           
            <h3>?'עוד לא נרשמת לסוויצ</h3>
            <Link to="/RegisterPage">                
                <Btn>עבור לעמוד הרישום</Btn>
            </Link>
            </Box>
       
        </>
    );
}
