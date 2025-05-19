
import React from "react";
import "./Button.css";
import Text from "../Text/Text";

function Button({ text, component, onClick, type = "button", className = "" }) {
    return (
        <button type={type} className={`customButton ${className}`} onClick={onClick} >
            {component}
            <Text text={text} />
        </button>
    );
}

export default Button;