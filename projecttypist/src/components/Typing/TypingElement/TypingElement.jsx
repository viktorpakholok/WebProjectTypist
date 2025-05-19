import TypingInput from "../TypingInput/TypingInput.jsx";
import "./TypingElement.css"
import { useCallback, useContext, useEffect, useState, useRef } from "react";
import { ModeContext } from "../../../main.jsx";
import Timer from "../Timer/Timer.jsx";

function TypingElement() {
    const modeValues = useContext(ModeContext);
    // console.log("context", modeValues)

    const [inputValue, setInputValue] = useState(`${modeValues.value}`)
    const [wrongInputText, setWrongInputText] = useState("")
    const [wordsClass, setWordsClass] = useState(modeValues.mode === "words" ? "active": "")
    const [timeClass, setTimeClass] = useState(modeValues.mode === "time" ? "active": "")

    const typingInputRef = useRef(null)
    const timerRef = useRef(null)


    const applyInputValue = useCallback((newInputValue) => {
        if (!newInputValue) return
        const parsedValue = parseInt(newInputValue)
        if (isNaN(parsedValue) || !(/^-?\d+(\.\d+)?$/.test(newInputValue))) {
            setWrongInputText("Wrong input!")
            return
        }
        if (parsedValue > 10000) {
            setWrongInputText("Input value is larget than 10000!")
            // alert("Input value is larget than 10000!");
            return
        }
        if (parsedValue < 2) {
            setWrongInputText("Input value is smaller than 2!")
            // alert("Input value is smaller than 2!")
            return
        }
        modeValues.setValue(parsedValue)
        setWrongInputText("")
        timerRef.current.setTimerStarted(false)
    }, [])

    function changeMode(event) {
        const newMode = event.target.value
        if (newMode === modeValues.mode) return
        if (newMode === "words") {
            setWordsClass("active")
            setTimeClass("")
        }
        else {
            setTimeClass("active")
            setWordsClass("")
        }
        modeValues.setMode(event.target.value)
    }

    function updateInputValue(event) {
        const newInputValue = event.target.value
        applyInputValue(newInputValue)
        setInputValue(newInputValue)
    }

    function getTimeValue() {
        return (modeValues.mode === "time") ? modeValues.value : 0
    }

    function getWordsValue() {
        return (modeValues.mode === "words") ? modeValues.value : 0
    }

    // const renderingIter = useRef(0);
    // renderingIter.current += 1
    // console.log("render: TypingElement", renderingIter.current)


    return <>
        <div className="modes-container">
        <div className="modes-manager">
            <button className={wordsClass + " button-type"} value="words" onClick={(e) => changeMode(e)}>words</button>
            <button className={timeClass + " button-type"} value="time" onClick={(e) => changeMode(e)}>time</button>
            <input className="mode-input" type="text" onChange={(e) => updateInputValue(e)} value={inputValue} />
            <button className="button-type" onClick={() => typingInputRef.current.resetTypingInput()}>new text</button>
        </div>
            <div className="wrongInputText">{wrongInputText}</div>
        </div>


        <Timer refference={timerRef} timeLimit={getTimeValue()} typingInputRef={typingInputRef}></Timer>
        {/* <p className="time-text">time: {timeTyping}s</p> */}

        <TypingInput refference={typingInputRef} wordsCount={getWordsValue()} timeLimit={getTimeValue()} timerRef={timerRef}></TypingInput>
    </>

}

export default TypingElement;