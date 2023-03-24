import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';

function DishItem({ dish, onAddToCart, onRemoveFromCart }) {
  const handleAddToCart = () => {
    onAddToCart(dish);
  };

  const handleRemoveFromCart = () => {
    onRemoveFromCart(dish);
  };

  return (
    <Card className="mb-4">
      <Row className="align-items-center">
        <Col xs={4} md={3}>
          <Card.Img
            src={dish.image}
            alt={dish.name}
            style={{ maxWidth: '150px', maxHeight: '150px', objectFit: 'cover' }}
          />
        </Col>
        <Col xs={8} md={9}>
          <Card.Body>
            <Card.Title>{dish.name}</Card.Title>
            <Card.Text>{dish.description}</Card.Text>
            {dish.price_ori !== dish.price_cur && (
              <Card.Text>
                <span style={{ textDecoration: 'line-through', fontSize: '0.8em', color: 'grey' }}>
                  ${dish.price_ori.toFixed(2)}
                </span>{' '}
                <span>${dish.price_cur.toFixed(2)}</span>
              </Card.Text>
            )}
            {dish.price_ori === dish.price_cur && <Card.Text>${dish.price_cur.toFixed(2)}</Card.Text>}
          </Card.Body>
        </Col>
      </Row>
      <Card.Footer className="text-end">
        {!dish.is_sold_out && dish.quantity === 0 && (
          <Button variant="success" onClick={handleAddToCart}>
            +
          </Button>
        )}
        {!dish.is_sold_out && dish.quantity > 0 && (
          <>
            <Button variant="danger" onClick={handleRemoveFromCart}>
              -
            </Button>
            <span className="mx-2">{dish.quantity}</span>
            <Button variant="success" onClick={handleAddToCart}>
              +
            </Button>
          </>
        )}
        {dish.is_sold_out && (
          <span style={{ fontWeight: 'bold', color: 'red' }}>Sold Out</span>
        )}
      </Card.Footer>
    </Card>
  );
}

export default DishItem;
