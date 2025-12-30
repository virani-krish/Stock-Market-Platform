import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const LoginPage = () => {

  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputValue;

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
        "http://localhost:3002/auth/login",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );

      console.log(data);

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
    });

  };

  return (
    <div className="form_container container my-5">
      <h2 className="text-center">Login Account</h2>
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
          <button type="submit" className="btn btn-primary">Login</button>
          <span>
            &nbsp;&nbsp;
            Already have an account? <Link to={"/signup"}>Signup</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;