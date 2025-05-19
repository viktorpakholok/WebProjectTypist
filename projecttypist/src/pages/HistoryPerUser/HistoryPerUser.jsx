import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import HistoryTable from "../../components/HistoryTable/HistoryTable.jsx";
import Graph from "../../components/Graph/Graph.jsx";

import { useState, useEffect, useRef, useContext, useLayoutEffect, useCallback, Fragment } from "react";
import axios from "axios";

import { UserContext } from "../../main.jsx";

function HistoryPerUser() {

    const userContext = useContext(UserContext);
    const [arr, setArr] = useState(null)

    useEffect(() => {
        async function fetchArr() {
            const res = await axios.get(`http://localhost:3001/statsExample/?email=${userContext.user.email}`);
            setArr(res.data[0])
        }

        fetchArr()
    }, []);

    if (arr === null) return <div>Loading...</div>

    const toSend = []
    const len = arr["dates"].length

    for (let i = 0; i < len; i++) {
        toSend.push([arr["dates"][i], arr["WPM"][i]])
    }

    return (
        <div>
            <Header></Header>
            <h1>Here you can see your stats:</h1>

            <Graph timeSteps={toSend}></Graph>

            <HistoryTable data={arr}></HistoryTable>

            {/* <Footer></Footer> */}
        </div>
    );
}

export default HistoryPerUser;
