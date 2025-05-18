import axios from "axios";
import TypingWord from "../components/TypingWord/TypingWord";

export function randomInt(lowerBound, upperBound) {
    const numRange = upperBound - lowerBound;
    return Math.floor(Math.random() * (numRange + 1)) + lowerBound;
}

export function getActualWords(curTypingWords) {
    let newActualWords = [];
    for (const word of curTypingWords) {
        newActualWords.push(word.split(""));
    }
    return newActualWords;
}

export function getTypedWords(curTypingWords) {
    let newTypedWords = [];
    for (const word of curTypingWords) {
        newTypedWords.push(Array.from({ length: word.length }, () => null));
    }
    return newTypedWords;
}

export function getRandomWord(dictionary) {
    return dictionary[randomInt(0, dictionary.length - 1)];
}

export function getNewWords(modeWordsCount, curStartingWordsCount, dictionary) {
    let newWords = [];
    const curWordsCount =
        modeWordsCount === 0 ? curStartingWordsCount : modeWordsCount;
    for (let i = 0; i < curWordsCount; i++) {
        newWords.push(getRandomWord(dictionary));
    }
    return newWords;
}

export function isLetter(char) {
    return /^\p{L}$/u.test(char);
}

export function prevLetterIndex(curActualWords, wordIndex, letterIndex) {
    if (letterIndex > 0) return letterIndex - 1;
    if (wordIndex == 0) return -1;
    const prevWordIndex = wordIndex - 1;
    return curActualWords[prevWordIndex].length - 1;
}

export function getNewWordIndex(curWordIndex, newLetterIndex, curLetterIndex) {
    if (newLetterIndex === -1) return -1;
    if (newLetterIndex >= curLetterIndex) {
        return curWordIndex - 1;
    }
    return curWordIndex;
}

export function removeLetter(
    actualWordsCopy,
    typedWordsCopy,
    givenWordIndex,
    givenLetterIndex
) {
    if (actualWordsCopy[givenWordIndex][givenLetterIndex] === null) {
        actualWordsCopy[givenWordIndex].pop();
        typedWordsCopy[givenWordIndex].pop();
    } else {
        typedWordsCopy[givenWordIndex][givenLetterIndex] = null;
    }
}

export function formatTime(time) {
    return time.toString().padStart(2, '0');
}

export async function saveStats(curCharacters, curWords, curEmail, timeTyping) {
    // console.log("saved")
    const wpm =
        Math.round((curWords.correct / timeTyping) * 60 * 100) / 100;
    const rawwpm =
        Math.round(
            ((curWords.correct + curWords.incorrect) / timeTyping) * 60 * 100
        ) / 100;
    const accuracy =
        Math.round(
            (curCharacters.correct /
                (curCharacters.correct + curCharacters.incorrect)) *
                100
        ) / 100;

    const dateInfo = new Date();
    const date = `${formatTime(dateInfo.getHours())}:${formatTime(dateInfo.getMinutes())}:${formatTime(dateInfo.getSeconds())} ${formatTime(dateInfo.getDate())}.${formatTime(dateInfo.getMonth() + 1)}.${dateInfo.getFullYear()}`

    let res = await axios.get(
        `http://localhost:3001/statsExample?email=${curEmail}`
    );
    let prevArr = res.data[0];
    

    if (res.data.length === 0) {
        prevArr = {email: curEmail, dates: [date], WPM: [wpm], rawWPM: [rawwpm], accuracy: [accuracy]}
        await axios.post(`http://localhost:3001/statsExample/`, prevArr);
        return
    }
    
    prevArr.dates.push(date);
    prevArr.WPM.push(wpm);
    prevArr.rawWPM.push(rawwpm);
    prevArr.accuracy.push(accuracy);
    
    await axios.put(
        `http://localhost:3001/statsExample/${prevArr.id}`,
        prevArr
    );
}

