import { Container, Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import OrdersByDate from './components/OrdersByDate.component';
import SoldOutDishes from './components/SoldOutDishes.component';
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
              <Link to="/" className="nav-link">
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
            <Route exact path="/" element={<OrdersByDate />} />
            <Route path="/dish" element={<SoldOutDishes />} />
          </Routes>
        </Container>
      </main>
    </Router>
  );
}

export default App;
