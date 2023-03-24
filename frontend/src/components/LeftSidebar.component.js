import React, { useState, useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import AppContext from '../context/AppContext';

function LeftSidebar({ scrollToTypeRef }) {
  const [isClicked, setIsClicked] = useState(false);
  const { dishTypes } = useContext(AppContext);

  const handleClick = (type) => {
    setIsClicked(!isClicked);
    scrollToTypeRef.current(type);
  };

  return (
    <Navbar
      style={{ backgroundColor: 'whitesmoke', width: "calc(100% -1px)", fontSize: "11px", overflowX: 'hidden' }}
      variant="light"
    >
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav style={{ display: 'flex', flexDirection: 'column' , width: "calc(100% - 1px)"}}>
          {dishTypes.map((type, index) => (
            <Nav.Link key={index} style={{
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              borderColor: 'grey',
              borderWidth: '1px',
              borderStyle: 'solid',
            }} onClick={() => handleClick(type)}>
              {type}
            </Nav.Link>
          ))}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default LeftSidebar;
