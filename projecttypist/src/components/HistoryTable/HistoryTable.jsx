import "../../main.css";
import "./HistoryTable.css";

function HistoryTable(props) {
    // console.log(props);

    const arr = props.data[0];
    const len = props.data[0].WPM.length - 1;

    // console.log(arr)
    // console.log("length: " + len);

    const res = [];

    for (let i = len; i >= 0; i--) {
        // console.log("WPM: " + arr.WPM[i]);
        // console.log("accracy: " + arr.accuracy[i]);
        // console.log("RawWPM: " + arr.rawWPM[i]);
        res.push([arr.dates[i], arr.WPM[i], arr.accuracy[i], arr.rawWPM[i]]);
    }

    // console.log(res);

    return (
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>WPM</th>
                    <th>Accuracy</th>
                    <th>RawWPM</th>
                </tr>
            </thead>

            <tbody>
                {res.map((item) => (
                    <tr key={item[0]} className="">
                        <th>{item[0]}</th>
                        <th>{item[1]}</th>
                        <th>{item[2]}</th>
                        <th>{item[3]}</th>
                        {/* <th>See graph...</th> */}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default HistoryTable;
