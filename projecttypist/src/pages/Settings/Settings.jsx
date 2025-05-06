import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Logs from "../../components/Logs/Logs";


function Settings() {

    let color = "#323437"
    const root = document.documentElement;

    const changeColor = () => {
        if (color == "#323437") {
            color = "#43094"
            // root.style.setProperty("--text-color", "#eee");
            root.style.setProperty("--bg-color", color);
            root.style.setProperty("--ic-color", "#323437")
            root.style.setProperty("--ft-color", "#323437")
        } else {
            color = "#323437"
            root.style.setProperty("--bg-color", color);
            root.style.setProperty("--ic-color", "#d1d0c5")
            root.style.setProperty("--ft-color", "#d1d0c5")

        }
    }

    return (
        <div>
            <Header></Header>
            <h1>Settings:</h1>

            <button onClick={changeColor}>Change color</button>

            {/* <Logs data={arr}></Logs> */}

            {/* <Footer></Footer> */}
        </div>
    );
}

export default Settings;
