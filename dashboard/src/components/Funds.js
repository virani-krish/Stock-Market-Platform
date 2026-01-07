import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "./api/axios";
import GeneralContext from "./GeneralContext";

const Funds = () => {

  const { wallet } = useContext(GeneralContext)

  if (!wallet) {
    return <div>Loading..</div>;
  }

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
              <p className="imp colored">₹{(wallet.availableBalance + wallet.usedBalance).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
              })}</p>
            </div>
            <div className="data">
              <p>Available balance</p>
              <p className="imp colored">₹{(wallet.availableBalance).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
              })}</p>
            </div>
            <div className="data">
              <p>Used balance</p>
              <p className="imp">₹{(wallet.usedBalance).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
              })}</p>
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
