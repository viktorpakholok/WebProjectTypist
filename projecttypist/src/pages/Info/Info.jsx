import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import Stats from "../../components/Stats/Stats";

import "./Info.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Info() {
    const navigate = useNavigate();
    const location = useLocation();
    // console.log(location.state)

    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key == "Tab") {
                navigate("/");
            }
        }

        function handleReload() {
            const [nav] = performance.getEntriesByType("navigation");
            if (nav && nav.type === "reload") {
                navigate("/");
            }
        }

        document.addEventListener("keydown", handleKeyDown);
        window.addEventListener("load", handleReload)

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("load", handleReload)
        }
    }, [])

    return (
        <div className="main">
            <Header></Header>
            <Stats className='right' {...location.state}></Stats>
            {/* <Footer></Footer> */}
        </div>
    );
}

export default Info;
