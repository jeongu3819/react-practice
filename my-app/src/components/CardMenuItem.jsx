// src/components/CardMenuItem.jsx
import React from "react";
import "../styles/CardMenuItem.css";

function CardMenuItem({ title, text, link }) {
  const handleClick = () => {
    if (link) {
      window.open(link, "_blank"); // 새 탭으로 열기
    }
  };

  return (
    <div className="card-menu-item" onClick={handleClick}>
      <div className="card-title">{title}</div>
      <div className="card-text">{text}</div>
    </div>
  );
}

export default CardMenuItem;
