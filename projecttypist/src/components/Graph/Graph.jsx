import "./Graph.css";

import LineChart from "../MyChart/MyChart";

function Graph(props) {

    // console.log("inside graph");
    // console.log(props)

    return (
        <div className="graph">
            {/* <p className="bigtext">Graph</p> */}
            <LineChart className='right' timeSteps={props.timeSteps}></LineChart>
        </div>
    );
}

export default Graph;
