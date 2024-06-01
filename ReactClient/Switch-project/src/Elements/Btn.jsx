import React from 'react';
import "../../src/StyleSheets/Btn.css";

export default function Btn({ children, onClick }) {
    return (
        <button className='btn' onClick={onClick}>
            {children}
        </button>
    );
}
