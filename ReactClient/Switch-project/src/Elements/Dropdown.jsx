import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


const options = [
  { label: 'נייר', value: 'Paper' },
  { label: 'פלסטיק', value: 'Plastic' },
  { label: 'קרטון', value: 'Cardboard' },
  { label: 'עץ', value: 'Wood' },
];

export default function ComboBox({ onSelect }) {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      sx={{ width: 250 }}
      onChange={(event, newValue) => {
        if (newValue) {
          onSelect(newValue.value);
        }
      }}
      renderInput={(params) => <TextField {...params} label="סוג פסולת" />}
    />
  );
}


