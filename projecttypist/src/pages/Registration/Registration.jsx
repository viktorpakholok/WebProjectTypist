import "./Registration.css";
import React, { useState } from "react";
import axios from "axios";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Header from "../../components/Header/Header";
import Text from "../../components/Text/Text";
import Footer from "../../components/Footer/Footer";
let idNumber = 0;
function Registration() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    verifyEmail: "",
    password: "",
    verifyPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((fd) => ({ ...fd, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, verifyEmail, password, verifyPassword } = formData;

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
        alert("A user with this name already exists!");
        return;
      }

      // Send registration to JSON server
      await axios.post("http://localhost:3001/users", {
        idNumber,
        username,
        email,
        password,
      });
      idNumber += 1;

      alert("Registration successful!");

      setFormData({
        username: "",
        email: "",
        verifyEmail: "",
        password: "",
        verifyPassword: "",
      });
    } catch (err) {
      console.error("Registration error:", err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="registrationPage">
      <Header />
      <section className="informationPlaceholder">
        <form className="informationPlaceholder-left" onSubmit={handleSubmit}>
          <div className="informationPlaceholder-left-text">
            <img className="register-image" src="../../assets/person.png" alt="Register" />
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
            image="../../assets/person.png"
            className="registerButton"
          />
        </form>

        <aside className="informationPlaceholder-right">
          <div className="informationPlaceholder-right-text">
            <img className="logIn-image" src="../../assets/person.png" alt="Login" />
            <Text text="login" />
          </div>

          <div className="informationPlaceholder-right-providers">
            <Button text="Google" image="google" className="googleButton" />
            <Button text="BOHDANISTHEBEST" image="facebook" className="facebookButton" />
          </div>

          <div className="informationPlaceholder-right-or">
            <Text text="or" />
          </div>

          <div className="informationPlaceholder-right-submit">
            <Input placeholderText="login" />
            <Input placeholderText="password" />
          </div>

          <div className="informationPlaceholder-right-rememberMe">
            <label className="checkbox-container">
              <input type="checkbox" id="rememberMe" />
              <span className="checkmark"></span>
              <Text text="remember me" />
            </label>
          </div>

          <Button
            text="sign in"
            image=""
            className="loginButton"
            onClick={() => alert("Login functionality not implemented yet.")}
          />
          <a href="#" className="informationPlaceholder-right-forgotPassword">
            forgot password?
          </a>
        </aside>
      </section>
      <Footer />
    </div>
  );
}

export default Registration;
