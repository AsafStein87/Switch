import React, { useState } from 'react';
import ComboBox from '../Elements/Dropdown';
import { Box, TextField } from '@mui/material';
import Btn from '../Elements/Btn';


export default function Register() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [FactoryCode, setFactoryCode] = useState();
    const [password, setPassword] = useState();
    const [phone, setPhone] = useState();
    const [FactoryType, setFactoryType] = useState();
    const [FactoryAddress, setFactoryAddress] = useState();

    function RegisterFunc() {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "FactoryName": name,
            "Email": email,
            "Password": password,
            "FactoryPhone": phone,
            "FactoryType": FactoryType,
            "FactoryAddress": FactoryAddress,
            "FactoryCode": FactoryCode
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("http://localhost:5116/api/Factory/Register", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    }

    return (
        <>
            
            <div>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '30%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '80%',
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
                    <img style={{ padding: "30px" }} src="Images/register.png" alt="Register Icon" />
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        <div style={{ flex: 1, marginRight: '10px', display: 'flex', flexDirection: 'column' }}>
                            <TextField label="E-mail" sx={{ marginBottom: '10px' }} onChange={(e) => setEmail(e.target.value)} />
                            <TextField label="כתובת" sx={{ marginBottom: '10px' }} onChange={(e) => setFactoryAddress(e.target.value)} />
                            <TextField label="טלפון" sx={{ marginBottom: '10px' }} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div style={{ flex: 1, marginLeft: '10px', display: 'flex', flexDirection: 'column' }}>
                            <TextField label="שם החברה" sx={{ marginBottom: '10px' }} onChange={(e) => setName(e.target.value)} />
                            <TextField label="ח.פ" sx={{ marginBottom: '10px' }} onChange={(e) => setFactoryCode(e.target.value)} />
                            <TextField label="סיסמא" sx={{ marginBottom: '10px' }} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>

                    <br />
                    <ComboBox sx={{ marginBottom: '10px' }} onSelect={(val) => setFactoryType(val)} />
                    <br />                    
                    <Btn onClick={RegisterFunc}>שמור</Btn>
                </Box>
            </div>
        </>
    );
}
