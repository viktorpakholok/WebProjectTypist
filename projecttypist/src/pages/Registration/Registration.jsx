import "./Registration.css";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import Text from "../../components/Text/Text";
import Footer from "../../components/Footer/Footer";

function Registration() {
    return (
        <div className="registrationPage">
            <Header></Header>
                <section className="informationPlaceholder">

                    <aside className="informationPlaceholder-left">
                        <div className="informationPlaceholder-left-text">
                            <img className="register-image" src="../../assets/person.png"/>
                            <Text text="register" />
                        </div>
                        
                        <Input placeholderText="username" />
                        <Input placeholderText="email" />
                        <Input placeholderText="verify email" />
                        <Input placeholderText="password" />
                        <Input placeholderText="verify password" />
                        <Button text="sing up" image="../../assets/person.png" className="registerButton" />
                    </aside>

                    <aside className="informationPlaceholder-right">

                        <div className="informationPlaceholder-right-text">
                            <img className="logIn-image" src="../../assets/person.png"/>
                            <Text text="login" />
                        </div>

                        <div className="informationPlaceholder-right-providers">
                            <Button text="Google" image="google" className="googleButton" />
                            <Button text="Grinder" image="facebook" className="facebookButton" />
                        </div>

                        <div className="informationPlaceholder-right-or">
                            <Text text="or" />
                        </div>

                        <div className="informationPlaceholder-right-submit">
                            <Input placeholderText="login" />
                            <Input placeholderText="password" />
                        </div>

                        <div className="informationPlaceholder-right-rememberMe"> 

                            <label class="checkbox-container">
                                <input type="checkbox" id="rememberMe" />
                                <span class="checkmark"></span>
                                <Text text="remember me" />
                            </label>

                            
                        </div>

                        <Button text="sing in" image="" className="loginButton" />

                        <a href="#" className="informationPlaceholder-right-forgotPassword">forgot password?</a>

                    </aside>

                    
                </section>

            <Footer></Footer>

        </div>
    );
}

export default Registration;
