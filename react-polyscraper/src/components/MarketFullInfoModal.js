import React from "react";
import { Modal, Button, ListGroup, Row, Col } from "react-bootstrap";
import { anythingToString, toCapitalCase } from "../services/stringify";
import { exportToExcel } from "../services/excel";

const MarketFullInfoModal = ({ isOpen, children: market, onClose }) => {
  return (
    <Modal show={isOpen} onHide={onClose} centered size="lg" animation={true}>
      <Modal.Header closeButton>
        <div className="d-flex align-items-center">
          {market?.image ? (
            <img
              src={market?.image}
              alt="Market Icon"
              className="market-detail-image"
            />
          ) : null}
          <Modal.Title className="ml-3">{market?.question}</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {market &&
            Object.entries(market)
              .filter(
                ([field, _]) => !["description", "tokens"].includes(field)
              )
              .map(([field, value], idx) => (
                <ListGroup.Item key={idx}>
                  <Row>
                    <Col>
                      <h6>{toCapitalCase(field)}</h6>
                    </Col>
                    <Col>
                      {value?.["includes"] && value?.includes("https://") ? (
                        <a href={value}>Click Here</a>
                      ) : (
                        anythingToString(value)
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Col>
          <Button variant="success" onClick={() => exportToExcel([market], market.question, 'Single Poly Market')}>
            Save As Excel
          </Button>
        </Col>
        <Col>
          <Button
            style={{ float: "right" }}
            variant="secondary"
            onClick={onClose}
          >
            Close
          </Button>
        </Col>
      </Modal.Footer>
    </Modal>
  );
};

export { MarketFullInfoModal };
