import { Container, Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DishPage from './pages/DishPage';
import OrderPage from './pages/OrderPage';
import HomePage from './pages/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Navbar bg="light" expand="lg" fixed="top" style={{ height: '8vh' }}>
        <Navbar.Brand>
          <Link to="/" className="nav-link" style={{ textDecoration: 'none' }}>
            Admin Panel
          </Link>
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Item>
              <Link to="/order" className="nav-link">
                Orders
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/dish" className="nav-link">
                Dishes
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <main style={{ marginTop: '8vh' }}>
        <Container>
          <Routes>
          <Route exact path="/" element={<HomePage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="/dish" element={<DishPage />} />
          </Routes>
        </Container>
      </main>
    </Router>
  );
}

export default App;
