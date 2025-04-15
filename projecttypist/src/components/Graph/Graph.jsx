import "./Graph.css";

import LineChart from "../MyChart/MyChart";

function Graph(props) {
    
    console.log("inside graph");
    console.log(props)

    return (
        <div className="graph">
            {/* <p className="bigtext">Graph</p> */}
            <LineChart timeSteps={props.timeSteps}></LineChart>
        </div>
    );
}

export default Graph;
