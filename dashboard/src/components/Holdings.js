import React, { useState, useEffect } from "react";

import api from "./api/axios";
import { VerticalGraph } from "./VerticalGraph";

// import { holdings } from "../data/data";

const Holdings = () => {

  const [allHoldings, setAllHoldings] = useState([]);

  useEffect(() => {

    const fetchHoldings = async () => {
      try {
        const res = await api.get("/allHoldings");
        setAllHoldings(res.data);
      } catch (err) {
        // 401 is handled globally by axios interceptor
        console.error("Failed to fetch holdings");
      }
    };

    fetchHoldings();

    const interval = setInterval(() => {
      fetchHoldings();
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  const labels = allHoldings.map((holding) => holding["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: 'Stock Valuation',
        data: allHoldings.map((holding) => holding.currentValue),
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

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

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

          {allHoldings.map((stock, index) => {
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
            29,875.<span>55</span>{" "}
          </h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>
            31,428.<span>95</span>{" "}
          </h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>1,553.40 (+5.20%)</h5>
          <p>P&L</p>
        </div>
      </div>

      <VerticalGraph data={data} />

    </>
  );
};

export default Holdings;
