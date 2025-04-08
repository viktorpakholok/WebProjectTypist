import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import Stats from "../../components/Stats/Stats";

import "./Info.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Info() {
    const navigate = useNavigate();

    useEffect(() => {
        function handleKeyDown(event) {
            console.log(event.key)
            if (event.key == "Tab") {   
                navigate("/")
            }
        }

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        }
    }, [])

    return (
        <div>
            <Header></Header>
            <Stats></Stats>
            {/* <Footer></Footer> */}
        </div>
    );
}

export default Info;
