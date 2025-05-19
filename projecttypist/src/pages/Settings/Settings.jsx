import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import "./Settings.css"

import { useContext } from "react";

import { UserContext } from "../../main.jsx";

function Settings() {

    const userContext = useContext(UserContext);
    const root = document.documentElement;

    function changeColor(event) {

        let fontColor = window.getComputedStyle(event.currentTarget).color;
        let backColor = window.getComputedStyle(event.currentTarget).backgroundColor

        let theme = { "fontColor": fontColor, "backColor": backColor, "atenColor": "yellow", "wronColor": "red", "fontStyle": "" }
        let settings = { ...userContext.user?.settings, theme };

        let newUser = { ...userContext.user, settings }

        userContext.setUser(newUser)

        root.style.setProperty("--bg-color", backColor);
        root.style.setProperty("--ft-color", fontColor);
    };

    function changeFont(event) {

        let fontFamily = window.getComputedStyle(event.currentTarget).fontFamily;

        let settings = { ...userContext.user?.settings, fontFamily };

        let newUser = { ...userContext.user, settings }

        userContext.setUser(newUser)

        root.style.setProperty("--ft-family", fontFamily);
        // root.style.setProperty("--ft-family", fontFamily);
    }

    return (
        <div>
            <Header></Header>
            <h1 className="pad-bot-20">Settings</h1>

            {/* <button onClick={changeColor}>Change color</button> */}

            <h2 className="pad-bot-10">Theme</h2>

            <div className="flex gap-20">

                <button className="theme-bth theme-0" onClick={changeColor}>default</button>
                <button className="theme-bth theme-1" onClick={changeColor}>magic girl</button>
                <button className="theme-bth theme-2" onClick={changeColor}>inverted default</button>
                <button className="theme-bth theme-3" onClick={changeColor}>arctic smoke</button>

            </div>

            <h2 className="pad-bot-10 mar-top-40">Font</h2>

            <div className="flex gap-20">

                <button className="theme-bth font-bth font-0" onClick={changeFont}>courier new</button>
                <button className="theme-bth font-bth font-1" onClick={changeFont}>roboto mono</button>
                <button className="theme-bth font-bth font-2" onClick={changeFont}>vt323</button>
                <button className="theme-bth font-bth font-3" onClick={changeFont}>xanh mono</button>

            </div>


            <h2 className="pad-bot-10 mar-top-40">Difficulty</h2>

            <div className="flex gap-20">

            </div>


            <h2 className="pad-bot-10 mar-top-40">Sound</h2>

            <div className="flex gap-20">

            </div>

            {/* <Logs data={arr}></Logs> */}

            {/* <Footer></Footer> */}
        </div>
    );
}

export default Settings;
