

import React from "react";
import "./Input.css";

function Input({ name, type = "text", placeholderText, value, onChange }) {
    return (
        <input
            type={type}
            name={name}
            className="BohdanInput"
            placeholder={placeholderText}
            value={value}
            onChange={onChange}
            minLength="3"
            maxLength="50"
        />
    );
}

export default Input;