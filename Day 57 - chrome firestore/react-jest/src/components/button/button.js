import React from 'react';
import './button.css'

function Button({label}){
    return <div data-testid="button" className="button-style">Hi {label}</div>
}

export default Button;