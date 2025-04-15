import "../../main.css";
import "./Stats.css";

import Graph from "../Graph/Graph";

function Stats(props) {
    const charCorr = props.characters?.correct ?? 0;
    const charIncorr = props.characters?.incorrect ?? 0;
    const charExtra = props.characters?.extra ?? 0;

    const wordsCorr = props.words?.correct ?? 0;
    const wordsIncorr = props.words?.incorrect ?? 0;

    const timeSeconds = props.time ?? 0;

    const acc = Math.round(charCorr / (charCorr + charIncorr) * 100);
    const wpm = wordsCorr / (timeSeconds / 60);
    const raw_wpm = (wordsCorr + wordsIncorr) / (timeSeconds / 60);

    console.log(props);

    return (
        <div>
            <div className="jst-btw main-info">
                <div className="jst-btw big-stats">
                    <div>
                        <h2>wpm</h2>
                        <h1>{wpm.toFixed(2) ?? "Null"}</h1>
                    </div>
                    <div>
                        <h2>acc</h2>
                        <h1>{acc.toFixed(0) ?? "Null"}%</h1>
                    </div>
                </div>
                <Graph timeSteps={props.timeSteps}></Graph>
            </div>
            <div className="jst-btw stats">
                <div>
                    <p>test type</p>
                    <p>time {timeSeconds ?? 30}</p>
                    <p>english</p>
                </div>
                <div>
                    <p>raw</p>
                    <h3>{raw_wpm.toFixed(2) ?? "Null"}</h3>
                </div>
                <div>
                    <p>characters</p>
                    <h3>
                        {charCorr ?? "Null"}/{charIncorr ?? "Null"}/
                        {charExtra ?? "Null"}/{props.number ?? "Null"}
                    </h3>
                </div>
                <div>
                    <p>consistency</p>
                    <h3>{props.number ?? "Null"}%</h3>
                </div>
                <div>
                    <p>time</p>
                    <h3>{timeSeconds ?? "Null"}s</h3>
                </div>
            </div>
        </div>
    );
}

export default Stats;
