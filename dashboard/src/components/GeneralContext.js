import React, { useState } from "react";

import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (uid) => {},
  closeBuyWindow: () => {},
  openSellWindow: (uid) => {},
  closeSellWindow: () => {},

  marketOpen: false,
  setMarketOpen: () => {},

  stocks: [],
  setStocks: () => {}
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [selectStockName, setSelectStockName] = useState("");
  const [marketOpen, setMarketOpen] = useState(false);
  const [stocks, setStocks] = useState([]);

  const handleOpenBuyWindow = (symbol, name) => {
    setIsBuyWindowOpen(true);
    setSelectedStockUID(symbol);
    setSelectStockName(name);
  };

  const handleCloseBuyWindow = () => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
    setSelectStockName("");
  };

  const handleOpenSellWindow = (symbol, name) => {
    setIsSellWindowOpen(true);
    setSelectedStockUID(symbol);
    setSelectStockName(name);
  };

  const handleCloseSellWindow = () => {
    setIsSellWindowOpen(false);
    setSelectedStockUID("");
    setSelectStockName("");
  };

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        openSellWindow: handleOpenSellWindow,
        closeSellWindow: handleCloseSellWindow,
        
        marketOpen,
        setMarketOpen,

        stocks,
        setStocks
      }}
    >
      {props.children}
      {isBuyWindowOpen && <BuyActionWindow symbol={selectedStockUID} name={selectStockName} />}
      {isSellWindowOpen && <SellActionWindow symbol={selectedStockUID} name={selectStockName} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;