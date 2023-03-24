import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

function CartItem({ item, onIncrease, onDecrease }) {
  return (
    <Row className="align-items-center mb-4">
      <Col xs={4} md={3}>
        <img
          src={item.image}
          alt={item.name}
          className="img-fluid"
          style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'cover' }}
        />
      </Col>
      <Col xs={8} md={6}>
        <h4>{item.name}</h4>
        <p>{item.description}</p>
        <p>${item.price_cur.toFixed(2)}</p>
      </Col>
      <Col xs={12} md={3} className="text-center">
        <Button variant="outline-primary" onClick={() => onDecrease(item)}>-</Button>
        <span className="mx-2">{item.quantity}</span>
        <Button variant="outline-primary" onClick={() => onIncrease(item)}>+</Button>
      </Col>
    </Row>
  );
}

export default CartItem;
