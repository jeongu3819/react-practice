// src/components/HeroSection.jsx
import React from "react";
import heroImage from "../assets/images/websitepage.png";
import "../styles/HeroSection.css";

function HeroSection() {
    return (
      <div className="hero-container" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Welcome to MySite</h1>
          <p>Your journey starts here</p>
        </div>
      </div>
    );
  }
  
  export default HeroSection;
