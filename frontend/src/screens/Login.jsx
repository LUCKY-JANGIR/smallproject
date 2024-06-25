import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import "../stylesheets/login.css";

export default function Login() {
  const Navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("userid")) {
      Navigate("/profile");
    }
  }, []);
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [passtypebutton, setpassTypebutton] = useState("show pass");
  const [inputType, setInputType] = useState("password");
  const passtype = (event) => {
    event.preventDefault();

    if (inputType === "password") {
      setInputType("text");
      setpassTypebutton("hidde password");
    } else if (inputType === "text") {
      setInputType("password");
      setpassTypebutton("show password");
    }
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleValidation = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Username is required please fill the Username", {
        theme: "dark",
      });
      return false;
    }
    if (password === "") {
      toast.error("Password is required please fill the password", {
        theme: "dark",
      });
      return false;
    }
    return true;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          values
        );
        if (response.data.status) {
          localStorage.setItem("userid", response.data.user_id);
          Navigate("/profile");
        } else {
          console.log(response.data.err);
          toast.error(response.data.msg, {
            theme: "dark",
          });
          if (response.data.errstarus) {
            console.log(response.data.err);
          }
        }
      } catch (error) {
        toast.error("An error occurred during registration", {
          theme: "dark",
        });
      }
    }
  };

  return (
    <>
      <div className="loginpg">
        <h1>User Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            onInput={handleChange}
            id="username"
            name="username"
          />
          <label htmlFor="password">Password:</label>
          <input
            type={inputType}
            onInput={handleChange}
            id="password"
            name="password"
          />
          <button onClick={passtype}>{passtypebutton}</button>
          <button onClick={handleSubmit}>login</button>
          <Link to="/register">Register page</Link>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