export function getNewCaretPos(inputEl, curActualWords, curIndex, curSpacePressed, curClosed) {
    console.log("updating")
    if (curClosed || inputEl.childNodes?.length == null) {
        console.log("not updated")
        return;
    }
    const width =
        inputEl.firstElementChild.firstElementChild.offsetWidth;

    const root = document.documentElement;
    if (curIndex.word === -1) {
        const targetEl =
            inputEl.firstElementChild.firstElementChild;
        const rect = targetEl.getBoundingClientRect();

        const newCaretPos = {top: rect.top + root.scrollTop, left: rect.left - width / 2};
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
        return newCaretPos
    } 
    if (lastLetterInWord(curActualWords, curIndex.word, curIndex.letter) && curSpacePressed) {
        const targetEl =
            inputEl.childNodes[curIndex.word + 1].childNodes[0];
        const rect = targetEl.getBoundingClientRect();

        const newCaretPos = {top: rect.top + root.scrollTop, left: rect.left - width / 2};
        window.scrollTo({
            top: rect.top + root.scrollTop - 400,
            left: 0,
            behavior: "smooth",
        });
        return newCaretPos
    }
    const targetEl =
        inputEl.childNodes[curIndex.word].childNodes[
            curIndex.letter
        ];
    const rect = targetEl.getBoundingClientRect();

    const newCaretPos = {top: rect.top + root.scrollTop, left: rect.left + width / 2};
    window.scrollTo({
        top: rect.top + root.scrollTop - 400,
        left: 0,
        behavior: "smooth",
    });
    return newCaretPos

}

export function nextLetterIndex(curActualWords, wordIndex, letterIndex) {
    if (wordIndex === -1) return 0;
    if (curActualWords[wordIndex][letterIndex + 1] === undefined) {
        if (curActualWords[wordIndex + 1] === undefined) {
            return letterIndex;
        }
        return 0;
    }
    return letterIndex + 1;
}

export function getNewIndex(prevIndex, newLetterIndex) {
    const newWordIndex = getNewWordIndex(
        prevIndex.word,
        newLetterIndex,
        prevIndex.letter
    );
    return { word: newWordIndex, letter: newLetterIndex };
}

export function lastLetterInWord(curActualWords, wordIndex, letterIndex) {
    if (wordIndex === -1) return false;
    return curActualWords[wordIndex][letterIndex + 1] === undefined;
}

export function getTypingElements(curActualWords, curTypedWords, curMaxWordsAfterCursor, wordIndex) {
    let wordsComponents = [];
    const wordsLimit = wordIndex + curMaxWordsAfterCursor;
    for (let i in curActualWords) {
        if (i > wordsLimit) break;
        wordsComponents.push(
            <TypingWord
                key={i}
                actualLetters={curActualWords[i]}
                typedLetters={curTypedWords[i]}
            ></TypingWord>
        );
    }
    return wordsComponents;
}

export function getStatsHelper(curActualWords, curTypedWords) {
    const characters = {
        correct: 0,
        incorrect: 0,
        extra: 0,
    };

    let wrongWords = 0;
    let totalWords = 0;
    for (const i in curActualWords) {
        let wordHasMistake = false;
        let wasFullyWritten = true;
        for (const k in curActualWords[i]) {
            const actualLetter = curActualWords[i][k];
            const typedLetter = curTypedWords[i][k];
            if (typedLetter === null) {
                wasFullyWritten = false;
                break;
            }
            if (actualLetter === typedLetter) {
                characters.correct++;
                continue;
            }
            wordHasMistake = true;
            if (actualLetter === null) characters.extra++;
            else {
                characters.incorrect++;
            }
        }
        if (!wasFullyWritten) break;
        if (wordHasMistake) wrongWords++;
        totalWords++;
    }

    const words = {
        correct: totalWords - wrongWords,
        incorrect: wrongWords,
    };
    return [characters, words];
}

export function getTimeStat(words, timeTyping) {
    let wpm = Math.round((words.correct / timeTyping) * 60);
    wpm = isNaN(wpm) ? 0 : wpm;
    let rawwpm = Math.round(
        ((words.correct + words.incorrect) / timeTyping) * 60
    );
    rawwpm = isNaN(rawwpm) ? 0 : rawwpm;
    return [timeTyping, wpm, rawwpm]
}