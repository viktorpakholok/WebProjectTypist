import "./Header.css"

import Logo from "../Logo/Logo";
import "../../main.css"

function Header() {
    return (
        <div className="jst-btw header-main">
            <div className="jst-btw nav">
                <Logo></Logo>
                <p className="link">keyboard</p>
                <p className="link">crown</p>
                <p className="link">info</p>
                <p className="link">settings</p>
            </div>
            <div className="jst-btw sign-in">
                <p>bell</p>
                <p>cabinet</p>
            </div>
        </div>
    );
}

export default Header;
