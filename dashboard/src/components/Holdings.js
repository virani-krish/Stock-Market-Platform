import React, { useState, useEffect, useMemo, useContext } from "react";

import api from "./api/axios";
import { VerticalGraph } from "./VerticalGraph";
import GeneralContext from "./GeneralContext";

// import { holdings } from "../data/data";

const Holdings = () => {

  const { holdings } = useContext(GeneralContext);

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

  const labels = holdings.map((holding) => holding["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: 'Stock Valuation',
        data: holdings.map((holding) => holding.currentValue),
        backgroundColor: [
          "rgba(255, 99, 34, 0.5)",
          "rgba(24, 241, 38, 0.5)",
          "rgba(34, 38, 255, 0.5)",
          "rgba(34, 244, 255, 0.5)",
          "rgba(194, 241, 24, 0.54)",
          "rgba(167, 34, 255, 0.5)",
        ]
      },
    ],
  }

  if(!holdings) {
    return <div>Loading..</div>
  }

  return (
    <>
      <h3 className="title">Holdings ({holdings.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg. cost</th>
            <th>LTP</th>
            <th>Cur. val</th>
            <th>P&L</th>
            <th>Day chg.</th>
          </tr>

          {holdings.map((stock, index) => {
            const curValue = stock.currentValue;
            const isProfite = stock.currentValue > stock.qty * stock.avgPrice;
            const profClass = isProfite ? "profit" : "loss";
            const dayChange = stock.dayChange >= 0 ? "profit" : "loss";

            return (
              <tr key={index}>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.avgPrice.toFixed(2)}</td>
                <td>{stock.ltp.toFixed(2)}</td>
                <td>{curValue.toFixed(2)}</td>
                <td className={profClass}>
                  {stock.netPnl >= 0 ? "+" : ""}
                  ₹{Math.abs(stock.netPnl).toFixed(2)}
                  {" "}
                  ({stock.netPnlPercent.toFixed(2)}%)
                </td>
                <td className={dayChange} style={{ fontSize: "14.4px" }}>{stock.dayChangePercent.toFixed(2)}%</td>
              </tr>
            )
          })}

        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>
            {/* 29,875.<span>55</span>{" "} */}
            ₹{totalInvestment.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
            })}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            {/* 31,428.<span>95</span>{" "} */}
            ₹{totalCurrentValue.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
            })}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5 className={totalPnL > 0 ? "profit" : "loss"}>{totalPnL.toFixed(2)} ({totalPnLPercent.toFixed(2)}%)</h5>
          <p>P&L</p>
        </div>
      </div>

      <VerticalGraph data={data} />

    </>
  );
};

export default Holdings;
