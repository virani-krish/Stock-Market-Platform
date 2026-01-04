import React, { useEffect, useState } from "react";

import BuyActionWindow from "./BuyActionWindow";
import SellActionWindow from "./SellActionWindow";
import api from "./api/axios";
import { fetchStocks } from "./api/stocks";

const GeneralContext = React.createContext({
  openBuyWindow: (uid) => { },
  closeBuyWindow: () => { },
  openSellWindow: (uid) => { },
  closeSellWindow: () => { },

  marketOpen: false,
  setMarketOpen: () => { },

  stocks: [],
  setStocks: () => { },

  holdings: [],
  setHoldings: () => { },

  wallet: "",
  setWallet: () => { }
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [isSellWindowOpen, setIsSellWindowOpen] = useState(false);

  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [selectStockName, setSelectStockName] = useState("");

  const [marketOpen, setMarketOpen] = useState(false);
  const [stocks, setStocks] = useState([]);
  const [holdings, setHoldings] = useState([]);
  const [wallet, setWallet] = useState('');


  // buy sell window handle
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


  // fetch stock data
  useEffect(() => {
    const loadStocks = async () => {
      try {
        const res = await fetchStocks();
        setStocks(res.data);
        setMarketOpen(res.marketOpen);
      } catch (err) {
        console.error("Failed to fetch stocks");
      }
    };

    loadStocks();
    const interval = setInterval(loadStocks, 5000);
    return () => clearInterval(interval);
  }, []);
  

  // fetch holdings data
  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const res = await api.get("/holding");
        setHoldings(res.data);
      } catch (err) {
        console.error("Failed to fetch holdings");
      }
    };

    fetchHoldings(); // initial load

    const interval = setInterval(fetchHoldings, 5000); // auto refresh
    return () => clearInterval(interval);
  }, []);


  // fetch wallet data
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
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        openSellWindow: handleOpenSellWindow,
        closeSellWindow: handleCloseSellWindow,

        marketOpen,
        setMarketOpen,

        stocks,
        setStocks,

        holdings,
        setHoldings,

        wallet,
        setWallet
      }}
    >
      {props.children}
      {isBuyWindowOpen && <BuyActionWindow symbol={selectedStockUID} name={selectStockName} />}
      {isSellWindowOpen && <SellActionWindow symbol={selectedStockUID} name={selectStockName} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;