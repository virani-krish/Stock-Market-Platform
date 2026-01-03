import React, { useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import GeneralContext from "./GeneralContext";

import "./BuyActionWindow.css";

const BuyActionWindow = ({ symbol, name }) => {
    const [stockQuantity, setStockQuantity] = useState(1);
    const [stockPrice, setStockPrice] = useState(0.0);

    const { closeBuyWindow } = useContext(GeneralContext);


    const containerRef = useRef(null);
    const offset = useRef({ x: 0, y: 0 });

    const onMouseDown = (e) => {
        const rect = containerRef.current.getBoundingClientRect();
        offset.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    };

    const onMouseMove = (e) => {
        containerRef.current.style.left = `${e.clientX - offset.current.x}px`;
        containerRef.current.style.top = `${e.clientY - offset.current.y}px`;
    };

    const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
    };


    const handleBuyClick = async () => {
        await axios.post("http://localhost:3002/order", {
            symbol: symbol,
            name: name,
            qty: stockQuantity,
            price: stockPrice,
            mode: "BUY",
        }, {
            withCredentials: true
        });

        closeBuyWindow();
    };

    const handleCancelClick = () => {
        closeBuyWindow();
    };

    return (
        <div className="container" id="buy-window" draggable="true" ref={containerRef}
            onMouseDown={onMouseDown}>
            <div className="regular-order">
                <div className="inputs">
                    <fieldset>
                        <legend>Qty.</legend>
                        <input
                            type="number"
                            name="qty"
                            id="qty"
                            onChange={(e) => setStockQuantity(e.target.value)}
                            value={stockQuantity}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Price</legend>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            step="0.05"
                            onChange={(e) => setStockPrice(e.target.value)}
                            value={stockPrice}
                        />
                    </fieldset>
                </div>
            </div>

            <div className="buttons">
                <span>Margin required ₹140.65</span>
                <div>
                    <Link className="btn btn-blue" onClick={handleBuyClick}>
                        Buy
                    </Link>
                    <Link to="" className="btn btn-grey" onClick={handleCancelClick}>
                        Cancel
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BuyActionWindow;