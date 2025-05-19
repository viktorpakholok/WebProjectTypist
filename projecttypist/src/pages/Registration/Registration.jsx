import "./Registration.css";
import personImage from "../../assets/person_login.svg";
import loginImage from "../../assets/regular_login.svg";

import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import Text from "../../components/Text/Text";
import Footer from "../../components/Footer/Footer";

import { UserContext } from "../../main.jsx";

function Registration() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    async function ensureStatsExist(email) {
        try {
            const res = await axios.get(
                `http://localhost:3001/statsExample?email=${encodeURIComponent(email)}`
            );
            if (res.data.length === 0) {
                await axios.post("http://localhost:3001/statsExample", {
                    email,
                    dates: [],
                    WPM: [],
                    rawWPM: [],
                    accuracy: [],
                });
                // console.log("Stats initialized for:", email);
            } else {
                // console.log("Stats already exist for:", email);
            }
        } catch (err) {
            console.error("Error initializing stats:", err);
        }
    }

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        verifyEmail: "",
        password: "",
        verifyPassword: "",
    });
    const [loginData, setLoginData] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((fd) => ({ ...fd, [name]: value }));
    };
    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData((ld) => ({ ...ld, [name]: value }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const { username, email, verifyEmail, password, verifyPassword } = formData;

        if (!username || !email || !verifyEmail || !password || !verifyPassword) {
            return alert("Please fill in all fields.");
        }
        if (email !== verifyEmail) {
            return alert("Emails do not match!");
        }
        if (password !== verifyPassword) {
            return alert("Passwords do not match!");
        }

        try {
            let res = await axios.get(
                `http://localhost:3001/users?email=${encodeURIComponent(email)}`
            );
            if (res.data.length > 0) {
                return alert("A user with this email already exists!");
            }
            res = await axios.get(
                `http://localhost:3001/users?username=${encodeURIComponent(username)}`
            );
            if (res.data.length > 0) {
                return alert("A user with this username already exists!");
            }

            const settings = {
                theme: {
                    fontColor: "#d1d0c5",
                    backColor: "#323437",
                    atenColor: "yellow",
                    wronColor: "red",
                    fontStyle: "",
                },
                difficulty: 0,
                sound: 0,
            };
            const postRes = await axios.post("http://localhost:3001/users", {
                username,
                email,
                password,
                settings,
            });
            const newUser = postRes.data;
            setUser(newUser);

            await ensureStatsExist(newUser.email);
            alert("Registration successful! You are now logged in.");
            navigate("/");

            setFormData({
                username: "",
                email: "",
                verifyEmail: "",
                password: "",
                verifyPassword: "",
            });
            setLoginData({ email: "", password: "" });
        } catch (err) {
            console.error("Registration error:", err);
            alert("Something went wrong. Try again.");
        }
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = loginData;
        if (!email || !password) {
            return alert("Please enter both email and password.");
        }

        try {
            const res = await axios.get(
                `http://localhost:3001/users?email=${encodeURIComponent(
                    email
                )}&password=${encodeURIComponent(password)}`
            );
            if (res.data.length === 0) {
                return alert("Invalid email or password.");
            }

            const loggedInUser = res.data[0];
            setUser(loggedInUser);

            await ensureStatsExist(loggedInUser.email);
            alert("Login successful!");
            navigate("/");
        } catch (err) {
            console.error("Login error:", err);
            alert("Login failed. Please try again.");
        }
    };

    return (
        <div className="registrationPage">
            <Header />
            <section className="informationPlaceholder">
                <form
                    className="informationPlaceholder-left"
                    onSubmit={handleRegister}
                >
                    <div className="informationPlaceholder-left-text">
                        <img
                            className="register-image"
                            src={personImage}
                            alt="Register"
                        />
                        <Text text="register" />
                    </div>
                    <Input
                        name="username"
                        placeholderText="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    <Input
                        name="email"
                        type="email"
                        placeholderText="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <Input
                        name="verifyEmail"
                        type="email"
                        placeholderText="verify email"
                        value={formData.verifyEmail}
                        onChange={handleChange}
                    />
                    <Input
                        name="password"
                        type="password"
                        placeholderText="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <Input
                        name="verifyPassword"
                        type="password"
                        placeholderText="verify password"
                        value={formData.verifyPassword}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        text="sign up"
                        image={personImage}
                        className="registerButton"
                    />
                </form>

                <form className="informationPlaceholder-right" onSubmit={handleLoginSubmit}>
                    <div className="informationPlaceholder-right-text">
                        <img className="logIn-image" src={loginImage} alt="Login" />
                        <Text text="login" />
                    </div>
                    <Input
                        name="email"
                        type="email"
                        placeholderText="email"
                        value={loginData.email}
                        onChange={handleLoginChange}
                    />
                    <Input
                        name="password"
                        type="password"
                        placeholderText="password"
                        value={loginData.password}
                        onChange={handleLoginChange}
                    />
                    <Button
                        type="submit"
                        text="sign in"
                        image={loginImage}
                        className="loginButton"
                    />
                </form>
            </section>
            {/* <Footer /> */}
        </div>
    );
}

export default Registration;
