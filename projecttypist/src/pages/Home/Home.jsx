import TypingInput from "../../components/TypingInput/TypingInput.jsx"
import Header from "../../components/Header/Header";

function Home() {

    return (
        <div>
            <Header></Header>
            <TypingInput wordsCount={4} timeLimit={0}></TypingInput>
        </div>
        );
}

export default Home;