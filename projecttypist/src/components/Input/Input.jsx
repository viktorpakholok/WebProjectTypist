import "./Input.css"

function Input(props) {
    return (
        < input type="text" className="BohdanInput" placeholder={props.placeholderText}/>
    );
}

export default Input;
