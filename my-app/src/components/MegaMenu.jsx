// src/components/MegaMenu.jsx
import React from "react";
import CardMenuItem from "./CardMenuItem";
import "../styles/MegaMenu.css";

function MegaMenu({ subItems }) {
  return (
    <div className="mega-menu-container">
      <div className="mega-menu-grid">
        {subItems.map((item) => (
          <CardMenuItem key={item.id} title={item.title} text={item.text} link={item.link} />
        ))}
      </div>
    </div>
  );
}

export default MegaMenu;
