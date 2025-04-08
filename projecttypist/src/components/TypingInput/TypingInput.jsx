import { useState, useEffect, useRef, useCallback } from "react";
import "./TypingInput.css";
import { useNavigate } from "react-router-dom";
import TypingLetter from "../TypingLetter/TypingLetter";

const dictionaryWords = [
  "apple",
  "breeze",
  "candle",
  "dragon",
  "eclipse",
  "forest",
  "galaxy",
  "horizon",
  "island",
  "jungle",
  "knight",
  "lantern",
  "meteor",
  "nebula",
  "ocean",
  "puzzle",
  "quartz",
  "raven",
  "sapphire",
  "tornado",
];

const startingWordsCount = 3;

function TypingInput({ wordsCount, timeLimit }) {
  const navigate = useNavigate();
  const [typingWords, setTypingWords] = useState(getNewWords());
  // const [actualLetters, setActualLetters] = useState()
  // const [hintLetters, setHintLetters] = useState()
  const [timeTyping, setTimeTyping] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  // const [typingText, setTypingText] = useState(typingWords.join(" "))

  const inputRef = useRef(null);
  const caretRef = useRef(null);
  const lastSelectedRef = useRef(null);
  const spacePressedRef = useRef(false);

  function fillInputHTML() {
    inputRef.current.innerHTML = "";
    appendWordsToInput(typingWords);
  }

  function appendWordsToInput(words) {
    for (let word of words) {
      const wordEl = createElemement("span", "word", "");
      for (let letter of word) {
        const letterEl = createElemement("span", "", letter);
        letterEl.setAttribute("actualLetter", letter);
        wordEl.appendChild(letterEl);
      }
      inputRef.current.appendChild(wordEl);
    }
  }

  useEffect(() => {
    // if (wordsCount == null && time == null)

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
    if (hasStarted) return;
    fillInputHTML();
    lastSelectedRef.current = null;
    focus();
    updateCaretPos();
  }, [typingWords]);

  const handleKeyDown = useCallback((event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      resetTypingInput();
      return;
    }
    if (!inputRef.current.focused) return;
    handleInputKeyDown(event);
  }, [hasStarted, typingWords]);

  useEffect(() => {
    if (!hasStarted) return;

    const timeTypingId = setInterval(
      () => setTimeTyping((prev) => prev + 1),
      1000
    );
    return () => {
      clearInterval(timeTypingId);
    };
  }, [hasStarted]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (timeLimit == 0) return;
    if (timeTyping >= timeLimit) renderResultPage();
  }, [timeTyping]);


  

  function resetTypingInput() {
    setHasStarted(false)
    setTimeTyping(0);
    setWordIndex(0);
    setTypingWords(getNewWords());
  }

  function focus() {
    inputRef.current.focused = "1";
    caretRef.current.className = "";
  }

  function blur() {
    inputRef.current.focused = "";
    caretRef.current.className = "invisible";
  }

  function setCaretPos(top, left) {
    caretRef.current.style.left = `${left}px`;
    caretRef.current.style.top = `${top}px`;
  }

  function randomInt(lowerBound, upperBound) {
    const numRange = upperBound - lowerBound;
    return Math.floor(Math.random() * (numRange + 1)) + lowerBound;
  }

  function getRandomWord() {
    return dictionaryWords[randomInt(0, dictionaryWords.length - 1)];
  }

  function getNewWords() {
    let newWords = [];
    const curWordsCount = wordsCount === 0 ? startingWordsCount : wordsCount;
    for (let i = 0; i < curWordsCount; i++) {
      newWords.push(getRandomWord());
    }
    return newWords;
  }

  function isLetter(char) {
    return /^\p{L}$/u.test(char);
  }

  function createElemement(nodeName, classNames, innerHTML) {
    let el = document.createElement(nodeName);
    el.className = classNames;
    el.innerHTML = innerHTML;
    return el;
  }

  function deleteOne(prevLetterFunc) {
    if (lastSelectedRef.current == null) return;
    if (lastSelectedRef.current.getAttribute("actualLetter") != null) {
      lastSelectedRef.current.innerHTML = lastSelectedRef.current.getAttribute("actualLetter");
      lastSelectedRef.current.className = "untyped-letter";
      lastSelectedRef.current = prevLetterFunc(lastSelectedRef.current);
      return;
    }
    const temp = lastSelectedRef.current;
    lastSelectedRef.current = prevLetterFunc(lastSelectedRef.current);
    const extraLettersCount =
      Number(temp.parentElement.getAttribute("extraLettersCount")) ?? 0;
    temp.parentElement.setAttribute(
      "extraLettersCount",
      String(extraLettersCount - 1)
    );
    temp.remove();
  }

  function handleDeletion(event) {
    if (!lastSelectedRef.current) return;
    const prevParent = lastSelectedRef.current.parentElement;
    if (!event.altKey) {
      deleteOne(getPrevLetter);
    } else {
      deleteWord();
    }
    if (
      lastSelectedRef.current == null ||
      (prevParent !== lastSelectedRef.current.parentElement &&
        getNextInWordLetter(lastSelectedRef.current) == null)
    ) {
      spacePressedRef.current = true;
    }
  }

  function deleteWord() {
    let deletedNonLetter = false;
    while (lastSelectedRef.current != null) {
      const typedLetter = lastSelectedRef.current.getAttribute("typedLetter");
      if (typedLetter == null || isLetter(typedLetter)) break;
      if (!getPrevInWordLetter(lastSelectedRef.current)) {
        deleteOne(getPrevLetter);
        return;
      }
      deleteOne(getPrevInWordLetter);
      deletedNonLetter = true;
    }
    if (deletedNonLetter) return;
    while (lastSelectedRef.current != null) {
      const typedLetter = lastSelectedRef.current.getAttribute("typedLetter");
      if (typedLetter == null || !isLetter(typedLetter)) break;
      if (!getPrevInWordLetter(lastSelectedRef.current)) {
        deleteOne(getPrevLetter);
        return;
      }
      deleteOne(getPrevInWordLetter);
    }
  }

  function getPrevLetter(el) {
    if (el == null) return null;
    if (getPrevInWordLetter(el) != null) return getPrevInWordLetter(el);
    if (getPrevWord(el) == null) return null;
    return getPrevWord(el).lastElementChild;
  }

  function getPrevWord(el) {
    return el.parentElement.previousElementSibling;
  }

  function getPrevInWordLetter(el) {
    return el.previousElementSibling;
  }

  function getNextLetter(el) {
    if (el == null) return null;
    if (getNextInWordLetter(el) != null) return getNextInWordLetter(el);
    if (getNextWord(el) == null) return null;
    return getNextWord(el).firstElementChild;
  }

  function getNextWord(el) {
    return el.parentElement.nextElementSibling;
  }

  function getNextInWordLetter(el) {
    return el.nextElementSibling;
  }

  function countCharactersWithClass(className) {
    return inputRef.current.querySelectorAll(`.${className}`).length;
  }

  function getWordIndex() {
    return Array.from(inputRef.current.childNodes).indexOf(
      lastSelectedRef.current.parentElement
    );
  }

  function countWordsWithErrors() {
    let count = 0;
    for (const wordEl of inputRef.current.childNodes) {
      if (wordEl.querySelector(".bad-letter, .off-word-letter")) count += 1;
    }
    return count;
  }

  function renderResultPage() {
    if (!hasStarted) {
      navigate("/info", { state: { 
        characters: {correct: 0, incorrect: 0, extra: 0},
        words: {correct: 0, incorrect: 0},
        time: 0 }
      });
      return
    }
    const characters = {
      correct: countCharactersWithClass("good-letter"),
      incorrect: countCharactersWithClass("actual-letter"),
      extra: countCharactersWithClass("off-word-letter"),
    };

    const typedWords = getWordIndex() + 1;
    const wrongWords = countWordsWithErrors();
    const words = {
      correct: typedWords - wrongWords,
      incorrect: wrongWords,
    };
    navigate("/info", { state: { characters, words, time: timeTyping } });
    // setTypingWords(getNewWords())c
  }

  function handleInputKeyDown(event) {
    if (event.key === "Backspace" || event.key === "Delete") {
      handleDeletion(event);
      updateCaretPos();
      return;
    }
    if (event.key === " " && lastSelectedRef.current != null) {
      if (lastSelectedRef.current.nextElementSibling == null) {
        spacePressedRef.current = true;
        if (getNextLetter(lastSelectedRef.current) == null) {
          renderResultPage();
        } else {
          updateCaretPos();
        }
        return;
      }
    }
    if (event.key.length > 1) return;
    writeToInput(event.key);
  }

  function getCurLetterEl() {
    if (lastSelectedRef.current == null) {
      return inputRef.current.firstElementChild.firstElementChild;
    }
    if (spacePressedRef.current) {
      spacePressedRef.current = false;
      return getNextLetter(lastSelectedRef.current);
    }
    return getNextInWordLetter(lastSelectedRef.current);
  }

  function updateCaretPos() {
    const width = caretRef.current.offsetWidth;
    if (lastSelectedRef.current == null) {
      const targetEl = inputRef.current.firstElementChild.firstElementChild;
      const rect = targetEl.getBoundingClientRect();
      setCaretPos(rect.top, rect.left - width / 2);
    } else if (
      getNextInWordLetter(lastSelectedRef.current) == null &&
      spacePressedRef.current
    ) {
      const targetEl = getNextLetter(lastSelectedRef.current);
      const rect = targetEl.getBoundingClientRect();
      setCaretPos(rect.top, rect.left - width / 2);
    } else {
      const targetEl = lastSelectedRef.current;
      const rect = targetEl.getBoundingClientRect();
      setCaretPos(rect.top, rect.right - width / 2);
    }
  }

  function writeOffLetter(curChar) {
    const wordEl = lastSelectedRef.current.parentElement;

    const extraLettersCount =
      Number(wordEl.getAttribute("extraLettersCount")) ?? 0;
    if (extraLettersCount > 5) return;
    wordEl.setAttribute("extraLettersCount", String(extraLettersCount + 1));

    const offWordLetter = createElemement("span", "off-word-letter", curChar);
    offWordLetter.setAttribute("typedLetter", curChar);
    wordEl.appendChild(offWordLetter);
    lastSelectedRef.current = offWordLetter;
  }

  function writeToInput(curChar) {
    if (!hasStarted) setHasStarted(true)
    const curLetterEl = getCurLetterEl();
    if (curLetterEl == null) {
      writeOffLetter(curChar);
      updateCaretPos();
      return;
    }
    lastSelectedRef.current = curLetterEl;

    const curWordIndex = Array.from(inputRef.current.childNodes).indexOf(
      curLetterEl.parentElement
    );

    if (
      wordsCount == 0 &&
      typingWords.length - curWordIndex < 3
    ) {
      const newWord = getRandomWord();
      setTypingWords((prevWords) => [...prevWords, newWord]);
      appendWordsToInput([newWord]);
    }

    updateCaretPos();

    const correctChar = curLetterEl
      ? curLetterEl.getAttribute("actualLetter")
      : null;
    curLetterEl.setAttribute("typedLetter", curChar);

    if (curChar !== correctChar) {
      curLetterEl.className = "actual-letter";
      curLetterEl.style.setProperty("--before-content", `"${curChar}"`);
    } else {
      curLetterEl.className = "good-letter";
      curLetterEl.textContent = curChar;
      if (getNextLetter(curLetterEl) == null) {
        renderResultPage();
      }
    }
  }

  return (
    <>
      <div className="typing-div">
        <button onClick={() => resetTypingInput()}>new text</button>
        <p>time: {timeTyping}s</p>
        <div ref={caretRef} id="caret">
          |
        </div>
        <div ref={inputRef} id="input"></div>
      </div>
    </>
  );
}

export default TypingInput;
