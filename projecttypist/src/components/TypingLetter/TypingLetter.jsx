import { useEffect, useRef, useState } from "react"

function TypingLetter({actualLetter, typedLetter}) {
    const [letter, setLetter] = useState(actualLetter);
    const [hintLetter, setHintLetter] = useState(typedLetter);
    const thisRef = useRef()

    useEffect(() => {
        if (thisRef.current.className == "off-word-letter") {
            setLetter(typedLetter)
            setHintLetter(actualLetter)
        }
    }, [actualLetter, typedLetter])

    function getClassName() {
        if (actualLetter == "") return "off-word-letter"
        if (actualLetter == typedLetter) return "good-letter"
        return "actual-letter"
    }

    return <span ref={thisRef} style={{ '--before-content': `"${hintLetter}"` }} className={getClassName()}>{letter}</span>
}

export default TypingLetter;