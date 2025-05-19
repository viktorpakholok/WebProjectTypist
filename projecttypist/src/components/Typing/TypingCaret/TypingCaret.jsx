import { getNewCaretPos } from "../../../functions/helper_functions"
import "./TypingCaret.css"
import { memo, useCallback, useEffect, useImperativeHandle, useState } from "react"

const TypingCaret = memo(function TypingCaret({ refference, className }) {
    const [pos, setPos] = useState({left: 0, top: 0})

    const updateCaretPos = useCallback((inputEl, typedWords, index, spacePressed, closed) => {
        const newCaretPos = getNewCaretPos(inputEl, typedWords, index, spacePressed, closed)
        setPos(newCaretPos)
    }, [])

    useImperativeHandle(refference, () => {
        return {
            updateCaretPos: updateCaretPos
        }
    }, [updateCaretPos])

    return (
        <>
            <div className={className} style={{ "left": pos.left, "top": pos.top }} id="caret">
                |
            </div>
        </>)
})

export default TypingCaret;