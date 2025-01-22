import React from "react";
import { Modal, Button, ListGroup, Row, Col } from "react-bootstrap";
import { anythingToString, toCapitalCase } from "../services/stringify";

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
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { MarketFullInfoModal };
