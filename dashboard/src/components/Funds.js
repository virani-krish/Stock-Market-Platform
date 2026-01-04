import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "./api/axios";

const Funds = () => {

  const [wallet, setWallet] = useState('');

  useEffect(() => {

    const fetchWallet = async () => {
      try {
        const res = await api.get("/wallet");
        setWallet(res.data);
      } catch (err) {
        // 401 is handled globally by axios interceptor
        console.error("Failed to fetch wallet");
      }
    };

    fetchWallet();

    const interval = setInterval(() => {
      fetchWallet();
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  return (
    <>
      <div className="funds">
        <p>Instant, zero-cost fund transfers with UPI </p>
        <Link className="btn btn-green">Add funds</Link>
        <Link className="btn btn-blue">Withdraw</Link>
      </div>

      <div className="row">
        <div className="col">
          <span>
            <p>Equity</p>
          </span>

          <div className="table">
            <div className="data">
              <p>Total balance</p>
              <p className="imp colored">{wallet.availableBalance + wallet.usedBalance}</p>
            </div>
            <div className="data">
              <p>Available balance</p>
              <p className="imp colored">{wallet.availableBalance}</p>
            </div>
            <div className="data">
              <p>Used balance</p>
              <p className="imp">{wallet.usedBalance}</p>
            </div>
            
          </div>
        </div>

        <div className="col">
          <div className="commodity">
            <p>You don't have a commodity account</p>
            <Link className="btn btn-blue">Open Account</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funds;
