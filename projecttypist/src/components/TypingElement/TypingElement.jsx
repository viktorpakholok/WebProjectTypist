import TypingInput from "../../components/TypingInput/TypingInput.jsx"
import "./TypingElement.css"
import { useCallback, useContext, useEffect, useState, useRef } from "react";
import { ModeContext } from "../../main.jsx";
import Timer from "../Timer/Timer.jsx";

function TypingElement() {
    const modeValues = useContext(ModeContext);
    // console.log("context", modeValues)

    const [inputValue, setInputValue] = useState(`${modeValues.value}`)
    const [wrongInputText, setWrongInputText] = useState("")
    const [wordsClass, setWordsClass] = useState("")
    const [timeClass, setTimeClass] = useState("")
    const [timeTyping, setTimeTyping] = useState(0)
    // const [typingStarted, setTypingStarted] = useState(false)

    const typingInputRef = useRef(null)
    const timerRef = useRef(null)



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
        timerRef.current.setTimerStarted(false)
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

    // console.log("render: TypingElement")

    return <>
        <div className="modes-manager">
            <button className={wordsClass + " button-type"} value="words" onClick={(e) => changeMode(e)}>words</button>
            <button className={timeClass + " button-type"} value="time" onClick={(e) => changeMode(e)}>time</button>
            <input type="text" onChange={(e) => updateInputValue(e)} value={inputValue} />
            <div>{wrongInputText}</div>

        </div>

        <button className="button-type" onClick={() => typingInputRef.current.resetTypingInput()}>new text</button>
        <Timer refference={timerRef} timeLimit={getTimeValue()} typingInputRef={typingInputRef}></Timer>
        {/* <p className="time-text">time: {timeTyping}s</p> */}

        <TypingInput refference={typingInputRef} wordsCount={getWordsValue()} timeLimit={getTimeValue()} timerRef={timerRef}></TypingInput>
    </>

}

export default TypingElement;