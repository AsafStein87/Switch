import React, { useState } from 'react';
import { Box, TextField, IconButton, InputAdornment, OutlinedInput, InputLabel, FormControl } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Loader from './Loader';
import Btn from '../Elements/Btn';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function SignIn() {
    const [FactoryCodeSI, setFactoryCodeSI] = useState('');
    const [passwordSI, setPasswordSI] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event) => event.preventDefault();

    function SignInFunc() {
        setLoading(true);
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
            .then((result) => {
                localStorage.setItem("factoryName", result);
                setLoading(false);
                window.location = window.location.hostname + "/#/AfterSignInPage";
            })
            .catch((error) => setLoading(false));
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
                {loading && <Loader />}
                <img style={{ padding: "30px" }} src="/Images/person.png" alt="Register Icon" />

                <TextField 
                    label="ח.פ" 
                    onChange={(e) => setFactoryCodeSI(e.target.value)} 
                    sx={{ width: '220px', marginBottom: '10px' }} 
                />
                <FormControl sx={{ width: '220px', marginBottom: '10px' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">סיסמא</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={passwordSI}
                        onChange={(e) => setPasswordSI(e.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
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
