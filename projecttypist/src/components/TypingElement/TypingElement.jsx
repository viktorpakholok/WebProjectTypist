import TypingInput from "../../components/TypingInput/TypingInput.jsx"
import "./TypingElement.css"
import { useEffect, useState } from "react";

function TypingElement() {
    const [curWordsCount, setCurWordsCount] = useState(5);
    const [curTimeLimit, setCurTimeLimit] = useState(0);
    const [mode, setMode] = useState("words")
    const [inputValue, setInputValue] = useState("")
    const [wrongInputText, setWrongInputText] = useState("")
    const [wordsClass, setWordsClass] = useState("")
    const [timeClass, setTimeClass] = useState("")


    useEffect(() => {
        if (mode === "words") {
            setWordsClass("active")
            setTimeClass("")
        }
        else {
            setTimeClass("active")
            setWordsClass("")
        }
        if (!inputValue) return
        const parsedValue = inputValue
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
        setWrongInputText("")
        if (mode === "words") {
            setCurWordsCount(parsedValue)
            setCurTimeLimit(0)
        }
        else {
            setCurTimeLimit(parsedValue)
            setCurWordsCount(0)
        }
    }, [mode, inputValue])

    function changeMode(event) {
        if (!inputValue) {
            setWrongInputText("input is empty")
            return
        }
        if (isNaN(parseInt(inputValue))) {
            setWrongInputText("Wrong input")
            return
        }
        console.log(curTimeLimit, curWordsCount)
        console.log(event.target.value)
        
        setMode(event.target.value)
    }

    function updateInputValue(event) {
        setInputValue(event.target.value)
    }

    return <>
        <div className="modes-manager">
            <button className={wordsClass} value="words" onClick={(e) => changeMode(e)}>words</button>
            <button className={timeClass} value="time" onClick={(e) => changeMode(e)}>time</button>
            <input type="text" onChange={(e) => updateInputValue(e)} />
            <div>{wrongInputText}</div>
            <div style={{fontSize: "30px"}}>cur mode: {mode}, {curTimeLimit || curWordsCount}</div>

        </div>

        <TypingInput wordsCount={curWordsCount} timeLimit={curTimeLimit}></TypingInput>
    </>
    
}

export default TypingElement;