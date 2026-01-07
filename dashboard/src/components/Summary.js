import React, { useContext, useMemo } from "react";
import GeneralContext from "./GeneralContext";

const Summary = () => {

  const { holdings, wallet } = useContext(GeneralContext);

  const totalInvestment = useMemo(() => {
    return holdings.reduce(
      (sum, h) => sum + h.avgPrice * h.qty,
      0
    );
  }, [holdings]);

  const totalCurrentValue = useMemo(() => {
    return holdings.reduce(
      (sum, h) => sum + h.ltp * h.qty,
      0
    );
  }, [holdings]);

  const totalPnL = totalCurrentValue - totalInvestment;

  const totalPnLPercent =
    totalInvestment > 0
      ? (totalPnL / totalInvestment) * 100
      : 0;

  if(!holdings || !wallet) {
    return <div>Loading..</div>
  }

  return (
    <>
      <div className="username">
        <h6>Hi, User!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>₹{wallet.availableBalance.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
            })}</h3>
            <p>Balance available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Balance used <span>₹{wallet.usedBalance.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
              })}</span>{" "}
            </p>
            <p>
              Total balance <span>₹{(wallet.availableBalance + wallet.usedBalance).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
              })}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({holdings.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={totalPnL > 0 ? "profit" : "loss"}>
              {totalPnL.toFixed(2)} <small className={totalPnL > 0 ? "profit" : "loss"}>{totalPnLPercent.toFixed(2)}%</small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{totalCurrentValue.toFixed(2)}</span>{" "}
            </p>
            <p>
              Investment <span>{totalInvestment.toFixed(2)}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
