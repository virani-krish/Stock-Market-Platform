import React, { useContext } from "react";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import { AuthContext } from "./AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <TopBar username={user} />
      <Dashboard />
    </>
  );
};

export default Home;
