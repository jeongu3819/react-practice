// src/components/MegaMenu.jsx
import React from "react";
import "../styles/MegaMenu.css";

function MegaMenu({ subItems }) {
  return (
    <div className="mega-menu-container">
      <div className="mega-menu-row">
        {subItems.map((item) => (
          <div key={item.id} className="menu-card">
            <h4>{item.title}</h4>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MegaMenu;
