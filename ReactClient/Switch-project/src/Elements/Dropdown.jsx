import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox({ onSelect }) {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={top100Films}
      sx={{ width: 250 }}
      onChange={(event, newValue) => {
        if (newValue) {
          onSelect(newValue.label);
        }
      }}
      renderInput={(params) => <TextField {...params} label="סוג פסולת" />}
    />
  );
}

const top100Films = [
  { label: 'Paper' },
  { label: 'Plastic' },
  { label: 'Cardboard' },
  { label: 'Wood' },
];
