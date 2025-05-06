import "./Header.css";
import "../../main.css";

import Logo from "../Logo/Logo";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import Keyboard from "../SVG/Keyboard/Keyboard";
import Info from "../SVG/Info/Info";
import Settings from "../SVG/Settings/Settings";
import Profile from "../SVG/Profile/Profile";
import SVG from "../SVG/SVG";

import { Link } from "react-router-dom";

function Header() {
    return (
        <div className="jst-btw header-main">
            <div className="jst-btw nav">
                <Logo></Logo>
                {/* <ButtonIcon text='text Bohdan' title='' icon={KeyBoardIcon}></ButtonIcon> */}
                <Link to="/" className="link">
                    <Keyboard
                        width="40px"
                        height="40px"
                        color="#d1d0c5"
                    ></Keyboard>
                </Link>
                <Link to="/aboutus" className="link">
                    {/* <Info width="30px" height="30px" color="#d1d0c5"></Info> */}
                        <svg className="icons"
                            width="30px"
                            height="30px"
                            version="1.1"
                            id="Capa_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 32 32"
                            xml:space="preserve"
                        >
                            <g>
                                <path
                                    d="M17.962,24.725l1.806,0.096v2.531h-7.534v-2.406l1.045-0.094c0.568-0.063,0.916-0.254,0.916-1.014v-8.801
       c0-0.699-0.188-0.92-0.791-0.92l-1.106-0.062v-2.626h5.666L17.962,24.725L17.962,24.725z M15.747,4.648
       c1.394,0,2.405,1.047,2.405,2.374c0,1.331-1.014,2.313-2.438,2.313c-1.454,0-2.404-0.982-2.404-2.313
       C13.31,5.695,14.26,4.648,15.747,4.648z M16,32C7.178,32,0,24.822,0,16S7.178,0,16,0c8.82,0,16,7.178,16,16S24.82,32,16,32z M16,3
       C8.832,3,3,8.832,3,16s5.832,13,13,13s13-5.832,13-13S23.168,3,16,3z"
                                />
                            </g>
                        </svg>
                </Link>
                <Link to="/settings" className="link">
                    <Settings
                        width="30px"
                        height="30px"
                        color="#d1d0c5"
                    ></Settings>
                </Link>
            </div>
            <div className="flex sign-in">
                {/* <p>bell</p> */}
                <Link to="/registration" className="link">
                    <Profile
                        width="30px"
                        height="30px"
                        color="#d1d0c5"
                    ></Profile>
                </Link>
            </div>
            {/* <div className="keyboard"></div> */}
            {/* <img className="keyboard" src={KeyBoardIcon} alt="" /> */}
            {/* <link rel="stylesheet" href="" /> */}
        </div>
    );
}

export default Header;
