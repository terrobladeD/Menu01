import React, { useState } from "react";
import { Navbar, Nav } from "react-bootstrap";

function LeftSidebar() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <Navbar
      bg="primary"
      variant="dark"
      fixed="left"
      expand="lg"
    >
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav style={{ display: 'flex', flexDirection: 'column' }}>
          <Nav.Link onClick={handleClick}>Link 1</Nav.Link>
          <Nav.Link onClick={handleClick}>Link 2</Nav.Link>
          <Nav.Link onClick={handleClick}>Link 3</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default LeftSidebar;
