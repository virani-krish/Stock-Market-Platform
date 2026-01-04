import React, {useContext} from "react";

import Menu from "./Menu";
import GeneralContext from "./GeneralContext";
import { useMemo } from "react";

const TopBar = ({ username }) => {

  const { marketOpen, stocks } = useContext(GeneralContext);
  let nifty50;
  nifty50 = useMemo(() => {
    console.log(stocks);
    return stocks.find((stock) => {
      return stock.symbol === "^NSEI"
    });
  }, [stocks]);

  let niftyBank;
  niftyBank = useMemo(() => {
    console.log(stocks);
    return stocks.find((stock) => {
      return stock.symbol === "^NSEBANK"
    });
  }, [stocks]);

  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className="index-points"><span className={nifty50?.percent > 0 ? "profit" : "loss"}>{nifty50 ? nifty50.price : "--"}</span></p>
          <p className="percent"> </p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-points"><span className={niftyBank?.percent > 0 ? "profit" : "loss"}>{niftyBank ? niftyBank.price : "--"}</span></p>
          <p className="percent"></p>
        </div>
        <div>
          <p className={marketOpen ? "market-open" : "market-closed"}>
            MARKET {marketOpen ? "OPEN" : "CLOSED"}
          </p>
        </div>
      </div>

      <Menu username={username} />
    </div>
  );
};

export default TopBar;
