import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import Graph from "../../components/Graph/Graph";

import "./Info.css";

function Info() {
    return (
        <div>
            <Header></Header>
            <div>
                <div className="jst-btw main-info">
                    <div className="jst-btw big-stats">
                        <div>
                            <h2>wpm</h2>
                            <h1>39</h1>
                        </div>
                        <div>
                            <h2>acc</h2>
                            <h1>85%</h1>
                        </div>
                    </div>
                    <Graph></Graph>
                </div>
                <div className="jst-btw stats">
                    <div>
                        <p>test type</p>
                        <p>time 30</p>
                        <p>english</p>
                    </div>
                    <div>
                        <p>raw</p>
                        <h3>40</h3>
                    </div>
                    <div>
                        <p>characters</p>
                        <h3>98/1/0/0</h3>
                    </div>
                    <div>
                        <p>consistency</p>
                        <h3>64%</h3>
                    </div>
                    <div>
                        <p>time</p>
                        <h3>30s</h3>
                    </div>
                </div>
            </div>
            {/* <Footer></Footer> */}
        </div>
    );
}

export default Info;
