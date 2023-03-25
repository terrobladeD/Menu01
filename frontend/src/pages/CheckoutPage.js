import React, { useContext, useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import AppContext from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const { dishes, tableNum,clearDishes  } = useContext(AppContext);
  const [inputTableNum, setInputTableNum] = useState(tableNum || '');
  const [email, setEmail] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const navigate = useNavigate();

  const totalItems = dishes.reduce((acc, dish) => acc + dish.quantity, 0);
  const totalPrice = dishes.reduce((acc, dish) => acc + dish.price_cur * dish.quantity, 0);

  const paddingTopBottom = { paddingTop: '8px', paddingBottom: '8px' };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      total_price: totalPrice,
      table_num: parseInt(inputTableNum, 10),
      email: email,
      additional_info: additionalInfo,
      details: dishes
        .filter((dish) => dish.quantity > 0)
        .map((dish) => ({ quantity: dish.quantity, dishId: dish.id })),
    };

    try {
      const response = await fetch('http://localhost:8080/api/order/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        // handle the form submission and proceed to the payment gateway
        alert('Payment finished');
        clearDishes();
        navigate('/');
      } else {
        alert('Error submitting the order');
      }
    } catch (error) {
      alert('Error submitting the order');
    }
  };


  return (
    <div style={{ padding: '8px' }}>
      <Row>
        <Col style={paddingTopBottom} xs={4} md={3}>
          <Button variant="outline-secondary" onClick={() => navigate('/shopping-cart')}>
            Back
          </Button>
        </Col>
        <Col xs={8} md={9}>
          <h1 style={paddingTopBottom}>Checkout</h1>
        </Col>

      </Row>
      <p>Total Items: {totalItems}</p>
      <p>Total Price: ${totalPrice.toFixed(2)}</p>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Table Number</Form.Label>
          <Form.Control
            type="number"
            value={inputTableNum}
            onChange={(e) => setInputTableNum(e.target.value)}
            required={!tableNum}
            readOnly={!!tableNum}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Additional Information</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" style={{ marginTop: '24px' }}>
          Proceed to Payment
        </Button>
      </Form>
    </div>
  );
}

export default Checkout;
