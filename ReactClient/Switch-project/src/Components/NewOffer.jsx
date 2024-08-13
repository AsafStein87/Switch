import React, { useState, useEffect } from 'react';
import Txt from '../Elements/TxtArea';
import Btn from '../Elements/Btn';
import { Box, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import ImageButtons from './ImageButtons';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from 'dayjs';

export default function NewOffer() {
  const [OfferType, setOfferType] = useState('');
  const [factoryAddress, setFactoryAddress] = useState('');
  const [factoryCode, setFactoryCode] = useState('');
  const [factoryName, setFactoryName] = useState('');
  const [StartDate, setStartDate] = useState(dayjs());
  const [EndDate, setEndDate] = useState(dayjs());
  const [Quantity, setQuantity] = useState('');
  const [Description, setDescription] = useState('');
  const [ContractorRecommend, setContractorRecommend] = useState('');
  const [popupOpen, setPopupOpen] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const storedFactoryCode = localStorage.getItem("factoryCode");
    if (storedFactoryCode) {
      setFactoryCode(storedFactoryCode);
      console.log("factoryCode retrieved from local storage:", storedFactoryCode);
    }

    const storedFactoryName = localStorage.getItem("factoryName");
    if (storedFactoryName) {
      setFactoryName(storedFactoryName);
      console.log("factoryName retrieved from local storage:", storedFactoryName);
    }

    const storedFactoryAddress = localStorage.getItem("factoryAddress");
    if (storedFactoryAddress) {
      setFactoryAddress(storedFactoryAddress);
      console.log("factoryAddress retrieved from local storage:", storedFactoryAddress);
    }
}, []);

  useEffect(() => {
    console.log("factoryCode", factoryCode);
    console.log("factoryAddress", factoryAddress);
    console.log("factoryName", factoryName);
  }, [factoryCode, factoryAddress]);

  const AddOffer = () => {
    if (!OfferType || !ContractorRecommend || !StartDate || !EndDate || !Quantity) {
      setError(true);
      return;
    }

    setError(false);
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const offerData = {
      factoryCode,
      OfferType,
      factoryAddress,
      StartDate: StartDate.format('YYYY-MM-DD'),
      EndDate: EndDate.format('YYYY-MM-DD'),
      Quantity,
      Description,
      ContractorRecommend,
    };

    console.log('Offer Data:', offerData);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(offerData),
      redirect: 'follow'
    };

    fetch('http://localhost:5116/api/AddNewOffer/AddOffer', requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then((result) => {
        console.log(result);
        setPopupOpen(true);
      })
      .catch((error) => console.error('Error:', error));
  };

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
          <TextField label="כמות" sx={{ width: '260px', marginBottom: '10px' }} onChange={(e) => setQuantity(e.target.value)} />
          <TextField label="המלצה לקבלן" sx={{ width: '260px', marginBottom: '20px' }} onChange={(e) => setContractorRecommend(e.target.value)} />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="תאריך תחילת הצעה"
              value={StartDate}
              sx={{ marginBottom: '20px' }}
              onChange={(newValue) => setStartDate(newValue)}
              minDate={dayjs()}
              inputFormat="YYYY-MM-DD"
              renderInput={(params) => <TextField {...params} sx={{ marginBottom: '10px' }} />}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="תאריך סיום הצעה"
              value={EndDate}
              sx={{ marginBottom: '10px' }}
              onChange={(newValue) => setEndDate(newValue)}
              minDate={dayjs()}
              inputFormat="YYYY-MM-DD"
              renderInput={(params) => <TextField {...params} sx={{ marginBottom: '10px' }} />}
            />
          </LocalizationProvider>
          <br />
          <Txt GetText={(val) => setDescription(val)} />
          <br />
          {error && <p style={{ color: 'red' }}>יש למלא את כל השדות</p>}
          <Btn onClick={AddOffer}>שלח</Btn>
        </Box>
      </div>

      <Dialog open={popupOpen} onClose={() => setPopupOpen(false)}>
        <DialogTitle sx={{ direction: 'rtl' }}>הצעה נוספה בהצלחה</DialogTitle>
        <DialogContent sx={{ direction: 'rtl' }}>
          <DialogContentText sx={{ direction: 'rtl' }}>
            ההצעה נוספה בהצלחה למערכת!
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ direction: 'rtl' }}>
          <Button onClick={() => setPopupOpen(false)}>סגור</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
