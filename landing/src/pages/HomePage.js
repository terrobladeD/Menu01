import React from "react";
import "./HomePage.css";
import image from "../img/bg.jpg"; 


const HomePage = () => {
  
  return (
    <div className="d-flex align-items-center justify-content-center hero-section">
      <div className="background-image" style={{ backgroundImage:`url(${image})` }}></div>
      <div className="text-center">
        <h1 className="display-4 mb-3">Make your restaurant more digital</h1>
        <h2 className="fs-5 text-muted mb-4">
          Use QR code to order to increase the restaurant's hospitality speed and reduce errors
        </h2>
        <div>
          <a href="/" className="btn btn-primary me-2">
            Explore demo restaurant
          </a>
          <a href="/" className="btn btn-outline-primary">
            Explore demo admin page
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
