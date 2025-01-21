import React from 'react';
import { Modal, Button, ListGroup, Row, Col, Badge, Card } from 'react-bootstrap';
import { FaDollarSign, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const MarketDetailModal = ({ isOpen, market, onClose }) => {
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
        <Row>
          <Col md={8}>
            <Card>
              <Card.Body>
                <h5>Description</h5>
                <p>{market?.description || 'No description available.'}</p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <h5>Status</h5>
                <p>
                  {market?.closed ? (
                    <Badge pill bg="dark">Closed</Badge>
                  ) : (
                    <Badge pill bg="primary">Ongoing</Badge>
                  )}
                </p>
                <h5>Tags</h5>
                <div>
                  {market?.tags?.map((tag, idx) => (
                    <Badge pill key={idx} bg="warning" className="mr-2">{tag}</Badge>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <h5 className="mt-4">Tokens</h5>
        <ListGroup>
          {market?.tokens?.map((token, idx) => (
            <ListGroup.Item key={idx}>
              <Row>
                <Col md={6}>
                  <h6>{token.outcome}</h6>
                </Col>
                <Col md={3}>
                  <FaDollarSign /> {token.price}$
                </Col>
                <Col md={3}>
                  {token.winner ? (
                    <Badge bg="success"><FaCheckCircle /> Winner</Badge>
                  ) : (
                    <Badge bg="danger"><FaTimesCircle /> Not Winner</Badge>
                  )}
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export { MarketDetailModal };
