import "./Header.css";
import "../../main.css";

import Logo from "../Logo/Logo";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import Keyboard from "../SVG/Keyboard/Keyboard";
import Info from "../SVG/Info/Info";
import Settings from "../SVG/Settings/Settings";

import { Link } from "react-router-dom";

function Header() {
    return (
        <div className="jst-btw header-main">
            <div className="jst-btw nav">
                <Logo></Logo>
                {/* <ButtonIcon text='text Bohdan' title='' icon={KeyBoardIcon}></ButtonIcon> */}
                <Link to="/" className="link">
                    <Keyboard width="40px" height="40px" color="#d1d0c5"></Keyboard>
                </Link>
                <p className="link">crown</p>
                <Link to="/info" className="link">
                    <Info width="30px" height="30px" color="#d1d0c5"></Info>
                </Link>
                <Link className="link">
                    <Settings width="30px" height="30px" color="#d1d0c5"></Settings>
                </Link>
            </div>
            <div className="flex sign-in">
                {/* <p>bell</p> */}
                <p>cabinet</p>
            </div>
            {/* <div className="keyboard"></div> */}
            {/* <img className="keyboard" src={KeyBoardIcon} alt="" /> */}
            {/* <link rel="stylesheet" href="" /> */}
        </div>
    );
}

export default Header;
