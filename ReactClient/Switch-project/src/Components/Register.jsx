import React, { useState } from 'react';
import ComboBox from '../Elements/Dropdown';
import { Box, TextField, Typography  } from '@mui/material';
import Btn from '../Elements/Btn';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [FactoryCode, setFactoryCode] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [FactoryType, setFactoryType] = useState('');
    const [FactoryAddress, setFactoryAddress] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    function RegisterFunc() {
        const newErrors = {};

        const emailPattern = /\S+@\S+\.\S+/;
        const phonePattern = /^\d{10}$/;
        const passwordPattern = /^(?=.*[0-9]{5,})(?=.*[!@#$%^&*])/;

        if (!name) newErrors.name = "נא להזין שם מפעל";
        if (!email) {
            newErrors.email = "נא להזין אימייל";
        } else if (!emailPattern.test(email)) {
            newErrors.email = "כתובת מייל לא חוקית";
        }
        if (!FactoryCode) newErrors.FactoryCode = "נא להזין ח.פ";
        if (!password) {
            newErrors.password = "נא להזין סיסמא";
        } else if (!passwordPattern.test(password)) {
            newErrors.password = "סיסמא צריכה להכיל לפחות 5 ספרות ותו מיוחד";
        }
        if (!phone) {
            newErrors.phone = "נא להזין מספר טלפון עד 10 ספרות";
        } else if (!phonePattern.test(phone)) {
            newErrors.phone = "נא לרשום ספרות בלבד";
        }
        if (!FactoryType) newErrors.FactoryType = "נא לבחור סוג פסולת";
        if (!FactoryAddress) newErrors.FactoryAddress = "נא להזין כתובת";

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

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
            .then((result) => {
                console.log('FactoryCode saved:', FactoryCode);
                localStorage.setItem('factoryAddress', FactoryAddress);
                localStorage.setItem('factoryCode', FactoryCode);
                localStorage.setItem('factoryName', name); // Assuming you want to save the factory name as well
                navigate('/SignInPage');
            })
            .catch((error) => console.error(error));
    }

    return (
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
                <img style={{ padding: "30px" }} src="/Images/register.png" alt="Register Icon" />
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <div style={{ flex: 1, marginRight: '10px', display: 'flex', flexDirection: 'column' }}>
                        <TextField label="E-mail" sx={{ marginBottom: '10px' }} onChange={(e) => setEmail(e.target.value)} 
                        error={!!errors.email}
                        helperText={errors.email}/>
                        <TextField label="כתובת" sx={{ marginBottom: '10px' }} onChange={(e) => setFactoryAddress(e.target.value)} error={!!errors.FactoryAddress} helperText={errors.FactoryAddress} />
                        <TextField label="טלפון" sx={{ marginBottom: '10px' }} onChange={(e) => setPhone(e.target.value)}  error={!!errors.phone} helperText={errors.phone}/>
                    </div>
                    <div style={{ flex: 1, marginLeft: '10px', display: 'flex', flexDirection: 'column' }}>
                        <TextField label="שם החברה" sx={{ marginBottom: '10px' }} onChange={(e) => setName(e.target.value)} error={!!errors.name} helperText={errors.name}/>
                        <TextField label="ח.פ" sx={{ marginBottom: '10px' }} onChange={(e) => setFactoryCode(e.target.value)}  error={!!errors.FactoryCode} helperText={errors.FactoryCode}/>
                        <TextField label="סיסמא" sx={{ marginBottom: '10px' }} onChange={(e) => setPassword(e.target.value)} error={!!errors.password} helperText={errors.password}/>
                    </div>
                </div>

                <br />
                <ComboBox sx={{ marginBottom: '10px' }} onSelect={(val) => setFactoryType(val)} />
                {errors.FactoryType && (
                <Typography color="error" sx={{ marginBottom: '10px' }}>
                    {errors.FactoryType}
                </Typography>
                )}
                <br />
                
                <Btn onClick={RegisterFunc}>שמור</Btn>
            
            </Box>
        </div>
    );
}
