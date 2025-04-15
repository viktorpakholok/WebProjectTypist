// import "./Button.css"
// // import personImage from "../../assets/person.png" 
// import Text from "../Text/Text";

// function Button(props) {
//     return (
//         <button className="customButton">
//             <i><img className="customButton-image" src={props.image}/>  </i> 
//             <Text text={props.text} />
//         </button>
//     );
// }

// export default Button;


import React from "react";
import "./Button.css";
import Text from "../Text/Text";

function Button({ text, image, onClick, type = "button", className = "" }) {
  return (
    <button
      type={type}
      className={`customButton ${className}`}
      onClick={onClick}
    >
      {image && (
        <img
          className="customButton-image"
          src={image}
          alt={text}
        />
      )}
      <Text text={text} />
    </button>
  );
}

export default Button;