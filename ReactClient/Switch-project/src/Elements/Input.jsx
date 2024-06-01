import React from 'react';

export default function Input(props) {
  const { label, GetValues, children } = props;

  const handleChange = (e) => {
    if (GetValues) {
      GetValues(e.target.value);
    }
  };

  return (
    <>
      <p>{label}</p>
      {children ? (
        React.cloneElement(children, { onChange: handleChange })
      ) : (
        <input type="text" onChange={handleChange} />
      )}
    </>
  );
}
