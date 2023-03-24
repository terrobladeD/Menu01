import React, { useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LeftSidebar from "../components/LeftSidebar.component";
import RightMainbar from "../components/RightMainbar.component";
import StickyFooter from '../components/StickyFooter.component';
import '../App.css'

function MenuPage() {
  const scrollToTypeRef = useRef();

  return (
    <>
      <Container fluid>
        <Row className="h-100">
          <Col className="col-3 h-100 no-padding-row" style={{ position: 'sticky', top: '9vh', maxHeight: '100vh', overflowY: 'auto' }}>
            <LeftSidebar scrollToTypeRef={scrollToTypeRef} />
          </Col>
          <Col className="col-9 h-100 no-padding-row">
            <RightMainbar scrollToTypeRef={scrollToTypeRef} />
          </Col>
        </Row>
      </Container>
      <StickyFooter />
    </>
  );
}

export default MenuPage;
