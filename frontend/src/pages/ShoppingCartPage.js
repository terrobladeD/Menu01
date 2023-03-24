import React, { useContext } from 'react';
import { Container, Button } from 'react-bootstrap';
import CartItem from '../components/CartItem.component';
import AppContext from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

function ShoppingCartPage() {
  const { dishes, addToCart, removeFromCart } = useContext(AppContext);
  const cartItems = dishes.filter((dish) => dish.quantity > 0);
  const total = cartItems.reduce((acc, item) => acc + item.price_cur * item.quantity, 0);
  const navigate = useNavigate();

  return (
    <Container>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 &&(<h2 onClick={() => navigate('/menu')}>Cart is Empty!</h2>)}
      {cartItems.map((item) => (
        <CartItem key={item.id} item={item} onIncrease={() => addToCart(item)} onDecrease={() => removeFromCart(item)} />
      ))}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <h3>Total: ${total.toFixed(2)}</h3>
        <div>
          <Button variant="primary" onClick={() => navigate('/menu')}>
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
