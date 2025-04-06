import "./Header.css";
import "../../main.css";

import Logo from "../Logo/Logo";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import KeyBoardIcon from "../../assets/keyboard.svg";

import { Link } from "react-router-dom";

function Header() {
    return (
        <div className="jst-btw header-main">
            <div className="jst-btw nav">
                <Logo></Logo>
                {/* <ButtonIcon text='text Bohdan' title='' icon={KeyBoardIcon}></ButtonIcon> */}
                <Link to="/" className="link">
                    keyboard
                </Link>
                <p className="link">crown</p>
                <Link to="/info" className="link">
                    info
                </Link>
                <p className="link">settings</p>
            </div>
            <div className="flex sign-in">
                {/* <p>bell</p> */}
                <p>cabinet</p>
            </div>
            {/* <img src={KeyBoardIcon} alt=""/> */}
        </div>
    );
}

export default Header;
