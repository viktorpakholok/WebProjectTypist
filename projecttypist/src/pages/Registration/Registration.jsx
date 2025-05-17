import "./Registration.css";
import personImage from "../../assets/person_login.svg";
import loginImage from "../../assets/regular_login.svg";


import React, { useState, useContext } from "react";
import axios from "axios";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import Text from "../../components/Text/Text";
import Footer from "../../components/Footer/Footer";
import { UserContext } from "../../main.jsx";
import { useNavigate } from "react-router-dom";


function Registration() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    // Registration form state
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        verifyEmail: "",
        password: "",
        verifyPassword: "",
    });

    // Login form state (email + password)
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    // Handle registration input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((fd) => ({ ...fd, [name]: value }));
    };

    // Handle login input changes
    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData((ld) => ({ ...ld, [name]: value }));
    };

    // Register handler
    const handleRegister = async (e) => {
        e.preventDefault();
        const { username, email, verifyEmail, password, verifyPassword } = formData;

        // Validation
        if (!username || !email || !verifyEmail || !password || !verifyPassword) {
            alert("Please fill in all fields.");
            return;
        }
        if (email !== verifyEmail) {
            alert("Emails do not match!");
            return;
        }
        if (password !== verifyPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            let res = await axios.get(`http://localhost:3001/users?email=${email}`);
            if (res.data.length > 0) {
                alert("A user with this email already exists!");
                return;
            }
            res = await axios.get(`http://localhost:3001/users?username=${username}`);
            if (res.data.length > 0) {
                alert("A user with this username already exists!");
                return;
            }


            const postRes = await axios.post("http://localhost:3001/users", {
                username,
                email,
                password,
            });

            const newUser = postRes.data;
            setUser(newUser);

            alert("Registration successful! You are now logged in.");
            navigate("/");

            setFormData({ username: "", email: "", verifyEmail: "", password: "", verifyPassword: "" });
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
            alert("Please enter both email and password.");
            return;
        }

        try {
            const res = await axios.get(
                `http://localhost:3001/users?email=${email}&password=${password}`
            );

            if (res.data.length > 0) {
                const loggedInUser = res.data[0];
                setUser(loggedInUser);

                alert("Login successful!");
                // setLoginData({ email: "", password: "" });
                navigate("/");

            } else {
                alert("Invalid email or password.");
            }
        } catch (err) {
            console.error("Login error:", err);
            alert("Login failed. Please try again.");
        }
    };

    console.log("Current user:", user);

    return (
        <div className="registrationPage">
            <Header />
            <section className="informationPlaceholder">
                <form className="informationPlaceholder-left" onSubmit={handleRegister}>
                    <div className="informationPlaceholder-left-text">
                        <img className="register-image" src={personImage} alt="Register" />
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


                <aside className="informationPlaceholder-right">
                    <form onSubmit={handleLoginSubmit}>
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
                </aside>
            </section>
            <Footer />
        </div>
    );
}

export default Registration;
