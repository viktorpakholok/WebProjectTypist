import TypingInput from "../../components/TypingInput/TypingInput.jsx"
import { useState } from "react";

function TypingElement() {
    const [curWordsCount, setCurWordsCount] = useState(5);
    const [curTimeLimit, setCurTimeLimit] = useState(0);
    return <>
        <TypingInput wordsCount={curWordsCount} timeLimit={curTimeLimit}></TypingInput>
    </>
    
}

export default TypingElement;