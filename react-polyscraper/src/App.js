import React, { useState, useEffect } from "react";
import { fetchMarkets } from "./services/api";
import { MarketList } from "./components/MarketList";
import { MarketDetailModal } from "./components/MarketDetailModal";
import { Container, Row, Col } from "react-bootstrap";
import { FaFileExcel } from "react-icons/fa"; // Import the Excel icon
import "./App.css";
import { exportToExcel } from "./services/excel";

const App = () => {
  const [markets, setMarkets] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [enableExport, setEnableExport] = useState(false);
  const [exportSelection, setExportSelection] = useState([]);

  const loadMarkets = async (cursor = null) => {
    setLoading(true);
    try {
      const data = await fetchMarkets(cursor);
      if (data) {
        setMarkets((prevMarkets) => [...prevMarkets, ...data.data]);
        setNextCursor(data.next_cursor);
      }
    } catch (ex) {
      console.error("Failed fetching markets: ", ex);
    }
    setLoading(false);
  };

  useEffect(() => {
    setEnableExport(Boolean(markets?.length));
  }, [markets]);

  useEffect(() => {
    loadMarkets();
  }, []);

  const handleMarketClick = (event, market, isLongClick) => {
    if (event.ctrlKey || isLongClick) {
      if (exportSelection.length) {
        const index = exportSelection.findIndex(
          (item) =>
            item.question === market.question &&
            item.question_id === market.question_id &&
            item.condition_id === market.condition_id
        );
        if (index !== -1) {
          setExportSelection(exportSelection.filter((_, i) => i !== index));
          return false;
        }
      }
      setExportSelection(exportSelection => ([...exportSelection, market]));
      return true;
    } else {
      setSelectedMarket(market);
    }
  };

  const handleCloseModal = () => {
    setSelectedMarket(null);
  };

  const handleLoadMore = () => {
    if (nextCursor) {
      loadMarkets(nextCursor);
    }
  };

  const handleExport = () => {
    try {
      const targetNamePrefix = exportSelection?.length ? `${exportSelection.length}-selected` : `poly.${markets.length}`;
      exportToExcel(exportSelection?.length ? exportSelection : markets, `${targetNamePrefix}-markets.${Date.now()}`);
    } catch (ex) {
      console.error(ex);
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

      <button
        disabled={!enableExport}
        className="export-btn"
        onClick={handleExport}
      >
        <FaFileExcel size={30} color="white" />
      </button>
    </Container>
  );
};

export default App;
