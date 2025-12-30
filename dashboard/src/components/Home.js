import React, {useState, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";

const Home = () => {

  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  
  useEffect(() => {

    const verifyCookie = async () => {

      if (!cookies.token) {
        window.location.href = "http://localhost:3000/login";
      }

      const { data } = await axios.post(
        "http://localhost:3002/auth/verify",
        {},
        { withCredentials: true }
      );

      const { status, user } = data;

      setUsername(user);
      
      // return status
      //   ? toast(`Hello ${user}`, {
      //     position: "bottom-right",
      //   })
      //   : (removeCookie("token"), window.location.href = "http://localhost:3000/login");

    };

    verifyCookie();

  }, [cookies, navigate, removeCookie]);

  // const Logout = () => {
  //   removeCookie("token");
  //   navigate("/signup");
  // };

  return (
    <>
      <TopBar />
      <Dashboard />
      <ToastContainer />
    </>
  );
};

export default Home;
