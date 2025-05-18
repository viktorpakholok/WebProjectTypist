import { useCallback, useEffect, useImperativeHandle, useState } from "react"



export default function Timer({timeLimit, refference, typingInputRef}) {
    const [time, setTime] = useState(0)
    const [timerStarted, setTimerStarted] = useState(false)

    useEffect(() => {
        if (!timerStarted) return;
        const intervalId = setInterval(() => {
            setTime((prev) => prev + 1)
        }, 1000)
        return () => {
            clearInterval(intervalId)
        }
    }, [timerStarted])

    useEffect(() => {
        // if (timeTyping == 0 )
        typingInputRef.current.updateTimeStats(time)
        if (timeLimit != 0 && time == timeLimit) {
            typingInputRef.current.renderResultPage()
            setTypingStarted(false)
        }
    }, [time])


    useImperativeHandle(refference, () => {
        return {setTimerStarted: setTimerStarted}
    }, [time])

    return <>
        <div>cur time:{time}</div>
    </>
}