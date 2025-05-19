import "../../main.css";
import "./HistoryTable.css";

function HistoryTable(props) {

    const arr = props.data;
    const len = props.data.WPM.length - 1;

    const res = [];

    for (let i = len; i >= 0; i--) {
        res.push([arr.dates[i], arr.WPM[i], arr.accuracy[i], arr.rawWPM[i]]);
    }

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
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default HistoryTable;
