import "./Button.css"
// import personImage from "../../assets/person.png" 
import Text from "../Text/Text";

function Button(props) {
    return (
        <button className="customButton">
            <i><img className="customButton-image" src={props.image}/>  </i> 
            <Text text={props.text} />
        </button>
    );
}

export default Button;
