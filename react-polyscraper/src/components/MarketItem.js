import React, { useState, useRef } from "react";

const LONG_CLICK_DELAY = 500;
const MarketItem = ({ market, onClick }) => {
  const { question, icon, image } = market;
  const [isSelectedToExport, setIsSelectedToExport] = useState(false);
  const [isLongClick, setIsLongClick] = useState(false);
  const timerRef = useRef(null);


  const handleMouseDown = (event) => {
    timerRef.current = setTimeout(() => {
      setIsLongClick(true);
      setIsSelectedToExport(onClick(event, true));
    }, LONG_CLICK_DELAY);
  };

  const handleMouseUp = () => {
    clearTimeout(timerRef.current);
  };

  const handleTouchStart = (event) => {
    timerRef.current = setTimeout(() => {
      setIsLongClick(true);
      setIsSelectedToExport(onClick(event, true));
    }, LONG_CLICK_DELAY);
  };

  const handleClick = (event) => {
    if (!onClick) return;
    if(!isLongClick)
      setIsSelectedToExport(onClick(event));
    setIsLongClick(false);
  };

  const handleTouchEnd = () => {
    clearTimeout(timerRef.current);
  };

  return (
    <div
      className={`market-item hover-card ${
        isSelectedToExport ? "bg-success" : ""
      }`}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="d-flex align-items-center">
        {icon || image ? (
          <img src={icon || image} alt="Market Icon" className="market-icon" />
        ) : null}
        <span className="market-name">{question}</span>
      </div>
    </div>
  );
};

export { MarketItem };
