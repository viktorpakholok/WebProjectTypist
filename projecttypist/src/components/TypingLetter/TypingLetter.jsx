import "./TypingLetter.css"
import { useEffect, useState } from "react"

function TypingLetter({actualLetter, typedLetter}) {
    const [letter, setLetter] = useState();
    const [hintLetter, setHintLetter] = useState();
    const [curClassName, setCurClassName] = useState()

    useEffect(() => {
        setLetter(actualLetter)
        setHintLetter(typedLetter)
        const newClassName = getClassName()
        setCurClassName(newClassName)
        if (newClassName === "off-word-letter") {
            setLetter(typedLetter)
        }
    }, [actualLetter, typedLetter])



    function getClassName() {
        if (typedLetter === null) return "untyped-letter"
        if (actualLetter === null) return "off-word-letter"
        if (actualLetter === typedLetter) return "good-letter"
        return "actual-letter"
    }


    return <span style={{'--hint_letter': `"${hintLetter}"`}} className={curClassName}>{letter}</span>
}

export default TypingLetter;