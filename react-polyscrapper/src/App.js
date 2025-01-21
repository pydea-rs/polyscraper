import React, { useState, useEffect } from "react";
import { fetchMarkets } from "./services/api";
import { MarketList } from "./components/MarketList";
import { MarketDetailModal } from "./components/MarketDetailModal";
import { Container, Row, Col } from "react-bootstrap";

import "./App.css";

const App = () => {
  const [markets, setMarkets] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadMarkets = async (cursor = null) => {
    setLoading(true);
    const data = await fetchMarkets(cursor);
    if (data) {
      setMarkets((prevMarkets) => [...prevMarkets, ...data.data]);
      setNextCursor(data.next_cursor);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadMarkets();
  }, []);

  const handleMarketClick = (market) => {
    setSelectedMarket(market);
  };

  const handleCloseModal = () => {
    setSelectedMarket(null);
  };

  const handleLoadMore = () => {
    if (nextCursor) {
      loadMarkets(nextCursor);
    }
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col md={12}>
          <MarketList
            markets={markets}
            onMarketClick={handleMarketClick}
            onLoadMore={handleLoadMore}
            isLoading={loading}
          />
        </Col>
      </Row>

      <MarketDetailModal
        isOpen={Boolean(selectedMarket)}
        market={selectedMarket}
        onClose={handleCloseModal}
      />
    </Container>
  );
};

export default App;
