import TypingInput from "../../components/TypingInput/TypingInput.jsx"
import "./TypingElement.css"
import { useCallback, useContext, useEffect, useState } from "react";
import { ModeContext } from "../../main.jsx";

function TypingElement() {
    const modeValues = useContext(ModeContext);
    console.log("context", modeValues)
    const [curWordsCount, setCurWordsCount] = useState();
    const [curTimeLimit, setCurTimeLimit] = useState((modeValues.mode === "time") ? modeValues.value : 0);
    const [inputValue, setInputValue] = useState(`${modeValues.value}`)
    const [wrongInputText, setWrongInputText] = useState("")
    const [wordsClass, setWordsClass] = useState("")
    const [timeClass, setTimeClass] = useState("")


    useEffect(() => {
        if (modeValues.mode === "words") {
            setWordsClass("active")
            setTimeClass("")
        }
        else {
            setTimeClass("active")
            setWordsClass("")
        }
        if (!inputValue) return
        const parsedValue = parseInt(inputValue)
        if (isNaN(parsedValue)) {
            setWrongInputText("Wrong input")
            return
        }
        if (parsedValue > 10000) {
            setWrongInputText("input value is larget than 10000")
            return
        }
        if (parsedValue < 1) {
            setWrongInputText("input value is smaller than 1")
            return
        }
        modeValues.setValue(parsedValue)
        setWrongInputText("")
    }, [modeValues.mode, inputValue])

    function changeMode(event) {
        const newMode = event.target.value
        if (newMode === modeValues.mode) return
        modeValues.setMode(event.target.value)
    }

    function updateInputValue(event) {
        setInputValue(event.target.value)
    }

    function getTimeValue() {
        return (modeValues.mode === "time") ? modeValues.value : 0
    }

    function getWordsValue() {
        return (modeValues.mode === "words") ? modeValues.value : 0
    }

    return <>
        <div className="modes-manager">
            <button className={wordsClass} value="words" onClick={(e) => changeMode(e)}>words</button>
            <button className={timeClass} value="time" onClick={(e) => changeMode(e)}>time</button>
            <input type="text" onChange={(e) => updateInputValue(e)} value={inputValue} />
            <div>{wrongInputText}</div>
            {/* <div style={{fontSize: "30px"}}>cur mode: {mode}, {curTimeLimit || curWordsCount}</div> */}

        </div>

        <TypingInput wordsCount={getWordsValue()} timeLimit={getTimeValue()}></TypingInput>
    </>
    
}

export default TypingElement;