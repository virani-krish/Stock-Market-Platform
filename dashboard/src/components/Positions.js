import React, { useState, useEffect } from "react";
import api from "./api/axios"

// import { positions } from "../data/data";

const Positions = () => {

  let [allPositions, setAllPositions] = useState([]);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const res = await api.get("/position");
        setAllPositions(res.data);
      } catch (err) {
        // 401 is handled globally by axios interceptor
        console.error("Failed to fetch holdings");
      }
    };

    fetchPositions();
  }, []);

  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>

      <div className="order-table">
        <table>
          <tr>
            <th>Product</th>
            <th>Instrument</th>
            <th>Qty.</th>
            <th>Avg.</th>
            <th>LTP</th>
            <th>P&L</th>
            <th>Chg.</th>
          </tr>

          {allPositions.map((stock, index) => {
            const curValue = stock.price * stock.qty;
            const isProfite = curValue - stock.avg * stock.qty >= 0.0;
            const profClass = isProfite ? "profit" : "loss";
            const dayChange = stock.isLoss ? "loss" : "profit";

            return (
              <tr key={index}>
                <td>{stock.product}</td>
                <td>{stock.name}</td>
                <td>{stock.qty}</td>
                <td>{stock.avg.toFixed(2)}</td>
                <td>{stock.price.toFixed(2)}</td>
                <td className={profClass}>{(curValue - stock.avg * stock.qty).toFixed(2)}</td>
                <td className={profClass}>{stock.day}</td>
              </tr>
            )
          })}

        </table>
      </div>
    </>
  );
};

export default Positions;
