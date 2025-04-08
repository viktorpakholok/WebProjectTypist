import "../../main.css"
import "./Stats.css"

import Graph from "../Graph/Graph";

function Stats(props) {
    return (
        <div>
            <div className="jst-btw main-info">
                <div className="jst-btw big-stats">
                    <div>
                        <h2>wpm</h2>
                        <h1>{(props.words.correct)/(props.time/60)}</h1>
                    </div>
                    <div>
                        <h2>acc</h2>
                        <h1>{props.characters.correct / (props.characters.correct + props.characters.incorrect)}%</h1>
                    </div>
                </div>
                <Graph></Graph>
            </div>
            <div className="jst-btw stats">
                <div>
                    <p>test type</p>
                    <p>time {props.time ?? 30}</p>
                    <p>english</p>
                </div>
                <div>
                    <p>raw</p>
                    <h3>{(props.words.correct + props.words.incorrect)/(props.time/60)}</h3>
                </div>
                <div>
                    <p>characters</p>
                    <h3>{props.correct ?? 98}/{props.incorrect ?? 1}/{props.extra ?? 0}/{props.number ?? 0}</h3>
                </div>
                <div>
                    <p>consistency</p>
                    <h3>{props.number ?? 64}%</h3>
                </div>
                <div>
                    <p>time</p>
                    <h3>{props.time ?? 30}s</h3>
                </div>
            </div>
        </div>
    );
}

export default Stats;
