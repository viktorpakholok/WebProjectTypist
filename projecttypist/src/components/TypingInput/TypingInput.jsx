import {
    useState,
    useEffect,
    useContext,
    useRef,
    useLayoutEffect,
    useCallback,
    useImperativeHandle,
    useMemo,
    memo
} from "react";
import "./TypingInput.css";
import { useNavigate } from "react-router-dom";

import TypingCaret from "../TypingCaret/TypingCaret";

import { UserContext } from "../../main.jsx";

import {
    getActualWords, getTypedWords, getTimeStat,
    getRandomWord, getNewWords, isLetter, prevLetterIndex,
    getNewWordIndex, removeLetter, saveStats, getNewCaretPos,
    nextLetterIndex, getNewIndex, lastLetterInWord, getTypingElements,
    getStatsHelper
} from "../../functions/helper_functions.jsx";


const dictionaryWords = await fetch("/english1000.txt")
    .then((res) => res.text())
    .then((res) => {
        return res.split(/\n|\r\n/);
    });

const startingWordsCount = 3;
const maxWordsAfterCursor = 1000;

const TypingInput = memo(({ wordsCount, timeLimit, timerRef, refference }) => {

    const userContext = useContext(UserContext);

    const navigate = useNavigate();
    const [typingWords, setTypingWords] = useState(getNewWords(wordsCount, startingWordsCount, dictionaryWords));
    const [actualWords, setActualWords] = useState(getActualWords(typingWords));
    const [typedWords, setTypedWords] = useState(getTypedWords(typingWords));

    const [isFocused, setIsFocused] = useState(true);
    const [index, setIndex] = useState({ word: -1, letter: -1 });

    const [hasStarted, setHasStarted] = useState(false);

    const inputRef = useRef(null);
    const [spacePressed, setSpacePressed] = useState(false);
    const [caretClassName, setCaretClassName] = useState("");
    const [caretLeft, setCaretLeft] = useState(0);
    const [caretTop, setCaretTop] = useState(0);
    const [closed, setClosed] = useState(false);

    const timeStats = useRef([]);
    const renderingIter = useRef(0);
    const timeTyping = useRef(0);


    const getStats = useCallback(() => {
        return getStatsHelper(actualWords, typedWords)
    }, [actualWords, typedWords])


    const updateTimeStats = useCallback((curTime) => {
        timeTyping.current = curTime
        const words = getStats()[1];
        const timeStat = getTimeStat(words, timeTyping.current)
        timeStats.current.push(timeStat);
    }, [getStats])

    useImperativeHandle(refference, () => {
        return {
            updateTimeStats: updateTimeStats,
            renderResultPage: renderResultPage,
            resetTypingInput: resetTypingInput
        }
    }, [updateTimeStats])


    useEffect(() => {
        function handleMouseClick(event) {
            let clickOnInput = inputRef.current.contains(event.target);
            clickOnInput ? focus() : blur();
        }

        document.addEventListener("click", handleMouseClick);

        return () => {
            document.removeEventListener("click", handleMouseClick);
        };
    }, []);


    useEffect(() => {
        resetTypingInput();
    }, [wordsCount, timeLimit]);


    useEffect(() => {
        // console.log("useEffect [hasStarted]")
        if (!hasStarted) return;
        timeStats.current = [];
        timerRef.current.setTimerStarted(true)
    }, [hasStarted]);


    function handleKeyDown(event) {
        if (event.key === "Tab") {
            event.preventDefault();
            resetTypingInput();
            return;
        }
        if (!isFocused) return;
        handleInputKeyDown(event);
    }


    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);


    useEffect(() => {
        if (closed) return;

        const newCaretPos = getNewCaretPos(inputRef.current, actualWords, index, spacePressed, closed);
        if (newCaretPos == null) return
        setCaretPos(newCaretPos.top, newCaretPos.left)
    }, [actualWords, closed]);


    function resetTypingInput() {
        setClosed(false)
        setHasStarted(false);
        const newSpacePressed = false
        setSpacePressed(newSpacePressed);
        timeTyping.current = 0
        const newIndex = { word: -1, letter: -1 }
        setIndex(newIndex);
        const newTypingWords = getNewWords(wordsCount, startingWordsCount, dictionaryWords)
        setTypingWords(() => newTypingWords);
        setActualWords(getActualWords(newTypingWords));
        setTypedWords(getTypedWords(newTypingWords));
    }

    function focus() {
        if (document.activeElement) document.activeElement.blur();
        setIsFocused(true);
        setCaretClassName("");
    }

    function blur() {
        setIsFocused(false);
        setCaretClassName("invisible");
    }

    function setCaretPos(top, left) {
        setCaretLeft(`${left}px`);
        setCaretTop(`${top}px`);
    }


    function deleteOne() {
        if (index.word == -1) return;

        let newIndex = index
        if (!spacePressed) {
            const typedWordsCopy = structuredClone(typedWords);
            const actualWordsCopy = structuredClone(actualWords);

            removeLetter(actualWordsCopy, typedWordsCopy, index.word, index.letter);
            setActualWords(actualWordsCopy);
            setTypedWords(typedWordsCopy);
            newIndex = getNewIndex(index, prevLetterIndex(actualWords, index.word, index.letter))
            setIndex(newIndex);
        }
        const newSpacePressed = index.letter == 0
        setSpacePressed(newSpacePressed);
        const newCaretPos = getNewCaretPos(inputRef.current, actualWords, newIndex, newSpacePressed, closed);
        setCaretPos(newCaretPos.top, newCaretPos.left)
    }

    function handleDeletion(event) {
        if (index.word == -1) return;
        if (!event.altKey) {
            deleteOne();
        } else {
            deleteWord();
        }
    }

    function deleteWord() {
        let curWordIndex = index.word;
        let curLetterIndex = index.letter;

        const actualWordsCopy = structuredClone(actualWords);
        const typedWordsCopy = structuredClone(typedWords);

        let deletedNonLetter = false;

        while (curWordIndex !== -1) {
            const typedLetter = typedWordsCopy[curWordIndex][curLetterIndex];
            if (isLetter(typedLetter)) break;
            removeLetter(
                actualWordsCopy,
                typedWordsCopy,
                curWordIndex,
                curLetterIndex
            );
            const newLetterIndex = prevLetterIndex(actualWords, index.word, curLetterIndex);
            curWordIndex = getNewWordIndex(
                curWordIndex,
                newLetterIndex,
                curLetterIndex
            );
            curLetterIndex = newLetterIndex;
            deletedNonLetter = true;
            if (lastLetterInWord(actualWords, curWordIndex, curLetterIndex)) break;
        }

        if (!deletedNonLetter) {
            while (curWordIndex !== -1) {
                const typedLetter =
                    typedWordsCopy[curWordIndex][curLetterIndex];
                if (!isLetter(typedLetter)) break;
                removeLetter(
                    actualWordsCopy,
                    typedWordsCopy,
                    curWordIndex,
                    curLetterIndex
                );
                const newLetterIndex = prevLetterIndex(actualWords, index.word, curLetterIndex);
                curWordIndex = getNewWordIndex(
                    curWordIndex,
                    newLetterIndex,
                    curLetterIndex
                );
                curLetterIndex = newLetterIndex;
                if (lastLetterInWord(actualWords, curWordIndex, curLetterIndex)) break;
            }
        }
        setActualWords(actualWordsCopy);
        setTypedWords(typedWordsCopy);
        const newIndex = { word: curWordIndex, letter: curLetterIndex }
        const curNextLetterIndex = nextLetterIndex(actualWords, curWordIndex, curLetterIndex)
        const newSpacePressed = (curWordIndex != -1) && (curNextLetterIndex == 0)
        setSpacePressed(newSpacePressed);
        setIndex(newIndex);
        const newCaretPos = getNewCaretPos(inputRef.current, actualWords, newIndex, newSpacePressed, closed);
        setCaretPos(newCaretPos.top, newCaretPos.left)
    }

    function renderResultPage() {
        setClosed(true);
        if (!hasStarted) {
            navigate("/info", {
                state: {
                    characters: { correct: 0, incorrect: 0, extra: 0 },
                    words: { correct: 0, incorrect: 0 },
                    time: 0,
                    timeSteps: [],
                },
            });
            return;
        }
        // updateTimeStats()
        const [characters, words] = getStats();


        saveStats(characters, words, userContext.user.email, timeTyping.current);
        navigate("/info", {
            state: {
                characters,
                words,
                time: timeTyping.current,
                timeSteps: timeStats.current,
            },
        });
    }


    function handleInputKeyDown(event) {
        if (event.key === "Backspace" || event.key === "Delete") {
            handleDeletion(event);
            return;
        }
        if (event.key.length > 1) return;
        if (event.key === " ") event.preventDefault();

        if (
            event.key === " " &&
            !spacePressed &&
            nextLetterIndex(actualWords, index.word, index.letter) <= index.letter
        ) {
            const newSpacePressed = true
            setSpacePressed(newSpacePressed);
            if (nextLetterIndex(actualWords, index.word, index.letter) === index.letter) {
                const words = getStats()[1];
                const timeStat = getTimeStat(words, timeTyping.current)
                const timeStatsLength = timeStats.current.length
                if (timeStatsLength != 0) {
                    timeStats.current[timeStatsLength - 1] = timeStat
                }
                renderResultPage();
                return;
            }
            const newCaretPos = getNewCaretPos(inputRef.current, actualWords, index, newSpacePressed, closed);
            setCaretPos(newCaretPos.top, newCaretPos.left)
            return;
        }
        writeToInput(event.key);
    }


    function addLetter(typedLetter) {
        let newLetterIndex = nextLetterIndex(actualWords, index.word, index.letter);
        let newWordIndex = index.word;
        if (newLetterIndex === index.letter) {
            if (typedLetter === actualWords[newWordIndex][index.letter]) {
                renderResultPage();
                return;
            }
            newLetterIndex = 0;
        }
        const actualWordsCopy = structuredClone(actualWords);
        const typedWordsCopy = structuredClone(typedWords);
        let newSpacePressed = spacePressed;
        if (index.letter !== -1 && newLetterIndex === 0) {
            if (spacePressed) {
                newSpacePressed = false
                setSpacePressed(newSpacePressed);
                newWordIndex++;
                typedWordsCopy[newWordIndex][newLetterIndex] = typedLetter;
            } else {
                typedWordsCopy[newWordIndex].push(typedLetter);
                actualWordsCopy[newWordIndex].push(null);
                newLetterIndex = index.letter + 1;
                setActualWords(actualWordsCopy);
            }
        } else {
            if (index.letter === -1) {
                newWordIndex++;
            }
            typedWordsCopy[newWordIndex][newLetterIndex] = typedLetter;
        }
        setTypedWords(typedWordsCopy);
        const newIndex = { word: newWordIndex, letter: newLetterIndex }
        setIndex(newIndex);
        const newCaretPos = getNewCaretPos(inputRef.current, actualWords, newIndex, newSpacePressed, closed);
        setCaretPos(newCaretPos.top, newCaretPos.left)
    }


    function writeToInput(typedLetter) {
        if (!hasStarted) setHasStarted(true);
        addLetter(typedLetter);

        if (wordsCount === 0 && typingWords.length - index.word < 3) {
            const newWord = getRandomWord(dictionaryWords);
            setTypingWords((prev) => [...prev, newWord]);
            setActualWords((prev) => [...prev, newWord.split("")]);
            setTypedWords((prev) => [
                ...prev,
                Array.from({ length: newWord.length }, () => null),
            ]);


        }
    }


    renderingIter.current += 1
    // console.log("render: TypingInput", renderingIter.current, new Date().getTime(), wordsCount, timeLimit)
    // console.log({ typingWords: typingWords, actualWords: actualWords, typedWords: typedWords, isFocused: isFocused, timeTyping: timeTyping, index: index, hasStarted: hasStarted, spacePressed: spacePressed, caretClassName: caretClassName, caretLeft: caretLeft, caretTop: caretTop, closed: closed })
    return (
        <>
            <div className="typing-div">
                <TypingCaret
                    className={caretClassName}
                    left={caretLeft}
                    top={caretTop}
                ></TypingCaret>

                <div ref={inputRef} id="input">
                    {getTypingElements(actualWords, typedWords, maxWordsAfterCursor, index.word)}
                </div>
            </div>
        </>
    );
})

export default TypingInput;
