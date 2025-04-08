import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import Stats from "../../components/Stats/Stats";

import "./Info.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Info() {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location.state)

    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key == "Tab") {   
                navigate("/")
            }
        }

        function handleReload() {
            navigate("/");
        }

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("onbeforeunload", handleReload)

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("onbeforeunload", handleReload)
        }
    }, [])

    return (
        <div>
            <Header></Header>
            <Stats {...location.state}></Stats>
            {/* <Footer></Footer> */}
        </div>
    );
}

export default Info;
