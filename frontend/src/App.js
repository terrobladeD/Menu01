import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Navbar } from 'react-bootstrap';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import Header from './components/Header.component'
import { AppProvider } from './context/AppContext';
import './App.css';
function App() {
  return (
    <AppProvider>
    <Router>
      <Navbar bg="light" expand="lg" fixed='top' style={{height:'8vh'}}>
      <Header />

      </Navbar>
      <main style={{ marginTop: '8vh' }}>
        <Container>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/shopping-cart" element={<ShoppingCartPage />} />
          </Routes>
        </Container>
      </main>
    </Router>
    </AppProvider>
  );
}

export default App;
