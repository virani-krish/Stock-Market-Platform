import React, { useState, useContext } from "react";
import GeneralContext from "./GeneralContext";

import { Tooltip, Grow } from '@mui/material';
import { BarChartOutlined, KeyboardArrowDown, KeyboardArrowUp, MoreHoriz } from '@mui/icons-material'

// import { watchlist } from "../data/data";

const WatchList = () => {
  
  const { stocks } = useContext(GeneralContext);

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts"> {stocks.length} / 50</span>
      </div>

      <ul className="list">
        {stocks.map((stock, index) => {
          if(stock.symbol == "^NSEBANK" || stock.symbol == "^NSEI") {
            return
          }
          return (
            <WatchListItem stock={stock} key={index} />
          )
        })}
      </ul>
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock }) => {
  const [showWatchListActions, setShowWatchListActions] = useState(false);

  const handleMouseEnter = (e) => {
    setShowWatchListActions(true);
  }

  const handleMouseLeave = (e) => {
    setShowWatchListActions(false);
  }

  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="item">
        <p className={stock.percent < 0 ? "down" : "up"}>{stock.name}</p>
        <div className="item-info">
          <span className="percent">{stock.percent.toFixed(2)}%</span>
          {stock.percent < 0 ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}
          <span className="price">{stock.price}</span>
        </div>
      </div>
      {showWatchListActions && <WatchListAction symbol={stock.symbol} name={stock.name} />}
    </li>
  )

}

const WatchListAction = ({ symbol, name }) => {

  const { openBuyWindow, openSellWindow } = useContext(GeneralContext);

  const handleBuyClick = () => {
    openBuyWindow(symbol, name);
  };

  const handleSellClick = () => {
    openSellWindow(symbol, name);
  }

  return (
    <span className="actions">
      <span>
        <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow} onClick={handleBuyClick}>
          <button className="buy">Buy</button>
        </Tooltip>
        <Tooltip title="Sell (S)" placement="top" arrow TransitionComponent={Grow} onClick={handleSellClick}>
          <button className="sell">Sell</button>
        </Tooltip>
        <Tooltip title="Analytics (A)" placement="top" arrow TransitionComponent={Grow}>
          <button className="action">
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>
        <Tooltip title="More (M)" placement="top" arrow TransitionComponent={Grow}>
          <button className="action">
            <MoreHoriz className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  )
}