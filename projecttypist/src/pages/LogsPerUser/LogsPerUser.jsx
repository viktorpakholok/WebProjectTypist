import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Logs from "../../components/Logs/Logs";

import { useState, useEffect, useRef, useContext,useLayoutEffect, useCallback, Fragment } from "react";
import axios from "axios";

import { EmailContext } from "../../main.jsx";

function LogsPerUser() {

    const emailContext = useContext(EmailContext);
    const [arr, setArr] = useState(null)

    useEffect(() => {
        async function fetchArr() {
            const res = await axios.get(`http://localhost:3001/statsExample/?email=${emailContext.email}`);
            // console.log(res, res.data)
            // console.log(res.data)
            setArr(res.data)
        }

        fetchArr()
    }, []);

    if (arr === null) return <div>Loading...</div>

    return (
        <div>
            <Header></Header>
            <h1>Here you can see your stats:</h1>

            <Logs data={arr}></Logs>

            {/* <Footer></Footer> */}
        </div>
    );
}

export default LogsPerUser;
