// import "./Input.css"

// function Input(props) {
//     return (
//         < input type="text" className="BohdanInput" placeholder={props.placeholderText}/>
//     );
// }

// export default Input;


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
    />
  );
}

export default Input;