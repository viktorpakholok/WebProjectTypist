import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Logs from "../../components/Logs/Logs";

import "./Settings.css"

function Settings() {
    const root = document.documentElement;

    function changeColor(event){

        let fontColor = window.getComputedStyle(event.currentTarget).color;
        let backColor = window.getComputedStyle(event.currentTarget).backgroundColor

        root.style.setProperty("--bg-color", backColor);
        root.style.setProperty("--ft-color", fontColor);
        root.style.setProperty("--ic-color", fontColor);

    };

    return (
        <div>
            <Header></Header>
            <h1 className="pad-bot-20">Settings:</h1>

            {/* <button onClick={changeColor}>Change color</button> */}

            <h2 className="pad-bot-10">Theme:</h2>

            <div className="flex gap-20">
                
                <button className="theme-bth theme-0" onClick={changeColor}>default</button>
                <button className="theme-bth theme-1" onClick={changeColor}>magic girl</button>
                <button className="theme-bth" onClick={changeColor}>theme 2</button>
                <button className="theme-bth" onClick={changeColor}>theme 3</button>
            </div>

            {/* <Logs data={arr}></Logs> */}

            {/* <Footer></Footer> */}
        </div>
    );
}

export default Settings;
