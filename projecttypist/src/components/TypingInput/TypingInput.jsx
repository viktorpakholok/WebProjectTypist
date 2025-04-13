import { useState, useEffect, useRef, useCallback, Fragment } from "react";
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
  const [actualWords, setActualWords] = useState(getActualWords())
  const [typedWords, setTypedWords] = useState(getTypedWords())

  const [isFocused, setIsFocused] = useState(true)
  // const [actualWords, setActualWords] = useState()
  // const [hintLetters, setHintLetters] = useState()
  const [timeTyping, setTimeTyping] = useState(0);
  const [wordIndex, setWordIndex] = useState(-1);
  const [letterIndex, setLetterIndex] = useState(-1);
  const [hasStarted, setHasStarted] = useState(false);
  // const [typingText, setTypingText] = useState(typingWords.join(" "))

  const inputRef = useRef(null);
  const caretRef = useRef(null);
  const spacePressedRef = useRef(false);



  useEffect(() => {
    resetTypingInput()
  }, [wordsCount, timeLimit])

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
    setActualWords(getActualWords())
    setTypedWords(getTypedWords())
    if (hasStarted) return;
    // updateCaretPos();
    if (document.activeElement != null) return
    focus();
  }, [typingWords]);

  // useEffect(() => {
  //   if (!hasStarted) return;

  //   const timeTypingId = setInterval(
  //     () => setTimeTyping((prev) => prev + 1),
  //     1000
  //   );
  //   return () => {
  //     clearInterval(timeTypingId);
  //   };
  // }, [hasStarted]);


  const handleKeyDown = useCallback((event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      resetTypingInput();
      return;
    }
    console.log(isFocused)
    if (!isFocused) return;
    handleInputKeyDown(event);
  }, [isFocused,  timeTyping, wordIndex, letterIndex, actualWords, typedWords]);

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
  
  useEffect(() => {
    console.log("new indexing: word:", wordIndex, "letter:", letterIndex)
  }, [wordIndex, letterIndex])
  

  function getActualWords() {
    console.log("changed words")
    let newActualWords = []
    for (const word of typingWords) {
      newActualWords.push(word.split(""))
    }
    return newActualWords
  }
  
  function getTypedWords() {
    let newTypedWords = []
    for (const word of typingWords) {
      newTypedWords.push(Array.from({length: word.length}, () => null))
    }
    return newTypedWords
  }
  
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

  function resetTypingInput() {
    setHasStarted(false)
    setTimeTyping(0);
    setWordIndex(-1);
    setTypingWords(getNewWords());
  }

  function focus() {
    if (document.activeElement) document.activeElement.blur()
    setIsFocused(true)
    caretRef.current.className = "";
  }

  function blur() {
    setIsFocused(false)
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


  function prevLetterIndex(curIndex) {
    if (curIndex > 0) return curIndex - 1;
    if (wordIndex == 0) return -1
    const prevWordIndex = wordIndex - 1;
    return actualWords[prevWordIndex].length - 1;
  }

  function prevLetterIndexAndUpdate(curIndex) {
    const newIndex = prevLetterIndex(curIndex)
    if (newIndex === -1 || newIndex >= curIndex) {
      setWordIndex((prev) => prev - 1)
    }
    return newIndex
    
  }

  function removeLetter(
    actualWordsCopy, typedWordsCopy, givenWordIndex, givenLetterIndex
  ) {
    if (actualWordsCopy[givenWordIndex][givenLetterIndex] === null) {
      actualWordsCopy[givenWordIndex].pop()
      typedWordsCopy[givenWordIndex].pop()
    }
    else {
      typedWordsCopy[givenWordIndex][givenLetterIndex] = null;
    }
  }

  function deleteOne() {
    if (wordIndex == -1) return;
    const typedWordsCopy = structuredClone(typedWords);
    const actualWordsCopy = structuredClone(actualWords);
    removeLetter(actualWordsCopy, typedWordsCopy, wordIndex, letterIndex)
    console.log(typedWordsCopy)
    setActualWords(actualWordsCopy)
    setTypedWords(typedWordsCopy)
    setLetterIndex((prev) => prevLetterIndexAndUpdate(prev));

    // const extraLettersCount =
    //   Number(temp.parentElement.getAttribute("extraLettersCount")) ?? 0;
    // temp.parentElement.setAttribute(
    //   "extraLettersCount",
    //   String(extraLettersCount - 1)
    // );
  }

  function handleDeletion(event) {
    if (wordIndex == -1) return;
    // const prevParent = lastSelectedRef.current.parentElement;
    if (!event.altKey) {
      deleteOne();
    } else {
      deleteWord();
    }
    // if (
    //   lastSelectedRef.current == null ||
    //   (prevParent !== lastSelectedRef.current.parentElement &&
    //     getNextInWordLetter(lastSelectedRef.current) == null)
    // ) {
    //   spacePressedRef.current = true;
    // }
  }

  function deleteWord() {
    let curWordIndex = wordIndex;
    let curLetterIndex = letterIndex;
    const actualWordsCopy = structuredClone(actualWords)
    const typedWordsCopy = structuredClone(typedWords)
    console.log(typedWords)
    let deletedNonLetter = false;
    while (curWordIndex !== -1) {
      const typedLetter = typedWordsCopy[curWordIndex][curLetterIndex];
      if (isLetter(typedLetter)) break;
      removeLetter(actualWordsCopy, typedWordsCopy, curWordIndex, curLetterIndex)
      const newLetterIndex = prevLetterIndex(curLetterIndex)
      if (curLetterIndex >= newLetterIndex) curWordIndex--; // TODO
      curLetterIndex = newLetterIndex
      deletedNonLetter = true;
    }
    if (!deletedNonLetter) {
      while (curWordIndex !== -1) {
        const typedLetter = typedWordsCopy[curWordIndex][curLetterIndex];
        if (!isLetter(typedLetter)) break;
        removeLetter(actualWordsCopy, typedWordsCopy, curWordIndex, curLetterIndex)
        const newLetterIndex = prevLetterIndex(curLetterIndex)
        if (newLetterIndex === -1 || newLetterIndex >= curLetterIndex) curWordIndex--;
        curLetterIndex = newLetterIndex
      }
    }
    setActualWords(actualWordsCopy)
    setTypedWords(typedWordsCopy)
    setLetterIndex(curLetterIndex)
    setWordIndex(curWordIndex)
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

    let typedWords = wordIndex;
    if (letterIndex === actualWords[wordIndex - 1].length - 1 && spacePressedRef.current) {
      typedWords++;
    }
    // if (getNextLetter(lastSelectedRef.current) == null || getNextInWordLetter(lastSelectedRef.current) == null && spacePressedRef.current) typedWords += 1;
    const wrongWords = countWordsWithErrors();
    const words = {
      correct: typedWords - wrongWords,
      incorrect: wrongWords,
    };
    navigate("/info", { state: { characters, words, time: timeTyping } });
  }

  function handleInputKeyDown(event) {
    console.log("key", event.key)
    if (event.key === "Backspace" || event.key === "Delete") {
      handleDeletion(event);
      return;
    }
    if (event.key.length > 1) return;
    if (event.key === " ") {
      event.preventDefault
      return;
    }
    // if (event.key === " ") event.preventDefault()
    // if (event.key === " " && lastSelectedRef.current != null) {
    //   if (lastSelectedRef.current.nextElementSibling == null) {
    //     spacePressedRef.current = true;
    //     if (getNextLetter(lastSelectedRef.current) == null) {
    //       renderResultPage();
    //     } 
    //     return;
    //   }
    // }
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
    const width = inputRef.current.firstElementChild.firstElementChild.offsetWidth;
    
    const root = document.documentElement;
    if (lastSelectedRef.current == null) {
      const targetEl = inputRef.current.firstElementChild.firstElementChild;
      const rect = targetEl.getBoundingClientRect();

      setCaretPos(rect.top + root.scrollTop, rect.left - width / 2);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    } else if (
      getNextInWordLetter(lastSelectedRef.current) == null &&
      spacePressedRef.current
    ) {
      const targetEl = getNextLetter(lastSelectedRef.current);
      const rect = targetEl.getBoundingClientRect();
      setCaretPos(rect.top + root.scrollTop, rect.left - width / 2);
      window.scrollTo({
        top: rect.top + root.scrollTop - 400,
        left: 0,
        behavior: 'smooth'
      });
    } else {
      const targetEl = lastSelectedRef.current;
      const rect = targetEl.getBoundingClientRect();
      setCaretPos(rect.top + root.scrollTop, rect.right - width / 2);
      window.scrollTo({
        top: rect.top + root.scrollTop - 400,
        left: 0,
        behavior: 'smooth'
      });
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

  function nextLetterIndex(curLetterIndex) {
    if (actualWords[wordIndex + 1] === undefined) return curLetterIndex
    if (wordIndex === -1) return 0;
    if (curLetterIndex !== actualWords[wordIndex].length - 1) return curLetterIndex + 1;
    return 0
  }

  function addLetter(typedLetter) {
    console.log("cur typed:", typedWords)
    console.log("cur actual:", actualWords)
    console.log("word:", wordIndex, "letter:", letterIndex)
    console.log("typed", typedLetter)
    
    let newLetterIndex = nextLetterIndex(letterIndex)
    let newWordIndex = wordIndex;
    if (newLetterIndex === letterIndex) {
      if (typedLetter === actualWords[newWordIndex][letterIndex]) {
        renderResultPage()
      }
      return;
    };
    const actualWordsCopy = structuredClone(actualWords)
    const typedWordsCopy = structuredClone(typedWords)
    if (letterIndex !== -1 && newLetterIndex === 0) {
      if (spacePressedRef.current) {
        newWordIndex++;
        typedWordsCopy[newWordIndex][newLetterIndex] = typedLetter
      }
      else {
        typedWordsCopy[newWordIndex].push(typedLetter)
        actualWordsCopy[newWordIndex].push(null)
        newLetterIndex = letterIndex + 1;
        setActualWords(actualWordsCopy)
      }
    } else {
      if (letterIndex === -1) {
        newWordIndex++;
      }
      typedWordsCopy[newWordIndex][newLetterIndex] = typedLetter
    }
    console.log("added")
    console.log("word:", newWordIndex, "letter:", newLetterIndex)
    console.log("typed words", typedWordsCopy)
    setTypedWords(typedWordsCopy)
    setLetterIndex(newLetterIndex)
    setWordIndex(newWordIndex)
    
  }

  function writeToInput(typedLetter) {
    if (!hasStarted) setHasStarted(true)
    addLetter(typedLetter)

    // if (
    //   wordsCount == 0 &&
    //   typingWords.length - curWordIndex < 3
    // ) {
    //   const newWord = getRandomWord();
    //   setTypingWords((prevWords) => [...prevWords, newWord]);
    //   appendWordsToInput([newWord]);
    // }

    // updateCaretPos();
  }

  function getTypingElements () {
    console.log("typing words", typingWords)
    let words = []
    for (let i in actualWords) {
      const word = actualWords[i]
      let curLetters = []
      for (let k in word) {
        curLetters.push(<TypingLetter key={k} actualLetter={actualWords[i][k]} typedLetter={typedWords[i][k]}></TypingLetter>)
      }
      words.push(<span key={i} className="word">{curLetters}</span>)
    }
    return words;
  }


  return (
    <>
      <div className="typing-div">
        <button onClick={() => resetTypingInput()}>new text</button>
        <p>time: {timeTyping}s</p>
        <div ref={caretRef} id="caret">
          |
        </div>
        <div ref={inputRef} id="input">{getTypingElements()}</div>
      </div>
    </>
  );
}

export default TypingInput;
