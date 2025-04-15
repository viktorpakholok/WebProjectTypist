// import "./TypingLetter.css"
import { useEffect, useState, memo } from "react"
import TypingLetter from "../TypingLetter/TypingLetter";

function compare(lst1, lst2) {
    if (lst1.length !== lst2.length) return false
    return lst1.every((el, i) => {
        // console.log(el, lst2[i], i)
        return lst2[i] === el
    })
}

const TypingWord = memo(function TypingWord({actualLetters, typedLetters, isChanged}) {
    // console.log("rendering", actualLetters.join(""))

    return <>
        <span className="word">
            {actualLetters.map((symbol, index) => (
                <TypingLetter
                    key={index}
                    actualLetter={symbol}
                    typedLetter={typedLetters[index]}
                ></TypingLetter>
            ))}
        </span>
    </>
}, (prev, next) => compare(prev.typedLetters, next.typedLetters) && compare(prev.actualLetters, next.actualLetters))

export default TypingWord;