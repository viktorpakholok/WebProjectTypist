import "./Button.css"
import personImage from "../../assets/person.png" 

function Button(props) {
    return (
        <button className="customButton">
            <i><img className="customButton-image" src={personImage}/>  </i> sign up
        </button>
    );
}

export default Button;
