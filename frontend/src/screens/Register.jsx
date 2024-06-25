import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import "../stylesheets/register.css";

export default function Register() {
  const Navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("userid")) {
      Navigate("/profile");
    }
  }, []);

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

  const [values, setValues] = useState({
    name: "",
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleValidation = () => {
    const { name, username, phone, email, password, confirmPassword } = values;
    if (name === "") {
      toast.error("Name is required, please fill the Name", {
        theme: "dark",
      });
      return false;
    }
    const usernameRegex = {
      upperCase: /[A-Z]/,
      lowerCase: /[a-z]/,
      digit: /[0-9]/,
      specialChar: /[!@#$%^&*(),.?":{}|<> ]/,
      spaces: /[ ]/,
    };
    if (username === "") {
      toast.error("Username is required please fill the Username", {
        theme: "dark",
      });
      return false;
    }
    if (usernameRegex.spaces.test(username)) {
      toast.error("Username should not cantain Spaces", {
        theme: "dark",
      });
      return false;
    }
    if (usernameRegex.upperCase.test(username)) {
      toast.error("Username can only contian  lovercases", {
        theme: "dark",
      });
      return false;
    }
    if (!usernameRegex.digit.test(username)) {
      toast.error("Username must contian a number", {
        theme: "dark",
      });
      return false;
    }

    if (phone === "") {
      toast.error("Number is required please fill the phone", {
        theme: "dark",
      });
      return false;
    }
    if (email === "") {
      toast.error("Email is required please fill the email", {
        theme: "dark",
      });
      return false;
    }

    // Email regex for basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Invalid email format", {
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
    // Password criteria
    const passwordMinLength = 8;
    const passwordRegex = {
      upperCase: /[A-Z]/,
      lowerCase: /[a-z]/,
      digit: /[0-9]/,
      specialChar: /[!@#$%^&*(),.?":{}|<>]/,
    };

    if (password.length < passwordMinLength) {
      toast.error(
        `Password must be at least ${passwordMinLength} characters long`,
        {
          theme: "dark",
        }
      );
      return false;
    }

    if (!passwordRegex.upperCase.test(password)) {
      toast.error("Password must contain at least one uppercase letter", {
        theme: "dark",
      });
      return false;
    }

    if (!passwordRegex.lowerCase.test(password)) {
      toast.error("Password must contain at least one lowercase letter", {
        theme: "dark",
      });
      return false;
    }

    if (!passwordRegex.digit.test(password)) {
      toast.error("Password must contain at least one digit", {
        theme: "dark",
      });
      return false;
    }

    if (!passwordRegex.specialChar.test(password)) {
      toast.error("Password must contain at least one special character", {
        theme: "dark",
      });
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("password and confirm should be same", {
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
          "http://localhost:5000/api/auth/register",
          values
        );
        if (response.data.status) {
          Navigate("/profile");
          localStorage.setItem("userid", response.data.user_id);
        } else {
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
      <div className="regiset">
        <h1>User Registration</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" onInput={handleChange} id="name" name="name" />

          <label htmlFor="username">Username:</label>
          <input
            type="text"
            onInput={handleChange}
            id="username"
            name="username"
          />

          <label htmlFor="phone">Phone:</label>
          <input type="number" onInput={handleChange} id="phone" name="phone" />

          <label htmlFor="email">Email:</label>
          <input type="email" onInput={handleChange} id="email" name="email" />

          <label htmlFor="password">Password:</label>
          <input
            type={inputType}
            onInput={handleChange}
            id="password"
            name="password"
          />

          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            onInput={handleChange}
            type={inputType}
            id="confirm-password"
            name="confirmPassword"
          />

          <button onClick={passtype}>{passtypebutton}</button>
          <button onClick={handleSubmit}>Register</button>

          <Link to="/login">Loginpage</Link>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
