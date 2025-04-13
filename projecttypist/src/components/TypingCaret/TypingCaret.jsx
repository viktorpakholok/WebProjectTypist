import "./TypingCaret.css"
import { memo } from "react"

const TypingCaret = memo(function TypingCaret({className, left, top}) {
    return (
        <>
            <div className={className} style={{ "left": left, "top": top }} id="caret">
            |
            </div>
        </>)
})

export default TypingCaret;