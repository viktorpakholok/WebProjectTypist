import TypingInput from "../../components/TypingInput/TypingInput.jsx"
import TypingLetter from "../../components/TypingLetter/TypingLetter.jsx"
import Header from "../../components/Header/Header";

function Home() {

    return (
        <div>
            <Header></Header>
            <TypingInput wordsCount={0} timeLimit={10}></TypingInput>
        </div>
        );
}

export default Home;