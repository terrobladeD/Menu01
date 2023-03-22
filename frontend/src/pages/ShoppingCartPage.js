import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import CartItem from '../components/CartItem.component';

function ShoppingCartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Spaghetti Carbonara',
      description: 'Delicious spaghetti with bacon and parmesan cheese.',
      price: 12.99,
      image: 'https://random.imagecdn.app/200/200',
      quantity: 1,
    },
    {
      id: 2,
      name: 'Grilled Chicken Salad',
      description: 'A healthy salad with grilled chicken, lettuce, tomatoes, and a light dressing.',
      price: 10.99,
      image: 'https://random.imagecdn.app/200/200',
      quantity: 2,
    },
  ]);

  const handleIncrease = (item) => {
    setCartItems(
      cartItems.map((cartItem) => (cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem))
    );
  };

  const handleDecrease = (item) => {
    setCartItems((prevCartItems) =>
      prevCartItems
        .map((cartItem) => {
          if (cartItem.id === item.id) {
            if (cartItem.quantity === 1) {
              return null;
            } else {
              return { ...cartItem, quantity: cartItem.quantity - 1 };
            }
          } else {
            return cartItem;
          }
        })
        .filter((cartItem) => cartItem !== null)
    );
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Container>
      <h1>Shopping Cart</h1>
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} onIncrease={handleIncrease} onDecrease={handleDecrease} />
      ))}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <h3>Total: ${total.toFixed(2)}</h3>
        <div>
          <Button variant="primary" onClick={() => alert('Add more items')}>
            Add more
          </Button>
          <Button variant="success" onClick={() => alert('Proceed to checkout')} className="me-2">
            Checkout
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default ShoppingCartPage;
