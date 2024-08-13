import React, { useState, useEffect } from 'react';
import { Box, TextField, IconButton, InputAdornment, OutlinedInput, InputLabel, FormControl, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import Btn from '../Elements/Btn';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { auth } from './Firebase'; // Import Firebase authentication
import { useNavigate } from 'react-router-dom';


export default function SignIn() {
    const [FactoryCodeSI, setFactoryCodeSI] = useState('');
    const [passwordSI, setPasswordSI] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        
        const savedFactoryCode = localStorage.getItem('factoryCode');
        const savedPassword = localStorage.getItem('password');
        if(savedFactoryCode && savedPassword)
            callAPISignIn(savedFactoryCode , savedPassword);
    }, []);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event) => event.preventDefault();

    const signInAnonymouslyWithFirebase = async () => {
        try {
            const userCredential = await signInAnonymously(auth);
            return userCredential.user;
        } catch (error) {
            setLoading(false);
            setError(error.message);
            throw error;
        }
    };

    const callAPISignIn = async (savedFactoryCode , savedPassword) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "FactoryCode": savedFactoryCode,
            "Password": savedPassword
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        const response = await fetch("http://localhost:5116/api/Factory/SignIn", requestOptions);
        setLoading(false);

        if (!response.ok) {
            throw new Error('Incorrect factory code or password');
        }

        const result = await response.text();
        if (rememberMe) {
            localStorage.setItem('factoryCode', FactoryCodeSI);
            localStorage.setItem('password', passwordSI);
           

        } else {
            localStorage.removeItem('factoryCode');
            localStorage.removeItem('password');
        }
         localStorage.setItem("factoryName", result);
        sessionStorage.setItem("reload", false);
        navigate('/AfterSignInPage');
    };

    const SignInFunc = async () => {    
        console.log("****");    
        setLoading(true);
        setError('');

        try {
            // Step 1: Sign in with your API (SQL authentication)
            await callAPISignIn(FactoryCodeSI , passwordSI);
            // Step 2: If SQL sign-in is successful, sign in anonymously with Firebase
            await signInAnonymouslyWithFirebase();
        } catch (error) {
            // Error handling is already managed in each function
        }
    };

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
                    value={FactoryCodeSI}
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
                <FormControlLabel
                    control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
                    label="זכור אותי"
                    labelPlacement="start"
                    sx={{ marginBottom: '10px' }}
                />
                {error && <Typography color="error" sx={{ marginBottom: '10px' }}>{error}</Typography>}
                <Btn onClick={()=>
                    {SignInFunc()}}>התחברות</Btn>
                <br />
                <h3>?'עוד לא נרשמת לסוויצ</h3>
                <Link to="/RegisterPage">
                    <Btn>עבור לעמוד הרישום</Btn>
                </Link>
            </Box>
        </>
    );
}
