import { useState, useEffect, useRef, useLayoutEffect, useCallback, Fragment } from "react";
import "./TypingInput.css";
import { useNavigate } from "react-router-dom";
// import TypingLetter from "../TypingLetter/TypingLetter";
import TypingCaret from "../TypingCaret/TypingCaret";
import TypingWord from "../TypingWord/TypingWord";


// console.log(new Date())
const dictionaryWords = await fetch("/english1000.txt")
          .then((res) => res.text())
          .then((res) => {
            return res.split("\n")
          })
// console.log("read")
// console.log(new Date())
// console.log(dictionaryWords)


const startingWordsCount = 3;

function TypingInput({ wordsCount, timeLimit }) {
  const navigate = useNavigate();
  const [typingWords, setTypingWords] = useState(getNewWords());
  const [actualWords, setActualWords] = useState(getActualWords())
  const [typedWords, setTypedWords] = useState(getTypedWords())

  const [isFocused, setIsFocused] = useState(true)
  const [timeTyping, setTimeTyping] = useState(0);
  const [index, setIndex] = useState({word: -1, letter: -1})
  const [lastIndex, setLastIndex] = useState({word: -1, letter: -1})

  const [hasStarted, setHasStarted] = useState(false);

  const inputRef = useRef(null);
  const [spacePressed, setSpacePressed] = useState(false);
  const [caretClassName, setCaretClassName] = useState("");
  const [caretLeft, setCaretLeft] = useState(0);
  const [caretTop, setCaretTop] = useState(0);
  const [closed, setClosed] = useState(false)
  
  const timeStats = useRef([])



  useEffect(() => {
    setClosed(false)
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
    if (hasStarted) return
    setActualWords(getActualWords())
    setTypedWords(getTypedWords())
  }, [typingWords]);

  const getStats = useCallback(() => {
    const characters = {
      correct: 0,
      incorrect: 0,
      extra: 0,
    };

    let wrongWords = 0;
    let totalWords = 0;
    for (const i in actualWords) {
      let wordHasMistake = false
      let wasFullyWritten = true
      for (const k in actualWords[i]) {
        const actualLetter = actualWords[i][k]
        const typedLetter = typedWords[i][k]
        if (typedLetter === null) {
          wasFullyWritten = false
          break
        }
        if (actualLetter === typedLetter) {
          characters.correct++
          continue
        }
        wordHasMistake = true;
        if (actualLetter === null) characters.extra++
        else {
          characters.incorrect++
        }
      }
      if (!wasFullyWritten) break
      if (wordHasMistake) wrongWords++
      totalWords++
    }
    
    const words = {
      correct: totalWords - wrongWords,
      incorrect: wrongWords,
    };
    return [characters, words]
  }, [index, actualWords, typedWords, spacePressed])

  useEffect(() => {
    if (!hasStarted) return;
    timeStats.current = []

    const timeTypingId = setInterval(
      () => {
        setTimeTyping((prev) => prev + 1)
      },
      1000
    );
    return () => {
      clearInterval(timeTypingId);
    };
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
    const words = getStats()[1]
    // console.log(words)
    let wpm = Math.round(words.correct/timeTyping*60)
    wpm = (isNaN(wpm)) ? 0: wpm
    let rawwpm = Math.round((words.correct + words.incorrect) / timeTyping * 60)
    rawwpm = (isNaN(rawwpm)) ? 0: rawwpm
    timeStats.current.push([timeTyping, wpm, rawwpm])
  }, [timeTyping]);

  useEffect(() => {
    if (timeLimit == 0) return;
    if (timeTyping >= timeLimit) renderResultPage();
  }, [timeTyping]);

  
  useEffect(() => {
    // if (index.word < lastIndex.word && lastLetterInWord(index.word, index.letter)) {
    //   setSpacePressed(true)
    // }
    setLastIndex(index)
  }, [index])

  useEffect(() => {
    if (closed) return
    updateCaretPos()
  }, [index, spacePressed, closed])

  

  function getActualWords() {
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
  
  function resetTypingInput() {
    setHasStarted(false)
    setSpacePressed(false)
    setTimeTyping(0);
    setIndex({word: -1, letter: -1})
    setTypingWords(() => getNewWords());
  }

  function focus() {
    if (document.activeElement) document.activeElement.blur()
    setIsFocused(true)
    setCaretClassName("")
  }

  function blur() {
    setIsFocused(false)
    setCaretClassName("invisible")
  }

  function setCaretPos(top, left) {
    setCaretLeft(`${left}px`)
    setCaretTop(`${top}px`)
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


  function prevLetterIndex(curIndex) {
    if (curIndex > 0) return curIndex - 1;
    if (index.word == 0) return -1
    const prevWordIndex = index.word - 1;
    return actualWords[prevWordIndex].length - 1;
  }

  function getNewWordIndex(curWordIndex, newLetterIndex, curLetterIndex) {
    if (newLetterIndex === -1) return -1;
    if (newLetterIndex >= curLetterIndex) {
      return curWordIndex - 1
    }
    return curWordIndex
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
    if (index.word == -1) return;
    if (spacePressed) {
      setSpacePressed(false)
      return
    }

    const typedWordsCopy = structuredClone(typedWords);
    const actualWordsCopy = structuredClone(actualWords);
    removeLetter(actualWordsCopy, typedWordsCopy, index.word, index.letter)
    setActualWords(actualWordsCopy)
    setTypedWords(typedWordsCopy)
    if (index.letter === 0 && index.word >= 0) setSpacePressed(true) 
    setIndex((prev) => getNewIndex(prev, prevLetterIndex(prev.letter)))
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
    
    const actualWordsCopy = structuredClone(actualWords)
    const typedWordsCopy = structuredClone(typedWords)

    let deletedNonLetter = false;

    while (curWordIndex !== -1) {
      const typedLetter = typedWordsCopy[curWordIndex][curLetterIndex];
      if (isLetter(typedLetter)) break;
      removeLetter(actualWordsCopy, typedWordsCopy, curWordIndex, curLetterIndex)
      const newLetterIndex = prevLetterIndex(curLetterIndex)
      curWordIndex = getNewWordIndex(curWordIndex, newLetterIndex, curLetterIndex)
      curLetterIndex = newLetterIndex
      deletedNonLetter = true;
      if (lastLetterInWord(curWordIndex, curLetterIndex)) break;
    }

    if (!deletedNonLetter) {
      while (curWordIndex !== -1) {
        const typedLetter = typedWordsCopy[curWordIndex][curLetterIndex];
        if (!isLetter(typedLetter)) break;
        removeLetter(actualWordsCopy, typedWordsCopy, curWordIndex, curLetterIndex)
        const newLetterIndex = prevLetterIndex(curLetterIndex)
        curWordIndex = getNewWordIndex(curWordIndex, newLetterIndex, curLetterIndex)
        curLetterIndex = newLetterIndex
        if (lastLetterInWord(curWordIndex, curLetterIndex)) break;
      }
    }
    setActualWords(actualWordsCopy)
    setTypedWords(typedWordsCopy)
    if (index.word > curWordIndex) setSpacePressed(true) 
    setIndex({word: curWordIndex, letter: curLetterIndex})
  }

  function renderResultPage() {
    setClosed(true)
    if (!hasStarted) {
      navigate("/info", { state: { 
        characters: {correct: 0, incorrect: 0, extra: 0},
        words: {correct: 0, incorrect: 0},
        time: 0, 
        timeSteps: []
      }
      });
      return
    }
    const [characters, words] = getStats()
    console.log(timeStats.current)
    navigate("/info", { state: { characters, words, time: timeTyping, timeSteps: timeStats.current } });
  }

  function handleInputKeyDown(event) {
    if (event.key === "Backspace" || event.key === "Delete") {
      handleDeletion(event);
      return;
    }
    if (event.key.length > 1) return;
    if (event.key === " ") event.preventDefault()
    if (event.key === " " && !spacePressed && nextLetterIndex(index.letter) <= index.letter) {
      setSpacePressed(true)
      if (nextLetterIndex(index.letter) === index.letter) {
        renderResultPage();
      } 
      return;
    }
    writeToInput(event.key);
  }


  function updateCaretPos() {
    if (inputRef.current.childNodes?.length == null) {
      return
    }
    const width = inputRef.current.firstElementChild.firstElementChild.offsetWidth;
    

    const root = document.documentElement;
    if (index.word === -1) {
      const targetEl = inputRef.current.firstElementChild.firstElementChild;
      const rect = targetEl.getBoundingClientRect();

      setCaretPos(rect.top + root.scrollTop, rect.left - width / 2);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    } else if (
      lastLetterInWord(index.word, index.letter) &&
      spacePressed
    ) {
      const targetEl = inputRef.current.childNodes[index.word+1].childNodes[0];
      const rect = targetEl.getBoundingClientRect();
      setCaretPos(rect.top + root.scrollTop, rect.left - width / 2);
      window.scrollTo({
        top: rect.top + root.scrollTop - 400,
        left: 0,
        behavior: 'smooth'
      });
    } else {
      
      const targetEl = inputRef.current.childNodes[index.word].childNodes[index.letter];
      const rect = targetEl.getBoundingClientRect();
      setCaretPos(rect.top + root.scrollTop, rect.left + width / 2);
      window.scrollTo({
        top: rect.top + root.scrollTop - 400,
        left: 0,
        behavior: 'smooth'
      });
    }
  }


  function nextLetterIndex(curLetterIndex) {
    if (index.word === -1) return 0;
    if (actualWords[index.word][curLetterIndex + 1] === undefined) {
      if (actualWords[index.word + 1] === undefined) {
        return curLetterIndex
      }
      return 0
    }
    return curLetterIndex + 1
  }

  function getNewIndex(prevIndex, newLetterIndex) {
    const newWordIndex = getNewWordIndex(prevIndex.word, newLetterIndex, prevIndex.letter)
    return {word: newWordIndex, letter: newLetterIndex}
  }

  function addLetter(typedLetter) {
    
    let newLetterIndex = nextLetterIndex(index.letter)
    let newWordIndex = index.word;
    if (newLetterIndex === index.letter) {
      if (typedLetter === actualWords[newWordIndex][index.letter]) {
        renderResultPage()
        return
      }
      newLetterIndex = 0
    };
    const actualWordsCopy = structuredClone(actualWords)
    const typedWordsCopy = structuredClone(typedWords)
    if (index.letter !== -1 && newLetterIndex === 0) {
      if (spacePressed) {
        setSpacePressed(false)
        newWordIndex++;
        typedWordsCopy[newWordIndex][newLetterIndex] = typedLetter
      }
      else {
        typedWordsCopy[newWordIndex].push(typedLetter)
        actualWordsCopy[newWordIndex].push(null)
        newLetterIndex = index.letter + 1;
        setActualWords(actualWordsCopy)
      }
    } else {
      if (index.letter === -1) {
        newWordIndex++;
      }
      typedWordsCopy[newWordIndex][newLetterIndex] = typedLetter
    }
    setTypedWords(typedWordsCopy)
    setIndex({word: newWordIndex, letter: newLetterIndex})
    
  }

  function lastLetterInWord(wordIndex, letterIndex) {
    if (wordIndex === -1) return false
    return actualWords[wordIndex][letterIndex + 1] === undefined
  }

  function writeToInput(typedLetter) {
    if (!hasStarted) setHasStarted(true)
    addLetter(typedLetter)

    if (
      wordsCount === 0 &&
      typingWords.length - index.word < 3
    ) {
      const newWord = getRandomWord();
      setTypingWords((prev) => [...prev, newWord])
      setActualWords((prev) => [...prev, newWord.split("")])
      setTypedWords((prev) => [...prev, Array.from({length: newWord.length}, () => null)])
      // setTypingWords((prevWords) => [...prevWords, newWord]);
      // appendWordsToInput([newWord]);
    }
  }

  function getTypingElements () {
    let wordsComponents = []
    for (let i in actualWords) {
      if (i > index.word + 50) break
      wordsComponents.push(<TypingWord key={i} actualLetters={actualWords[i]} typedLetters={typedWords[i]}></TypingWord>)
    }
    return wordsComponents
    // let words = []
    // for (let i in actualWords) {
    //   const word = actualWords[i]
    //   let curLetters = []
    //   for (let k in word) {
    //     curLetters.push(<TypingLetter key={k} actualLetter={actualWords[i][k]} typedLetter={typedWords[i][k]}></TypingLetter>)
    //   }
    //   words.push(<span key={i} className="word">{curLetters}</span>)
    // }
    // return words;
  }

  // function updateIncorrectLetters(value) {
  //   if (value === 1) {
  //     incorrectLetters.current += 1
  //   }
  //   else {
  //     incorrectLetters.current -= 1
  //   }
  // } 


  return (
    <>
      <div className="typing-div">
        <button onClick={() => resetTypingInput()}>new text</button>
        <p>time: {timeTyping}s</p>

        <TypingCaret className={caretClassName} left={caretLeft} top={caretTop}></TypingCaret>

        
        <div ref={inputRef} id="input">
          {getTypingElements()}
          {/* {actualWords.map((word, i) => (
            <TypingWord key={i} actualLetters={word} typedLetters={typedWords[i]}></TypingWord>
          ))} */}
        </div>
      </div>
    </>
  );
}

export default TypingInput;
