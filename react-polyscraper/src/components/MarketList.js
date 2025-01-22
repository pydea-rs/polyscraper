import React from 'react';
import { MarketItem } from './MarketItem';
import { Button, Spinner, Container } from 'react-bootstrap';

const MarketList = ({ markets, onMarketClick, onLoadMore, isLoading }) => {
  return (
    <Container fluid className="markets-container">
      <h1 className="text-center mb-4 text-primary">Poly Market List</h1>
      <div className="markets-content">
        {!isLoading && !markets?.length ? (
          <p className="text-center text-muted">No markets available.</p>
        ) : (
          <div className="list-group">
            {markets.map((market, index) => (
              <MarketItem key={index} market={market} onClick={(e) => onMarketClick(e, market)} />
            ))}
          </div>
        )}
        {isLoading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <div className="d-flex justify-content-center mt-4">
            <Button variant="success" onClick={onLoadMore}>See More</Button>
          </div>
        )}
      </div>
    </Container>
  );
};

export { MarketList };
