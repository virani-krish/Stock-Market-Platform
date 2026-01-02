import React, {useContext} from "react";

import Menu from "./Menu";
import GeneralContext from "./GeneralContext";

const TopBar = ({ username }) => {

  const { marketOpen } = useContext(GeneralContext);

  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className="index-points">{100.2} </p>
          <p className="percent"> </p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-points">{100.2}</p>
          <p className="percent"></p>
        </div>
        <div>
          <p className={marketOpen ? "market-open" : "market-closed"}>
            Market {marketOpen ? "Open" : "Closed"}
          </p>
        </div>
      </div>

      <Menu username={username} />
    </div>
  );
};

export default TopBar;
