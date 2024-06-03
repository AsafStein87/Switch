import React, { useState } from 'react';
import Txt from '../Elements/TxtArea';
import Btn from '../Elements/Btn';
import { Box, TextField} from '@mui/material';
import ImageButtons from './ImageButtons';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";


export default function NewOffer() {  
  const [OfferType, setOfferType] = useState(); 
  const [FactoryAddress, setFactoryAddress] = useState();
  const [StartDate, setStartDate] = useState();
  const [EndDate, setEndDate] = useState();
  const [Quantity, setQuantity] = useState();
  const [Description, setDescription] = useState();
  const [ContractorRecommend, setContractorRecommend] = useState();

  function AddOffer() {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      
      OfferType: OfferType,
      FactoryAddress: FactoryAddress,
      StartDate: StartDate,
      EndDate: EndDate,
      Quantity: Quantity,
      Description: Description,
      ContractorRecommend: ContractorRecommend
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch('http://localhost:5116/api/AddNewOffer/AddOffer', requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
  }

  return (
    <>
      <div>
     
      <h1 style={{ paddingTop: '55px', color: '#378143', zIndex: 10 }}>העלאת הצעה</h1>
        <Box
        
          sx={{
            position: "relative",
            top: '30%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '160%',
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

          <ImageButtons onImageClick={(type) => setOfferType(type)} />
         
          <TextField label="כתובת" sx={{width: '260px', marginBottom: '10px' }} onChange={(e) => setFactoryAddress(e.target.value)} />          
          <TextField label="כמות"  sx={{width: '260px', marginBottom: '10px' }} onChange={(e) => setQuantity(e.target.value)} /> 
          <TextField label="המלצה לקבלן"  sx={{width: '260px', marginBottom: '20px' }} onChange={(e) =>setContractorRecommend(e.target.value)} /> 
          <LocalizationProvider  dateAdapter={AdapterDayjs}>
          <DatePicker
            label="תאריך תחילת הצעה"
            value={StartDate}
            sx={{ marginBottom: '20px' }}
            onChange={setStartDate}
            inputFormat="yyyy-MM-dd"
            renderInput={(params) => <TextField {...params} sx={{ marginBottom: '10px' }} />}
          />
          </LocalizationProvider>   
          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="תאריך סיום הצעה"
            value={EndDate}
            sx={{ marginBottom: '10px' }}
            onChange={setEndDate}
            inputFormat="yyyy-MM-dd"
            renderInput={(params) => <TextField {...params} sx={{ marginBottom: '10px' }} />}
          />
          </LocalizationProvider>   
          <br />
          <Txt GetText={(val) => setDescription(val)} />
          <br />
          <Btn onClick={() => AddOffer()}>שלח</Btn>
        </Box>
      </div>
    </>
  );
}
