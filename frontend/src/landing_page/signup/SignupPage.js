import React, { useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const SignupPage = () => {

  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });

  const { email, password, username } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:3002/auth/signup",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );

      const { success, message } = data;

      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          window.location.href = "http://localhost:3001";
        }, 1000);

      } else {

        handleError(message);

      }
    } catch (error) {
      console.log(error);
    }

    setInputValue({
      ...inputValue,
      email: "",
      password: "",
      username: "",
    });

  };

  return (
    <div className="form_container my-5 container">
      <h2 className="text-center">Signup Account</h2>
      <div style={{ width: "400px", margin: "auto" }}>
        <form onSubmit={handleSubmit} className="my-5 pb-5">
          <div>
            <label htmlFor="email" class="form-label">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              class="form-control"
              value={email}
              placeholder="Enter your email"
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="username" class="form-label">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              class="form-control"
              value={username}
              placeholder="Enter your username"
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label htmlFor="password" class="form-label">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              class="form-control"
              value={password}
              placeholder="Enter your password"
              onChange={handleOnChange}
            />
          </div> <br />
          <button type="submit" className="btn btn-primary">Signup</button>
          <span>
            &nbsp;&nbsp;
            Already have an account? <Link to={"/login"}>Login</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignupPage;
