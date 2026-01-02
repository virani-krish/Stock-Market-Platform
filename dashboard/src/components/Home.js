import React, { useContext } from "react";
import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import { AuthContext } from "./AuthContext";
import { GeneralContextProvider } from "./GeneralContext";


const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <GeneralContextProvider>
        <TopBar username={user} />
        <Dashboard />
      </GeneralContextProvider>
    </>
  );
};

export default Home;
