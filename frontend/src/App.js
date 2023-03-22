import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import Header from './components/Header.component'

function App() {
  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand><Header /></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/menu">
              Menu
            </Nav.Link>
            <Nav.Link as={Link} to="/shopping-cart">
              Shopping Cart
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <main>
        <Container>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/shopping-cart" element={<ShoppingCartPage />} />
          </Routes>
        </Container>
      </main>
    </Router>
  );
}

export default App;
