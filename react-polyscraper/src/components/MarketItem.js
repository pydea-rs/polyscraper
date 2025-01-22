import React, {useState} from "react";

const MarketItem = ({ market, onClick }) => {
  const { question, icon, image } = market;
  const [isSelectedToExport, setIsSelectedToExport] = useState(false);

  const handleClick = (event) => {
    if(!onClick)
      return;
    setIsSelectedToExport(onClick(event))
  }

  return (
    <div
      className={`market-item hover-card ${isSelectedToExport ? 'bg-success' : ''}`}
      onClick={handleClick}
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
