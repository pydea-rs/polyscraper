import React from "react";

const MarketItem = ({ market, onClick }) => {
  const { question, icon, image } = market;

  return (
    <div className="market-item hover-card" onClick={onClick}>
      <div className="d-flex align-items-center">
        {icon || image ? (
          <img
            src={icon || image}
            alt="Market Icon"
            className="market-icon"
          />
        ) : null}
        <span className="market-name">{question}</span>
      </div>
    </div>
  );
};

export { MarketItem };
